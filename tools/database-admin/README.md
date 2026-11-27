# Gestores web de Lavadero

Adminer 6.3.1 permite consultar estructura, datos y ejecutar SQL desde el navegador. Su alojamiento en alwaysdata es independiente de Express/Expo en Render. Hay dos entradas con configuración fija y un `bootstrap.php` común:

| Entrada                                                    | Perfil versionado | Cuenta y base                                     |
| ---------------------------------------------------------- | ----------------- | ------------------------------------------------- |
| <https://nehuenlavadero.alwaysdata.net/gestor-produccion/> | `production.php`  | `nehuenlavadero_consulta` → `nehuenlavadero_prod` |
| <https://nehuenlavadero.alwaysdata.net/gestor/>            | `index.php`       | `nehuenlavadero_escuela` → `nehuenlavadero_dev`   |

## Alcance y autenticación

El servidor de ambos perfiles es `mysql-nehuenlavadero.alwaysdata.net`. La contraseña la escribe el usuario; no está en el código ni en el repositorio. No se habilita ingreso permanente. Se exige HTTPS, cookies Secure/HttpOnly/SameSite y se conservan el control CSRF y el límite de intentos de Adminer. Cada entorno usa un nombre de sesión diferente.

El bootstrap rechaza otros servidores, cuentas y bases antes de conectar. Solo incluye el build MySQL de Adminer. `connectSsl()` usa la CA del sistema con `verify=true`: certificado y nombre del servidor se comprueban. El usuario escolar conserva sus permisos y no obtiene acceso a producción. Los enlaces permiten distinguir ambos entornos; no hay sincronización ni copia de registros.

La cuenta `nehuenlavadero_consulta` debe crearse en alwaysdata con **lecture seule** solo en `nehuenlavadero_prod`, **aucun droit** en desarrollo/QA y **Connexion SSL requise**. El propietario ingresa y confirma una contraseña nueva. La protección de solo lectura se aplica mediante permisos reales de MariaDB, no ocultando botones. Nunca reutilizar la credencial del backend en el gestor. La creación de esta cuenta y su prueba de ingreso quedan pendientes hasta que el propietario complete ese paso.

## Distribución

1. Descargar el [build oficial MySQL 6.3.1](https://github.com/vrana/adminer/releases/download/v6.3.1/adminer-6.3.1-mysql.php). SHA-256: `97fdb49c3e941636fe4b0559b2b042de3ac105dff0daafec3c255cd6bd81d4b6`.
2. Subirlo por FTPS verificado a `/home/nehuenlavadero/private/lavadero-adminer/adminer-6.3.1-mysql.php`, fuera de la raíz pública. Conservar sus avisos de licencia. Nunca publicar el vendor como una entrada PHP sin las restricciones del wrapper.
3. Subir `bootstrap.php` al mismo directorio privado. Debe estar completo antes de actualizar los perfiles públicos.
4. Subir `index.php` a `/home/nehuenlavadero/www/gestor/index.php` y `production.php` a `/home/nehuenlavadero/www/gestor-produccion/index.php`. En ambos directorios, `.htaccess` contiene `Options -Indexes` y `DirectoryIndex index.php`.
5. El alojamiento debe ofrecer PHP con mysqli y `/etc/ssl/certs/ca-certificates.crt`. Se comprobó PHP 8.4.28. No incluir contraseñas ni modificar el sitio raíz al desplegar el gestor.

Antes de actualizar Adminer, revisar la versión estable y sus avisos, comprobar checksum y compatibilidad de los métodos extendidos, subir el nuevo vendor privado y cambiar el include en último lugar. La aplicación no depende de que este gestor esté disponible.

## Comprobación

La página sin sesión muestra únicamente el ingreso. Después de autenticar, la base escolar ofrece 27 tablas. En **Comando SQL** se verificaron consultas de lectura:

```sql
SELECT DATABASE() AS base_actual, VERSION() AS motor;
SHOW SESSION STATUS LIKE 'Ssl_cipher';
```

Resultado escolar observado: `nehuenlavadero_dev`, `11.8.9-MariaDB`, `TLS_AES_256_GCM_SHA384`. Una consulta independiente de lectura confirmó 9 vehículos y 20 turnos en producción frente a 8 y 14 en desarrollo. Las pruebas de ingreso de `nehuenlavadero_consulta` y de rechazo de escrituras se completan después de crear la cuenta. No se modificaron registros, configuraciones de conexión de la app ni esquemas. Ver [uso del gestor](USO.md).

Referencias: [Adminer](https://www.adminer.org/), [extensiones oficiales](https://www.adminer.org/en/extension/) y [conexiones MariaDB en alwaysdata](https://help.alwaysdata.com/en/docs/web-hosting/databases/mariadb/). El phpMyAdmin general de alwaysdata rechazó este usuario por exigir SSL; se mantuvo esa protección y se habilitó TLS verificado en esta entrada.
