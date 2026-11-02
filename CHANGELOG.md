# Changelog

## 1.1.1 — 02/11/2026

- Conexión inicial compartida, preparación social por JSON y conservación de sesión ante fallas transitorias.
- Reserva guiada, calendario, disponibilidad vinculada a la selección actual y recarga de selectores al volver.
- Retorno a enlaces autorizados después de restaurar y revalidación de la publicación web.
- 46 pruebas y verificación real de los ingresos sociales y la reserva/cancelación web.

## Documentación y experiencia profesional — 01/11/2026

- Versión 1.1.0, Android versionCode 6.
- Portadas propias de Cliente, Empleado y Administrador, barra lateral y menú/tabs móviles.
- Sistema visual compartido, iconografía SVG local, tarjetas/indicadores y catálogos adaptables.
- Resumen personal se recarga con la agenda; proveedores sociales distinguen carga de indisponibilidad.
- Guías de código/invariantes, mapa de módulos, README por carpeta y catálogo de 117 componentes.

## Revisión de requisitos — 01/11/2026

- Vinculación social de cuentas locales confirmando su contraseña, PKCE y límite de intentos.
- Separación de consultas, estado, comandos y secciones visuales; auditoría automática de fuente, TSDoc y ciclos.
- Documentación por requisito, catálogo de componentes actualizado y guía para iPhone/Expo Go.

## Revisión final de producción — 01/11/2026

- OAuth con state UUID explícito, retorno web en la misma pestaña y pruebas de vencimiento/CSRF.
- Aviso público de uso de datos, manual con capturas y enlaces reales de entrega.
- Agenda con servicios/color y resumen de la jornada seleccionada.

## 1.0.0 — 2026-10-29

### Agregado

- Registro Cliente, login tradicional, JWT y refresh con rotación/revocación por familia.
- Roles y propiedad en backend; protección de auto-degradación/desactivación del administrador.
- Usuarios, vehículos, tipos, servicios y tarifas; reservas con control transaccional de capacidad.
- Agenda asignada, estados, notas, pagos idempotentes, comprobantes y reportes administrativos.
- App por rol, formularios RHF/Zod, temas persistentes y navegación protegida.
- OAuth Google/Discord/GitHub con PKCE y secretos exclusivamente en backend.
- Documentación OpenAPI/Postman, pruebas de aceptación y despliegue Render/Aiven.

La autorización real de proveedores OAuth y la disponibilidad del APK se registran en
docs/verification.md y docs/delivery.md, sin confundir implementación con verificación externa.

## 0.1.0 — 2026-10-29

### Agregado

- Estructura independiente de la etapa 1 y TypeScript strict.
- Configuración de formato, lint, checks y CI propios.
- Documentación de arquitectura, instalación y plan por etapas.

- Expo SDK 58, pantalla inicial atómica y validación de origen HTTPS sin localhost.
- Temas base claro/oscuro/sistema y configuración EAS para APK futuro.
- Registro explícito de avisos heredados de dependencias Expo en docs/dependencies.md.

### Pendiente

- Etapas 2–10: despliegue real, autenticación, funciones de negocio y APK.
