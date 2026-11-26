# Gestor web escolar

Entrada: <https://nehuenlavadero.alwaysdata.net/gestor/>. Adminer 6.3.1 permite consultar estructura, datos y ejecutar SQL desde el navegador, sin instalar aplicaciones en la computadora. La configuración `index.php` se aloja en alwaysdata y es independiente de Express/Expo en Render.

## Alcance y autenticación

Se conserva el acceso de DBeaver: servidor `mysql-nehuenlavadero.alwaysdata.net`, cuenta `nehuenlavadero_escuela` y base `nehuenlavadero_dev`. La contraseña la escribe el usuario; no está en el código ni en el repositorio. No se habilita ingreso permanente. La página exige HTTPS, configura cookies Secure/HttpOnly/SameSite y conserva el control CSRF y el límite de intentos de Adminer.

El wrapper rechaza otros servidores, cuentas y bases antes de conectar. Solo incluye el build MySQL de Adminer, evitando habilitar otros drivers. La cuenta SQL existente limita el acceso a desarrollo; no se cambian sus privilegios ni la exigencia SSL. `connectSsl()` usa la CA del sistema con `verify=true`: certificado y nombre del servidor se comprueban. La base publicada continúa en `nehuenlavadero_prod`, fuera de este gestor.

## Distribución

1. Descargar el [build oficial MySQL 6.3.1](https://github.com/vrana/adminer/releases/download/v6.3.1/adminer-6.3.1-mysql.php). SHA-256: `97fdb49c3e941636fe4b0559b2b042de3ac105dff0daafec3c255cd6bd81d4b6`.
2. Subirlo por FTPS verificado a `/home/nehuenlavadero/private/lavadero-adminer/adminer-6.3.1-mysql.php`, fuera de la raíz pública. Conservar sus avisos de licencia. Nunca publicar el vendor como una entrada PHP sin las restricciones del wrapper.
3. Subir `index.php` a `/home/nehuenlavadero/www/gestor/index.php`. Su `.htaccess` contiene `Options -Indexes` y `DirectoryIndex index.php`.
4. El alojamiento debe ofrecer PHP con mysqli y `/etc/ssl/certs/ca-certificates.crt`. Se comprobó PHP 8.4.28. No incluir contraseñas ni modificar el sitio raíz al desplegar el gestor.

Antes de actualizar Adminer, revisar la versión estable y sus avisos, comprobar checksum y compatibilidad de los métodos extendidos, subir el nuevo vendor privado y cambiar el include en último lugar. La aplicación no depende de que este gestor esté disponible.

## Comprobación

La página sin sesión muestra únicamente el ingreso. Después de autenticar, la base escolar ofrece 27 tablas. En **Comando SQL** se verificaron consultas de lectura:

```sql
SELECT DATABASE() AS base_actual, VERSION() AS motor;
SHOW SESSION STATUS LIKE 'Ssl_cipher';
```

Resultado observado: `nehuenlavadero_dev`, `11.8.9-MariaDB`, `TLS_AES_256_GCM_SHA384`. No se modificaron registros. La documentación de uso está en la entrega `GESTOR-SQL-MARIADB.md`.

Referencias: [Adminer](https://www.adminer.org/), [extensiones oficiales](https://www.adminer.org/en/extension/) y [conexiones MariaDB en alwaysdata](https://help.alwaysdata.com/en/docs/web-hosting/databases/mariadb/). El phpMyAdmin general de alwaysdata rechazó este usuario por exigir SSL; se mantuvo esa protección y se habilitó TLS verificado en esta entrada.
