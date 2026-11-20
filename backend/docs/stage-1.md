> Documento histórico de la estructura inicial. Para la versión terminada, ver [delivery.md](delivery.md) y el README actual.

# Cómo probar la etapa 1

## Backend, dentro de lavadero-api

```powershell
npm ci
npm run check
npm run format:check
```

Estas pruebas no requieren MySQL. Tras configurar Aiven dev y administrador en `.env`:

```powershell
npm run db:migrate
npm run db:migrate
npm run db:seed
npm run db:seed
npm run dev
```

Comprobar health=200, ready=200, Swagger y contrato. Importar Postman y configurar baseUrl.
Verificar que existen 3 roles, 5 estados, 4 tipos, 3 servicios y **un** administrador semilla.
No hay password en SQL; el hash debe comenzar con `$2b$`. Repetir el seed no resetea contraseñas.
Intentar email o patente duplicados y fechas invertidas dentro de una transacción de prueba:
MySQL debe rechazarlos. No realizar estas pruebas con datos de producción.

## Frontend, dentro de lavadero-app

```powershell
npm ci
npm run check
npm run format:check
npx expo install --check
npm run export:android
npm start
```

La exportación comprueba bundle, no produce APK ni demuestra ejecución nativa.
Sin EXPO_PUBLIC_API_URL se muestra conexión pendiente; con Render se muestra conectividad real.
En dispositivo: probar giro, tamaños, tema del sistema, desconexión y reintento.
Login, permisos y turnos se prueban cuando se implementen; no están disponibles en etapa 1.

## Integración MySQL con datos descartables

En una base **de pruebas**, migrada y sembrada con la configuración inicial:

```powershell
$env:NODE_ENV='test'
npm run test:database
```

Reutiliza DATABASE_URL del entorno. No apuntar a producción. Las escrituras de fixtures se
revierten con rollback y se prueban las restricciones reales del servidor MySQL, no un mock.
