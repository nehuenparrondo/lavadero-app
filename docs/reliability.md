# Correcciones de acceso y reservas — 1.1.1

## Comportamiento corregido

- Una cuenta sin vehículos recibe una explicación y acceso a registrar el auto. Al volver, los selectores recargan los datos del servidor.
- Las fechas se eligen en un calendario táctil accesible. No se interpretan fechas inexistentes ni cambia el día por la zona del dispositivo. Atención configurada: pesos ARS, Argentina, 09:30–16:30, lunes a sábado; la duración depende de los servicios elegidos (30–40 minutos de referencia por lavado).
- Cambiar fecha, titular, vehículo o servicios invalida inmediatamente el horario anterior. Una consulta deshabilitada o fallida no conserva horarios anteriores. Confirmar exige un inicio futuro ofrecido por la cotización vigente; el servidor vuelve a validar capacidad y precios dentro de su transacción.
- Disponibilidad diferencia día cerrado, jornada terminada, duración incompatible y cupos ocupados. Los errores permiten reintentar.
- Al volver a una pantalla se actualizan sus datos. El detalle actualiza turno, cobros y comprobante después de cambios.
- El acceso social web prepara state y PKCE por JSON y navega directamente a Google, GitHub o Discord. Los errores del proveedor vuelven a la app solo si existe un estado consumido con retorno previamente autorizado.
- Una espera inicial compartida verifica GET /ready antes de enviar credenciales o escrituras. La app muestra un aviso después de dos segundos. No reenvía automáticamente reservas o pagos ante un timeout, ni realiza sondeos periódicos estando inactiva.
- La sesión se conserva ante problemas de red, 429 o 5xx. Un rechazo definitivo 401/403 de la renovación la invalida. El arranque ofrece reintentar si no puede restaurarla. Las peticiones de una cuenta anterior no cierran la cuenta actual.

## Límite del alojamiento gratuito

Render Free suspende el backend después de 15 minutos sin tráfico. La primera conexión puede tardar cerca de un minuto; el código puede mantener esa espera en la app y compartirla entre consultas, pero no eliminar el tiempo de arranque del proveedor. No se agregó un servicio de pago ni un mecanismo para mantenerlo activo artificialmente.

Fuente: https://render.com/docs/free

## Módulos principales

Frontend: `api/readinessGate.ts` coordina la conexión con plazo acotado y dependencias inyectables; `backendConnection.ts` comprueba la respuesta real; `connectionState.ts` y `ConnectionNotice` publican la espera. `api/renewRequest.ts` controla la renovación compartida y evita borrar la sesión por fallas transitorias. `useQuery` y `queryState` vinculan cada resultado a su recurso/filtros y descartan respuestas tardías. `useBookingOptions`, `useBookingResources`, `bookingSelection` y `bookingAvailability` separan carga, selección y confirmación. `DateInput`, `CalendarNavigation`, `CalendarGrid` y `CalendarDay` forman un calendario compartido por web y móvil.

Backend: `POST /api/v1/auth/oauth/:provider/start` conserva las validaciones de GET authorize; este último sigue disponible para aplicaciones anteriores. `oauth.return.ts` solo usa el retorno persistido de un state válido. `availability.reason.ts` explica listas vacías sin modificar la comprobación transaccional de capacidad. No requiere nuevas migraciones ni cambios de credenciales.

## Verificación automatizada

- Frontend: 11 pruebas, incluidas conexión compartida/acotada, respuestas fuera de orden, invalidación de horarios, compatibilidad de tarifas, calendario y clasificación de rechazos de sesión.
- Backend: 16 pruebas unitarias/HTTP. Aceptación adicional: 18 pruebas contra una base MySQL local descartable, con reserva, simultaneidad, propiedad, estados, cobros, comprobante, OAuth de tres proveedores, PKCE y estados de un solo uso. Los proveedores se simulan solamente en estas pruebas automatizadas.
- TypeScript, ESLint y auditoría de modularidad: archivos fuente de hasta 149 líneas, funciones/callbacks de hasta 30 líneas, TSDoc público y ausencia de ciclos internos.

Las pruebas instaladas en dispositivos no se infieren de las exportaciones ni de las pruebas web. El propietario dispone de iPhone con Expo Go; no hay dispositivo Android disponible.
