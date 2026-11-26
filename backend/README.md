> Estructura actual: `main/backend` dentro del repositorio único `nehuenparrondo/lavadero-app`. Para iniciar frontend y backend juntos, ver [la guía principal](../README.md).

# Lavadero API 1.0

Backend independiente de gestión de lavadero: autenticación local y social, permisos de
Cliente/Empleado/Administrador, vehículos, catálogo, turnos, cobros y reportes.

API pública: https://lavadero-api-48m4.onrender.com · [Swagger](https://lavadero-api-48m4.onrender.com/api/docs/).
Repositorio privado único: https://github.com/nehuenparrondo/lavadero-app (carpeta backend).

## Ejecutar

Requiere Node 24 LTS y MariaDB 11.8. Conserva compatibilidad con MySQL 8.4 para migrar instalaciones anteriores. No necesita el repositorio móvil.

```powershell
npm ci
Copy-Item .env.example .env
# Completar conexión, TLS, JWT y administrador inicial. La CA propia es opcional.
npm run db:migrate
npm run db:seed
npm run check
npm run dev
```

`npm run build` compila; `npm start` ejecuta el resultado. En Render se ejecuta
`npm run db:migrate:production && npm start`; las semillas se ejecutan una vez,
con `npm run db:seed:production`. Las migraciones comprueban su checksum.

## Comportamiento

- Registro público siempre Cliente. Contraseñas bcrypt; access JWT de 15 minutos y
  refresh opaco de 30 días, rotado y revocable. Reutilizar refresh revoca su familia.
- Propiedad y rol se comprueban en cada solicitud. Cambios de rol invalidan sesiones.
- Reservas bajo transacción: horario, capacidad, propietario y precio se recalculan.
  Los precios y duraciones históricos permanecen aunque cambie el catálogo.
- Todos los empleados activos acceden a la agenda compartida. Cobran únicamente si están habilitados.
- Importes enteros en centavos ARS; fechas UTC y calendario Buenos Aires.
- Atención inicial lunes a sábado 09:30–16:30, capacidad 1, grilla 5 minutos.
  Servicios de ejemplo: interior 30, exterior 35 y completo 40 minutos.

## Documentación

[Contrato por endpoint](API.md), [OpenAPI](docs/openapi.json), [Postman](docs/postman.collection.json),
[instalación](docs/installation.md), [hosting](docs/hosting.md),
[arquitectura](docs/architecture.md), [base y ER](docs/database.md),
[verificación](docs/verification.md), [entrega](docs/delivery.md).

`npm test` ejecuta pruebas unitarias/HTTP sin MySQL. `npm run test:acceptance` usa una
base exclusiva de pruebas con `NODE_ENV=test`: nunca ejecutarlo sobre producción.
Ver requisitos en `tests/README.md`.

No publicar `.env`, claves, tokens, contraseñas ni copias de la base. OAuth exige
credenciales reales de cada proveedor; sus pruebas automatizadas usan proveedores
simulados y no acreditan por sí solas una autorización externa real.

## Revisión de la consigna

[Matriz de requisitos y evidencia](docs/requirements-review.md) · [Prueba desde iPhone/Expo Go](docs/iphone-expo-go.md).

## Lectura y mantenimiento del código

- [Guía de código e invariantes](docs/code-guide.md)
- [Mapa de todos los módulos](docs/source-map.md)

## Correcciones de acceso y reservas

Ver [comportamiento, módulos y pruebas de la versión 1.1.1](docs/reliability.md).

El flujo vigente de agenda, asignación, verificación, reclamos y fichajes está documentado en [docs/work-operations.md](docs/work-operations.md).

La base usa nombres de tablas en español. Ver [MariaDB y diccionario de tablas](docs/mariadb.md).

Ver [cancelaciones, observaciones y mejora de interfaz](docs/cancellation-notices.md).

Panel administrativo: [ingresos sin turno, asistencia laboral, usuarios y gráficos semanales](docs/admin-panel.md).

[Cliente y empleado: calendario, agenda, limpieza, cobro y reclamos](docs/client-employee-flow.md).

## Seguridad y acceso actual

Ingreso con Google, Discord, GitHub o correo y contraseña. La sesión persiste para los tres roles; ver [sesión y accesos](../docs/social-session.md). Perfil sin fotos. Recuperación mediante Mailtrap Sandbox, sin entrega a casillas reales. Ver [seguridad y recuperación](docs/security-recovery.md) para configuración, pruebas y límites.
