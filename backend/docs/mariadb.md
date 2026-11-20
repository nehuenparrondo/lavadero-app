# MariaDB y tablas en español

El proyecto usa MariaDB 11.8 e InnoDB. El conector `mysql2` habla el protocolo compatible de MariaDB; el esquema y las pruebas se ejecutan contra el motor real, no una simulación. `mysql://` en la conexión describe ese protocolo, no identifica el motor instalado.

## Ubicación y separación

- Servidor: `mysql-nehuenlavadero.alwaysdata.net`, puerto 3306, TLS con certificado verificado.
- `nehuenlavadero_prod`: datos de la web publicada. Usuario exclusivo del backend `nehuenlavadero_app`.
- `nehuenlavadero_dev`: desarrollo y trabajo escolar. Usuario `nehuenlavadero_escuela`, sin acceso a producción.
- `nehuenlavadero_qa`: pruebas automáticas desechables, sin datos reales.
- Render conserva la API y la web original. alwaysdata aloja MariaDB y una copia funcional de la web; el plan gratuito no permite alojar exclusivamente bases.

No guardar credenciales en GitHub ni enviarlas desde Expo. La API recibe la conexión mediante su entorno privado. El equipo de desarrollo usa `.env` ignorado por Git.

## Diccionario

| Tabla                     | Contenido                                               |
| ------------------------- | ------------------------------------------------------- |
| `roles`                   | Cliente, empleado y administrador                       |
| `usuarios`                | Perfil, contraseña cifrada, permisos y baja lógica      |
| `cuentas_sociales`        | Relación del usuario con Google, Discord o GitHub       |
| `sesiones_renovacion`     | Hashes de sesiones, rotación y revocación               |
| `estados_oauth`           | Solicitudes temporales de inicio social y PKCE          |
| `autorizaciones_oauth`    | Códigos temporales de un único uso                      |
| `tipos_vehiculo`          | Auto, SUV, camioneta, moto y categorías administrativas |
| `vehiculos`               | Patente, marca, modelo, color y titular                 |
| `servicios`               | Lavados, encerado y tapizados; duración y estado        |
| `tarifas_servicio`        | Precio por categoría y servicio, en centavos ARS        |
| `estados_turno`           | Estados válidos del trabajo                             |
| `turnos`                  | Reserva confirmada, titular, horario, tipo y asignación |
| `servicios_turno`         | Precio y duración históricos de cada servicio reservado |
| `detalles_vehiculo_turno` | Descripción aportada por el cliente                     |
| `notas_turno`             | Observaciones del equipo con autor                      |
| `historial_estados_turno` | Auditoría de cambios de estado                          |
| `partes_lavado`           | Trabajo realizado, empleado, revisión y correcciones    |
| `mensajes_cliente`        | Reclamos, devoluciones y respuesta administrativa       |
| `asistencia_empleados`    | Fichajes registrados por el administrador               |
| `pagos`                   | Cobros, método y saldo de cada turno                    |
| `configuracion_negocio`   | Moneda, zona, capacidad y anticipación de cancelación   |
| `horarios_atencion`       | Días y horas de atención                                |
| `bloqueos_agenda`         | Serialización de operaciones de agenda                  |
| `migraciones_esquema`     | Versiones SQL y checksums aplicados                     |

Las columnas y el contrato JSON conservan sus nombres para no romper clientes existentes. Las consultas SQL del backend ya usan los nombres españoles.

## Migraciones y conservación de datos

`npm run db:migrate` verifica los archivos históricos sin editarlos. Detecta el motor con `SELECT VERSION()` y adapta únicamente la sintaxis histórica `DROP CHECK` a `DROP CONSTRAINT` y la colación antigua cuando corre en MariaDB. Las restricciones siguen activas.

Las migraciones 013 y 014 renombran las tablas existentes sin copiar ni borrar filas; InnoDB conserva las relaciones. Durante la transición crean vistas compatibles con nombres antiguos para que el proceso anterior de Render pueda terminar sus solicitudes. Esas vistas no son tablas de negocio. La copia final a MariaDB importa únicamente las tablas españolas.

