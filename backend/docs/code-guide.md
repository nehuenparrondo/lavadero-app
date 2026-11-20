# Guía para leer y mantener el backend

## Mapa y orden de lectura

Empezar por src/app.ts (composición, sin abrir puerto), src/server.ts (arranque) y
src/routes.ts (montaje versionado). Cada dominio se divide en rutas, esquema,
controlador, servicio y repositorio. El [mapa completo](source-map.md) enumera los
archivos y sus exportaciones. Cada carpeta tiene su README y las funciones públicas
describen parámetros, resultado, precondiciones y errores junto al código.

| Capa             | Responsabilidad                                   | Límite                                    |
| ---------------- | ------------------------------------------------- | ----------------------------------------- |
| routes           | Métodos, paths, middleware y roles                | No calcula disponibilidad ni consulta SQL |
| schema           | Validación y normalización Zod                    | No decide ownership                       |
| controller       | Extrae entrada validada y actor                   | No ejecuta transacciones                  |
| service          | Permisos del recurso, invariantes y transacciones | No serializa respuestas Express           |
| repository       | SQL parametrizado y mapeo de filas                | No confía en IDs como autorización        |
| access/presenter | Proyección pública por rol                        | Nunca expone filas internas completas     |

## Identidad, sesión y permisos

authenticate verifica firma, issuer, audience y vencimiento del JWT; vuelve a leer
la cuenta, su versión de autenticación y la familia de sesión. Así un access vigente
no conserva permisos de una cuenta desactivada o de una sesión cerrada.
requireRole restringe roles de ruta. Los servicios vuelven a comprobar titularidad o
asignación. Ocultar un botón del frontend no concede ni revoca acceso.

El registro público crea Cliente sin aceptar privilegios del body. El acceso local
usa bcrypt y un mensaje único para no revelar si el correo existe.
token.service firma con un secreto HMAC del entorno, no con una clave asimétrica.
Los refresh/grants persistidos se consultan por SHA-256; no se guarda el token legible.

session.service rota el refresh bajo lock. Si encuentra reuso, vencimiento o cuenta
inactiva, revoca la familia y devuelve null desde la transacción. Solo después del
commit emite INVALID_REFRESH: lanzar antes desharía justamente la revocación.
El cambio de contraseña/permisos revoca sesiones. admin.service protege al último
administrador activo con un lock común y evita que el administrador se autoexcluya.

## Acceso social y vinculación

oauth.service guarda un state de un solo uso y permite únicamente retornos completos
de la lista configurada. provider.service y sus adaptadores HTTP/perfil canjean el
código con el proveedor desde el servidor. Los secretos no llegan a la app.
oauth.identity.service resuelve la identidad y emite un grant efímero ligado al
challenge del cliente. El callback lleva código y state, nunca tokens de sesión.

oauth.exchange.service exige verifier PKCE. Si el correo coincide con una cuenta
local existente, solicita su contraseña antes de vincular. Conserva el ID y rol.
Cada fallo incrementa un contador bajo lock; el error se retorna desde la transacción
para confirmar ese contador antes de responder. Cinco fallos bloquean el intento.
El grant común vence a los 60 segundos; la confirmación local dispone de cinco minutos.
Las migraciones 006/007 mantienen completa la pareja proveedor/subject pendiente.

## Disponibilidad y reserva atómica

1. availability.service verifica el vehículo y servicios activos con tarifa para su tipo.
2. schedule calcula la ventana en la zona IANA del negocio y convierte a UTC.
3. canFit usa intervalos [inicio, fin), excluye vehículo/empleado ocupado y barre
   eventos para medir concurrencia real. Los finales empatados liberan antes de iniciar.
4. Las opciones usan slotStepMinutes; ese paso no es la duración del lavado.
5. booking.service toma primero el lock de settings, recotiza y vuelve a verificar
   titular activo, horario y ocupación dentro de la misma transacción.
6. Persiste precios/duraciones como contrato histórico junto al primer estado pendiente.

No aceptar total, precio ni duración enviados por el cliente como fuente de verdad.
La disponibilidad consultada es orientativa: otra reserva puede ocupar el horario
antes del POST. Ese caso devuelve 409 y el frontend debe volver a cotizar.
Reservas, asignaciones, cambios de estado y configuración comparten el lock de agenda;
cambiar su orden puede introducir carreras o deadlocks.

## Estados, notas y cancelación

transitions declara el alcance de cada rol. El cliente cancela pendientes/confirmados;
cualquier empleado avanza confirmado (o pendiente anterior) → en proceso → finalizado; administración
puede corregir estados respetando las demás invariantes del servicio.
Confirmar requiere empleado activo y capacidad. Los cambios conservan historial.
La anticipación del cliente es estrictamente mayor al límite configurado: exactamente
120 minutos no supera un límite de 120. Administración conserva cancelación de emergencia.
Las notas tienen autor y momento; no se sustituyen por un campo de texto mutable.

## Cobros, centavos e idempotencia

payments.service bloquea el turno y verifica acceso, habilitación de cobro, estado
en proceso/finalizado y saldo. La clave de idempotencia representa la misma intención:
un reintento con los mismos datos devuelve replayed; reutilizarla con otros datos falla.
No convertir un fallo de red en una nueva clave desde el cliente.
Los importes son enteros en centavos ARS. Registrar efectivo/transferencia es un asiento
del cobro declarado; el sistema no mueve dinero. El historial contable no se elimina.
El comprobante es interno, con contrato y cobros históricos; no es factura fiscal.

## Datos históricos y proyección

Las bajas lógicas conservan referencias. Editar una tarifa no cambia turnos reservados.
El titular de un vehículo histórico no se transfiere: crear otro registro si cambia.
presentAppointment omite IDs de cuenta e importes para empleados; solo devuelve montos
al empleado habilitado para registrar cobros. Usar ese presentador también en nuevas rutas.

## Fechas, reportes e infraestructura

MySQL DATETIME se interpreta explícitamente como UTC. La agenda y los períodos del
reporte usan la zona del negocio; no utilizar la zona del proceso o del servidor.
Los lavados completados se agrupan por ends_at, el fin agendado del contrato, y los ingresos por fecha de cobro; no
esperar que ambos totales describan exactamente las mismas visitas.

utils/transaction siempre libera conexión y revierte al rechazar. Todas las escrituras
de una operación atómica deben usar su executor. No abrir otro pool desde el callback.
La conexión Aiven verifica TLS. La base de desarrollo es distinta de producción.
Las migraciones no se editan una vez aplicadas: agregar otra. migrationChecksum
normaliza LF/CRLF y admite el checksum histórico equivalente, pero rechaza SQL diferente.

publicError es la única proyección de fallos hacia clientes. No incluir cuerpos,
tokens, consultas SQL ni secretos en mensajes o logs. /health prueba proceso;
/ready comprueba base. Una caída de MySQL debe producir fallo de readiness.

## Extender un caso de uso

Definir esquema, probar permisos/ownership, implementar servicio y SQL parametrizado,
conectar controlador/ruta y actualizar OpenAPI/Postman. Añadir pruebas de comportamiento
cuando cambie una regla, especialmente concurrencia, saldo, sesión o límites de tiempo.
Ejecutar npm run check y las suites de aceptación de base cuando corresponda.
La auditoría comprueba archivos de src de hasta 149 líneas, cuerpos de hasta 30,
TSDoc público y ausencia de ciclos, incluidos imports de tipos.

> Actualización: la decisión posterior del usuario establece agenda compartida. Consultar [shared-agenda.md](shared-agenda.md) para la regla vigente; capturas anteriores documentan su versión original.
