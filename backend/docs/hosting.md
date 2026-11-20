# Hosting y despliegue

La instalación publicada utiliza **Render Free para la API y la web, y MariaDB 11.8 en alwaysdata**. La base anterior de Aiven se conserva como respaldo de la transición; no recibe las operaciones nuevas.

| Recurso                 | Ubicación                                                  |
| ----------------------- | ---------------------------------------------------------- |
| Web principal           | https://lavadero-app-2558.onrender.com                     |
| Copia web en alwaysdata | https://nehuenlavadero.alwaysdata.net                      |
| API                     | https://lavadero-api-48m4.onrender.com                     |
| Base publicada          | `nehuenlavadero_prod`, usuario `nehuenlavadero_app`        |
| Desarrollo escolar      | `nehuenlavadero_dev`, usuario `nehuenlavadero_escuela`     |
| Servidor MariaDB        | `mysql-nehuenlavadero.alwaysdata.net:3306`, TLS verificado |

Ambas webs usan la misma API y base publicada. Su actualización es independiente: un despliegue de Render no copia automáticamente archivos a alwaysdata. La copia tiene fallback de rutas a `index.html`.

## Estado de la copia secundaria

En la comprobación del 12/11/2026, la web principal de Render y MariaDB respondieron correctamente, pero la dirección secundaria de alwaysdata cerró la conexión HTTPS y no respondió por HTTP. Los archivos y la configuración del sitio permanecen en la cuenta; usar la URL principal mientras se resuelve esa conectividad. No se desactivó TLS ni se cambiaron los datos para eludir el fallo.

## Publicar cambios

1. Ejecutar `npm ci` y `npm run check` en el repositorio modificado. Las pruebas de integración utilizan únicamente una base QA desechable.
2. Subir los cambios a `main` del repositorio privado correspondiente. Render publica la API y la app por separado.
3. La API compila con `npm ci --include=dev && npm run build && npm prune --omit=dev`. Inicia con `npm run db:migrate:production && npm start`.
4. El migrador verifica checksums y toma un bloqueo para impedir ejecuciones simultáneas. No volver a sembrar producción después de copiar sus datos.
5. Comprobar `/health`, `/ready`, `/api/openapi.json` y el ingreso desde la web. `/ready` comprueba MariaDB.
6. Para actualizar alwaysdata, exportar la web con el mismo `EXPO_PUBLIC_API_URL`, transferir por FTPS y publicar `index.html` al final. Conservar el fallback de rutas.

## Configuración privada de Render

`DATABASE_URL` contiene el usuario exclusivo y la base productiva. `DATABASE_TLS=true`; `DATABASE_CA_BASE64` puede quedar vacío cuando el servidor presenta una cadena pública válida. La verificación de certificado e identidad permanece activa. El pool publicado usa 3 conexiones.

`JWT_ACCESS_SECRET` y los secretos OAuth permanecen en el backend. `CORS_ORIGINS` y `OAUTH_REDIRECT_URIS` incluyen los orígenes y retornos exactos de ambas webs. No agregar comodines ni enviar credenciales SQL o secretos de proveedores a Expo.

`MAINTENANCE_MODE=false` en operación normal. Una pausa temporal de migración devuelve 503 en la API funcional y conserva los endpoints de salud. Cambiar de servidor exige respaldo consistente, validación de filas y relaciones y cambio coordinado de conexión; ver [MariaDB](mariadb.md).

## Límites del alojamiento gratuito

Render suspende una API Free tras 15 minutos sin solicitudes; el siguiente acceso puede tardar aproximadamente un minuto en reactivarla. La web estática sigue disponible, pero sus operaciones necesitan la API. Existen también cuotas de uso. Estos límites no se eliminan cambiando el formulario de ingreso. [Documentación oficial de Render](https://render.com/docs/free).

Consultar estado y cuotas de alwaysdata en su panel. No guardar datos persistentes en el disco temporal de Render. Verificar respaldos antes de una evaluación o migración.
