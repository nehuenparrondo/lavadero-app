# Gestor web de los datos de Lavadero

La app publicada y el desarrollo escolar usan bases separadas. Para ver un vehículo o turno que cargaste en la página publicada, abrí **Datos de la app publicada**.

| Acceso                                                                                | Qué muestra                                          | Usuario SQL               |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------- |
| [Datos de la app publicada](https://nehuenlavadero.alwaysdata.net/gestor-produccion/) | `nehuenlavadero_prod`: registros de la web en Render | `nehuenlavadero_consulta` |
| [Base escolar de práctica](https://nehuenlavadero.alwaysdata.net/gestor/)             | `nehuenlavadero_dev`: pruebas y desarrollo local     | `nehuenlavadero_escuela`  |

El acceso directo **Abrir-gestor-web.url** y el anterior **Abrir-gestor-sql.cmd** abren el gestor de producción. Ambas pantallas indican claramente su entorno y ofrecen enlaces al otro acceso. No se copian ni sincronizan registros entre las bases.

## Ingreso a producción

El perfil utiliza una cuenta separada de **consulta**, con permisos de lectura únicamente en `nehuenlavadero_prod` y conexión SSL requerida. Su alta se completa una vez en alwaysdata: el propietario escribe una contraseña nueva para `nehuenlavadero_consulta` y confirma el formulario preparado. Para entrar al gestor se usa esa misma contraseña. No es la contraseña escolar ni la de un usuario de la app.

El gestor no guarda la contraseña en el código. Dejá **Guardar contraseña** desmarcado. Los cambios de vehículos, turnos, servicios y cobros se realizan desde la aplicación; la cuenta de consulta SQL no concede permisos de escritura.

## Ver los registros

1. En la barra izquierda, buscá `vehiculos`, `turnos` o `usuarios`.
2. Tocá **registros** junto a su nombre para ver los datos. Tocar el nombre muestra columnas y estructura.
3. Las consultas escritas se ejecutan desde **Comando SQL**. Para relacionar un turno con la patente:

```sql
SELECT t.id, t.starts_at, v.plate, e.code AS estado
FROM turnos t
JOIN estados_turno e ON e.id = t.status_id
LEFT JOIN vehiculos v ON v.id = t.vehicle_id
ORDER BY t.id DESC
LIMIT 30;
```

Un turno puede reservarse antes de agregar el vehículo: en ese caso `vehicle_id` y la patente todavía pueden estar vacíos. Los datos del auto se consultan en `vehiculos`; la reserva, en `turnos`.

Para comprobar dónde estás conectado:

```sql
SELECT DATABASE() AS base_actual, VERSION() AS motor;
SHOW SESSION STATUS LIKE 'Ssl_cipher';
```

El primer acceso debe indicar `nehuenlavadero_prod`; el escolar, `nehuenlavadero_dev`. Al revisar el problema se encontraron 9 vehículos y 20 turnos en producción, frente a 8 y 14 en desarrollo. Son conteos observados en ese momento, no valores fijos de la aplicación.

## Base escolar

Conserva el usuario `nehuenlavadero_escuela` y su contraseña ya definida. Es el acceso de desarrollo que utilizaba DBeaver. El inicio local de `main` sigue usando esta base y la aplicación publicada sigue usando producción; cambiar de gestor no modifica ninguno de esos destinos.

## Seguridad y mantenimiento

Se conserva TLS con verificación de certificado y nombre del servidor. Los perfiles fijan servidor, usuario y base antes de conectar; producción usa una sesión distinta de escuela. No se distribuyen credenciales SQL con la app ni con el repositorio. Adminer 6.3.1 y el bootstrap común están fuera de la raíz web pública. La configuración versionada está en `main/tools/database-admin/`.
