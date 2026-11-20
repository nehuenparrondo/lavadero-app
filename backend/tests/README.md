# Pruebas

`npm test`: 15 pruebas unitarias/HTTP sin MySQL. `npm run check`: además tipos, lint, build y auditoría de fuente.
`npm run test:database`: restricciones SQL con una base exclusiva ya migrada/sembrada.
`npm run test:acceptance`: 17 escenarios sobre app Express y MySQL reales.

Para aceptación definir NODE_ENV=test, DATABASE_URL a una base desechable, TLS/CA según
el servidor, JWT_ACCESS_SECRET de al menos 32 caracteres, SEED_ADMIN_EMAIL y
SEED_ADMIN_PASSWORD. Ejecutar migraciones y semillas con esas mismas variables.
Los tests generan sus propios clientes/empleados/vehículos y no los borran: usar una
base nueva en cada ejecución. Nunca utilizar lavadero_prod ni una base ajena.

OAuth de aceptación usa fetch simulado. Configurar únicamente para test:
PUBLIC_API_URL=https://api.example.invalid, OAUTH_REDIRECT_URIS=lavadero://oauth,
GOOGLE_CLIENT_ID=test-google, GOOGLE_CLIENT_SECRET=test-google-secret,
GITHUB_CLIENT_ID=test-github, GITHUB_CLIENT_SECRET=test-github-secret,
DISCORD_CLIENT_ID=test-discord, DISCORD_CLIENT_SECRET=test-discord-secret.
Son valores ficticios, no credenciales externas. El PKCE se verifica contra RFC 7636.

Los permisos y la concurrencia se comprueban por HTTP, no llamando directamente a
funciones internas. En esta entrega pasaron los 17 escenarios con MySQL 8.4 real.
