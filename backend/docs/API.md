# API

Consultar [API.md](../API.md), contrato completo y ejemplos por endpoint.

## Catálogo y pendientes vigentes

`GET /api/v1/services` comparte las tarifas para los tres roles. `GET /api/v1/appointments?queue=requested` es administrativo: devuelve pendientes/confirmados desde el inicio de hoy en la zona del negocio, solicitudes recientes primero; `items` y `total` usan el mismo alcance. `PATCH /api/v1/appointments/:id/assignment` acepta `{ "employeeId": "3" }`; repetir el responsable activo actual devuelve `200` sin cambiar la versión. Conserva `400 INVALID_EMPLOYEE`, `409 EMPLOYEE_BUSY`, `409 ASSIGNMENT_CLOSED` y la autorización administrativa. [Reglas y pruebas](catalog-assignment-queue.md).