El acceso de Aiven está limitado y no permite renombrar tablas. Para esta transición se despliega temporalmente la rama `mariadb-transition`, que conserva sus nombres anteriores e incorpora las bandejas nuevas y la pausa de migración. La copia traduce nombres de tabla y referencias del DDL al español; cada fila conserva sus valores y checksum. La base de Aiven permanece intacta. Render vuelve a `main` al conectar MariaDB.

Para cambiar de servidor: respaldar, desplegar código compatible, activar `MAINTENANCE_MODE=true`, esperar que drenen las solicitudes anteriores, obtener una instantánea consistente, importar en una base vacía separada y comprobar hashes de todas las filas y ausencia de referencias huérfanas. Solo entonces cambiar `DATABASE_URL` y volver a `MAINTENANCE_MODE=false`. No ejecutar semillas sobre una copia de producción.

La base anterior de Aiven queda como respaldo. Después del cambio, los datos nuevos se escriben únicamente en MariaDB. Volver a Aiven exige copiar también los cambios posteriores; no basta con cambiar la conexión.

## Gestor SQL

`Abrir-gestor-sql.cmd` abre DBeaver con la base de desarrollo, TLS verificado y la contraseña desde el entorno local. Ejemplo seguro de lectura:

```sql
SELECT t.id, t.starts_at, v.plate, e.code AS estado
FROM turnos t
JOIN estados_turno e ON e.id = t.status_id
LEFT JOIN vehiculos v ON v.id = t.vehicle_id
ORDER BY t.starts_at DESC;
```

Las reglas de reservar, verificar trabajos y cobrar están en los servicios de la API. Las modificaciones manuales por SQL pueden omitir esa auditoría; usar la aplicación para operaciones del negocio.

Después de verificar el despliegue y retirar los procesos anteriores, `npm run db:retire-legacy-views` elimina únicamente los alias temporales en inglés. Comprueba las migraciones 013/014, toma el mismo bloqueo de migraciones y nunca elimina tablas ni filas. Es idempotente; los arranques posteriores no recrean esos alias.

## Resultado de la transición publicada

La API volvió a `main` y trabaja con MariaDB **11.8.9**, fuera de mantenimiento. Se verificaron las 25 tablas españolas, las 34 claves foráneas, las 14 migraciones y los checksums de todas las filas copiadas. El corte conservó 7 usuarios, 12 turnos y 5 vehículos. Las sesiones nuevas se escriben en MariaDB. Producción y desarrollo ya no contienen vistas con nombres antiguos.

Se aprobaron 70 pruebas: 17 de backend, 17 de frontend, 4 de integración de base y 32 de aceptación. Las 32 de aceptación también pasaron después de retirar todos los alias ingleses. Los recorridos de navegador comprobaron los tres roles, la desaparición automática de un horario ocupado, la liberación al cancelar y la llegada automática de nuevas solicitudes a Administración. La web publicada pasó ingreso, catálogo y cotización después del cambio de base. No se afirma una prueba física en iPhone.

El DDL exportado de Aiven requirió modo `ANSI_QUOTES` para identificadores y la conversión equivalente de `regexp_like` a `REGEXP` de MariaDB. Esas adaptaciones preservan las restricciones; no modifican las migraciones históricas ni los valores copiados.

## Avisos y observaciones

Después del corte inicial se agregó la migración 015 para conservar la lectura del aviso de cancelación. La instalación vigente tiene 17 migraciones y mantiene 25 tablas. Los motivos y observaciones se guardan en las tablas existentes; ver [campos y funcionamiento](cancellation-notices.md).

`ingresos_sin_turno` conserva los autos presenciales y su UUID de reintento, con FK al turno. Se incorpora en la migración 016.

La migración 017 agrega limpieza del Inicio y autoría del cierre del empleado. Ver [flujo de cliente y empleado](client-employee-flow.md).
