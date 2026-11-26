# Gestor web de MariaDB de Lavadero

Abrí [Adminer de Lavadero](https://nehuenlavadero.alwaysdata.net/gestor/) o el acceso directo **Abrir-gestor-web.url**. El acceso anterior **Abrir-gestor-sql.cmd** también abre esta página. No hace falta instalar un programa.

Está configurado en español para la base escolar `nehuenlavadero_dev`, con el usuario `nehuenlavadero_escuela`. Al ingresar solo tenés que escribir la contraseña escolar de la base que ya definiste en alwaysdata. Es distinta de las contraseñas de los usuarios de la app. La pantalla principal lista las 27 tablas de la base.

## Consultar los datos

1. En la barra izquierda, buscá una tabla: `usuarios`, `vehiculos`, `turnos`, `servicios`, etc.
2. Tocá **registros** junto a su nombre para ver los datos. Tocar el nombre muestra columnas y estructura.
3. Para consultas escritas, abrí **Comando SQL**, escribí una consulta y pulsá **Ejecutar**. Por ejemplo:

```sql
SELECT id, first_name, last_name, email
FROM usuarios
WHERE deleted_at IS NULL
ORDER BY id DESC
LIMIT 30;
```

**Exportar** permite descargar una copia de la estructura y los datos. **Cerrar sesión**, arriba a la derecha, sale del gestor. El buscador del listado permite buscar datos dentro de las tablas.

## Qué base estás viendo

Este gestor abre la base **escolar/de desarrollo** que utilizaba DBeaver. La aplicación publicada en Render usa otra base, `nehuenlavadero_prod`; sus registros no aparecen aquí. Cambiar de gestor no cambia el destino de la aplicación ni copia datos entre esas bases. Aiven conserva una copia anterior; la base operativa está en alwaysdata.

Se comprobó MariaDB `11.8.9`, las 27 tablas y una conexión SQL cifrada `TLS_AES_256_GCM_SHA384`. Se conservó la exigencia de TLS del usuario. El phpMyAdmin general de alwaysdata no permite ese acceso porque el usuario exige SSL; por eso este gestor usa Adminer con verificación de certificado y servidor.

El código del gestor no guarda la contraseña SQL. La sesión del navegador usa cookies seguras; no se activó **Guardar contraseña**. Para operaciones del lavadero como reservar, cobrar o fichar, utilizá la aplicación, que aplica sus reglas de negocio.

Versión: [Adminer 6.3.1](https://www.adminer.org/), con servidor, usuario y base escolar fijos. La configuración y las instrucciones de mantenimiento están en este directorio.
