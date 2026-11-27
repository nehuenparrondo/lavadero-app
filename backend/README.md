# Backend de Lavadero

API Express y TypeScript en `main/backend`. Es parte del [repositorio único](https://github.com/nehuenparrondo/lavadero-app), con dependencias separadas del frontend.

[API publicada](https://lavadero-api-48m4.onrender.com) · [Swagger](https://lavadero-api-48m4.onrender.com/api/docs/) · [Manual de usuario](../MANUAL-DE-USUARIO.md)

## Ejecutar

Para iniciar ambas partes, seguir el [README de main](../README.md). Para trabajar solo en el servidor, usar Node 24.15 o superior y MariaDB, instalar con `npm ci` y preparar `backend/.env` desde `.env.example` únicamente si aún no existe. Completar la conexión del entorno de desarrollo, TLS y el secreto JWT; no sobrescribir un archivo privado ya configurado.

```powershell
npm run db:migrate
npm run db:seed
npm run dev
```

Las semillas se usan para instalar un entorno nuevo y su administrador inicial. Las pruebas de aceptación necesitan una base QA separada; no usar producción para probar altas, pagos o cambios de configuración. `npm run check` comprueba tipos, lint, pruebas, compilación y modularidad. `npm run build` compila; `npm start` ejecuta el resultado.

En Render, la raíz del servicio es `backend` y el arranque ejecuta `npm run db:migrate:production && npm start`. Las migraciones se registran con checksum: se agrega una nueva, nunca se edita una aplicada. La instalación actual tiene 27 tablas y 20 migraciones.

## Responsabilidades y reglas

- `src/routes.ts` monta módulos; cada dominio separa rutas, validación, controller, servicio y repositorio. El servicio decide permisos y transacciones; el repositorio contiene SQL parametrizado.
- Registro público como Cliente; login local con bcrypt y Google/Discord/GitHub mediante OAuth y PKCE. Access JWT de 15 minutos y refresh opaco rotado de 30 días; solo su hash se guarda en SQL. La identidad y los permisos se vuelven a comprobar en cada solicitud.
- Disponibilidad y reservas comparten reglas. Confirmar vuelve a cotizar y validar bajo bloqueo; consultar o guardar un horario en pantalla todavía no ocupa el cupo. El cliente completa su vehículo después de reservar. El ingreso presencial no exige cuenta ni garaje.
- La jornada vigente es lunes a sábado 09:30–21:30, zona Argentina. Toda la duración debe entrar en el horario. Dinero en centavos ARS e instantes UTC; la API convierte al calendario del negocio.
- Tarifas interior/exterior compartidas: Auto $15.000, Camioneta $20.000 y Utilitario $17.000. Los contratos anteriores conservan nombre, importe y duración.
- Administración ve pendientes de hoy en adelante y puede guardar al responsable activo vigente sin modificar la versión del turno. La agenda del empleado muestra hoy; el historial conserva otras fechas.
- El empleado responsable habilitado para cobrar finaliza directamente después del cobro total y dentro de la jornada. El envío a revisión permanece para cuentas sin ese permiso y partes anteriores. Pagos e ingresos presenciales conservan sus claves de idempotencia entre reintentos.
- Cancelar requiere motivo persistente; las notas tienen autor/fecha. Reclamos, respuestas, asistencia y bajas lógicas conservan trazabilidad.

## Dónde leer

| Necesidad                                 | Referencia                                                                                                       |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Entender cada módulo e invariante         | [Guía del código](docs/code-guide.md), [mapa completo](docs/source-map.md)                                       |
| Métodos, parámetros, respuestas y errores | [API por endpoint](API.md), [OpenAPI](docs/openapi.json), [Postman](docs/postman.collection.json)                |
| Entornos y base de datos                  | [Configuración común](../docs/configuration.md), [modelo de datos](docs/database.md), [MariaDB](docs/mariadb.md) |
| Horarios, precios y pendientes actuales   | [Jornada](docs/business-hours.md), [catálogo y responsables](docs/catalog-assignment-queue.md)                   |
| Acceso, seguridad y recuperación          | [OAuth](docs/oauth.md), [seguridad y Mailtrap](docs/security-recovery.md)                                        |
| Validar cambios                           | [Mantenimiento](../docs/maintenance.md), [pruebas backend](tests/README.md)                                      |

Mapas e índices se regeneran desde `main` con `npm run docs`; CI detecta si no coinciden. Documentar intención, unidades, permisos y efectos importantes junto al código, sin repetir su implementación. Los informes de entregas anteriores son evidencia de su propia versión.

Los secretos SQL, JWT, OAuth y Mailtrap solo viven en el entorno privado del backend. No subir `.env`, certificados privados, contraseñas ni exportaciones de datos a GitHub.
