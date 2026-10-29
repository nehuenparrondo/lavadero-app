# Plan de desarrollo — Lavadero

## Acuerdos

- Frontend Expo managed + TypeScript strict y backend Express + TypeScript, autónomos.
- MySQL relacional, importes enteros en **centavos de pesos argentinos (ARS)**.
- Atención **lunes a sábado, 09:30–16:30**, zona **America/Argentina/Buenos_Aires**.
- **Un vehículo simultáneo**, lavado base **35 minutos** (aproximadamente 30–40).
- Hosting elegido por el usuario: **Render Free + Aiven MySQL Free**.
- Avance de una etapa por vez. Esta entrega comprende solo la etapa 1.

| Etapa                                 | Proyecto           | Resultado y criterio de cierre                                                                                                                                                                                              |
| ------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Estructura y base de datos**     | Ambos + SQL        | Dos raíces y Git separados; configuración strict; MySQL con FK, índices y checks; migraciones y semilla; arquitectura, plan y guía de hosting. Compilan y las pruebas base pasan.                                           |
| 2. Backend base y despliegue temprano | API + Aiven/Render | Crear las bases dev/prod y usuarios; conectar CA TLS; publicar repo API; primer despliegue HTTPS; `/health`, `/ready` y Swagger públicos verificados. Registrar URLs reales.                                                |
| 3. Autenticación y JWT                | API                | Registro siempre Cliente, bcrypt, login, JWT corto, refresh con hash y rotación, logout revocable, validación y rate limiting. Probar credenciales y reuso de refresh.                                                      |
| 4. Roles y propiedad                  | API                | authenticate, requireRole y requireOwnership; validar usuario activo y auth_version; impedir auto-degradación y último admin mediante transacciones. Probar accesos cruzados y concurrencia.                                |
| 5. CRUD y contrato REST               | API + MySQL        | Usuarios, vehículos, tipos, servicios/precios, disponibilidad, turnos, pagos, configuración y reportes. Actualizar OpenAPI, API.md y Postman con cada endpoint. Probar solapamientos, precios históricos y pagos repetidos. |
| 6. App base y navegación              | App                | Expo Router tipado, AuthStack y tabs/drawer por rol, Context de sesión, SecureStore, restauración y refresh Axios único ante 401 concurrentes. Instalar dependencias al implementar.                                        |
| 7. Experiencias por rol               | App + ajustes API  | Formularios RHF/Zod, Cliente completo, agenda Empleado, administración, estados vacíos/carga/error y pull-to-refresh. Probar permiso y propiedad desde la API además de las guardas.                                        |
| 8. OAuth de Google, Discord y GitHub  | Ambos + consolas   | AuthSession, state/PKCE, intercambio solo en backend, vinculación segura y JWT propios. Verificar con development build y redirecciones de producción.                                                                      |
| 9. Pulido y accesibilidad             | App                | Selector claro/oscuro/sistema persistente, orientación, tablet, accesibilidad, errores de red y listas. Validación en dispositivos reales.                                                                                  |
| 10. Entrega y APK                     | Ambos + EAS        | Documentación final con capturas reales por rol, instalación validada en limpio, APK firmado con URL Render, enlaces reales de entrega y demostración final.                                                                |

## Cómo se organiza cada cambio

1. Rama de funcionalidad en el repositorio correspondiente.
2. Archivos cortos, TSDoc y pruebas de reglas que agregan comportamiento.
3. Actualizar README, contrato, ejemplos y CHANGELOG en la misma etapa.
4. Ejecutar los checks, explicar cómo probar y registrar límites pendientes.
5. No iniciar una nueva etapa automáticamente al cerrar la anterior.

## Decisiones de esta etapa

**Expo Router en la etapa 6.** Rutas tipadas y grupos por rol en `src/app/`, con layouts
y guardas explícitas. Sigue las instrucciones de la plantilla Expo; el backend conserva
la autoridad de permisos. Componentes y hooks viven fuera de las rutas. No se usa servidor en Expo.

**mysql2 y SQL parametrizado.** Conservan visible el modelo relacional y permiten explicar
consultas, transacciones y bloqueos sin ocultarlos detrás de un ORM.

**Migraciones pequeñas con checksum y lock.** Un arranque repetido no aplica versiones dos veces;
MySQL hace commits implícitos en DDL, por lo que se requiere backup y cambios compatibles.

**Disponibilidad con duración real y grilla de 5 minutos.** Permite comenzar 09:30, 10:05, etc.
La suma de servicios debe terminar antes de 16:30 y respetar capacidad y agenda del empleado.

## Capacidad diaria orientativa

420 minutos de atención ÷ duración, redondeando hacia abajo:

| Duración por vehículo | Capacidad teórica diaria |
| --------------------- | -----------------------: |
| 30 minutos            |                       14 |
| 35 minutos            |                       12 |
| 40 minutos            |                       10 |

No incluye descansos, demoras ni servicios adicionales. No se reserva en paralelo con capacidad 1.
Un turno de varios servicios dura la suma de sus duraciones; nunca se asume que todos duran 35.

## Estado de los entregables

Esta etapa entrega dos proyectos locales independientes, no repositorios remotos publicados.
No se han creado cuentas ni servicios cloud, ni APK. El despliegue real es el cierre obligatorio
de la etapa 2 y requiere acceso a las cuentas GitHub, Render y Aiven del usuario.
