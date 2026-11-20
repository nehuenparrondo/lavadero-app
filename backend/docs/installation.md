# Instalación y configuración independiente

Requiere Node 24 LTS, npm y **MariaDB 11.8**. Clonar `lavadero-api`, ejecutar `npm ci` y copiar `.env.example` a `.env`. Ese archivo es privado y está excluido de Git.

## Base y semillas

El entorno escolar utiliza `nehuenlavadero_dev` en `mysql-nehuenlavadero.alwaysdata.net:3306`, con el usuario `nehuenlavadero_escuela`. Ese usuario no puede acceder a `nehuenlavadero_prod`. QA utiliza una tercera base desechable. Son datos y permisos separados dentro del mismo servidor, sin aislamiento físico.

Configurar `DATABASE_URL` con protocolo compatible `mysql://` y codificar caracteres especiales de usuario/contraseña. Mantener `DATABASE_TLS=true`. Si el certificado pertenece a una autoridad pública, `DATABASE_CA_BASE64` queda vacío y se usan las autoridades del sistema; si requiere una CA privada, cargar su contenido base64. Nunca desactivar la validación.

```powershell
npm run db:migrate
npm run db:seed
npm run check
npm run dev
```

Las **17 migraciones** construyen 25 tablas con nombres españoles y guardan sus checksums en `migraciones_esquema`. El segundo arranque no repite migraciones. Conservar intactos los archivos históricos y agregar una migración nueva para cada cambio. El migrador adapta la sintaxis histórica de MySQL a MariaDB.

`database/schema.sql` es una alternativa para construir una base nueva; no mezclarla con el migrador porque no registra su historial. Las semillas cargan roles, estados, categorías, servicios, tarifas y horario inicial. El administrador se crea desde `SEED_ADMIN_EMAIL` y `SEED_ADMIN_PASSWORD` si no existe; repetir la semilla no cambia su contraseña. No ejecutar semillas sobre una copia de producción.

Después de verificar que todos los procesos usan las tablas españolas, `npm run db:retire-legacy-views` elimina únicamente las vistas de compatibilidad; los arranques posteriores no las recrean. En la instalación publicada ya se retiraron.

## Compilar y publicar

`npm run build` produce `dist`; `npm start` inicia `dist/src/server.js`. Render ejecuta `npm run db:migrate:production && npm start`. Su variable `PORT` determina el puerto.

Producción requiere `NODE_ENV=production`, conexión SQL, TLS activo y un `JWT_ACCESS_SECRET` aleatorio de al menos 32 caracteres. `PUBLIC_API_URL` identifica la API; `CORS_ORIGINS` permite orígenes web exactos y `OAUTH_REDIRECT_URIS` los retornos autorizados. Las claves OAuth se configuran únicamente en el backend. Consultar [.env.example](../.env.example), [hosting](hosting.md) y [MariaDB](mariadb.md).

## Verificación

Abrir `/health`, `/ready`, `/api/docs/` y `/api/openapi.json`. Iniciar sesión y consultar `/api/v1/users/me` con el token de acceso. Las pruebas de base y aceptación requieren `NODE_ENV=test`, migraciones/semillas y credenciales de QA. Nunca ejecutarlas contra producción.

Para otra computadora, instalar Node y DBeaver desde sus sitios oficiales, clonar ambos repositorios y configurar los archivos de entorno privados con el acceso escolar. El frontend solo recibe la URL pública de la API. El [gestor SQL](mariadb.md#gestor-sql) permite inspeccionar desarrollo sin publicar credenciales.

Ver [panel administrativo actualizado: ingreso presencial, cuentas, asistencia y semanas](admin-panel.md).

La migración 017 agrega limpieza del Inicio y autoría del cierre del empleado. Ver [flujo de cliente y empleado](client-employee-flow.md).
