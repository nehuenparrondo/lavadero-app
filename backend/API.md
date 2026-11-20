# API REST v1 — Lavadero 1.0.0

Origen público: **https://lavadero-api-48m4.onrender.com**.

Swagger: `/api/docs/` · Contrato JSON: `/api/openapi.json` · Todos los importes son **centavos ARS**, IDs BIGINT son strings y turnos se devuelven en ISO UTC.

Autenticación: `Authorization: Bearer ACCESS_TOKEN`. El backend verifica firma, usuario activo, rol vigente, auth_version y familia de sesión activa. Logout/reuso de refresh también revocan access tokens de esa familia.

## Endpoints y permisos

| Método | Ruta                                      | Roles                   | Función                                      |
| ------ | ----------------------------------------- | ----------------------- | -------------------------------------------- |
| POST   | `/api/v1/auth/register`                   | public                  | Crear cuenta Cliente                         |
| POST   | `/api/v1/auth/login`                      | public                  | Iniciar sesión                               |
| POST   | `/api/v1/auth/refresh`                    | public                  | Renovar sesión                               |
| POST   | `/api/v1/auth/logout`                     | public                  | Cerrar sesión                                |
| GET    | `/api/v1/auth/providers`                  | public                  | Proveedores sociales habilitados             |
| GET    | `/api/v1/auth/oauth/{provider}/authorize` | public                  | Iniciar OAuth con PKCE                       |
| GET    | `/api/v1/auth/oauth/{provider}/callback`  | public                  | Recibir retorno OAuth                        |
| POST   | `/api/v1/auth/oauth/exchange`             | public                  | Canjear código móvil por sesión              |
| GET    | `/api/v1/users/me`                        | client, employee, admin | Ver perfil propio                            |
| PATCH  | `/api/v1/users/me`                        | client, employee, admin | Editar perfil propio                         |
| PUT    | `/api/v1/users/me/password`               | client, employee, admin | Cambiar contraseña propia                    |
| GET    | `/api/v1/users`                           | admin                   | Listar/buscar usuarios                       |
| POST   | `/api/v1/users`                           | admin                   | Crear usuario                                |
| GET    | `/api/v1/users/{id}`                      | admin                   | Consultar usuario                            |
| PATCH  | `/api/v1/users/{id}`                      | admin                   | Editar, activar o desactivar usuario         |
| PATCH  | `/api/v1/users/{id}/role`                 | admin                   | Cambiar rol                                  |
| DELETE | `/api/v1/users/{id}`                      | admin                   | Eliminar usuario lógicamente                 |
| GET    | `/api/v1/vehicles`                        | client, admin           | Listar/buscar vehículos                      |
| POST   | `/api/v1/vehicles`                        | client, admin           | Registrar vehículo                           |
| GET    | `/api/v1/vehicles/{id}`                   | client, admin           | Consultar vehículo                           |
| PATCH  | `/api/v1/vehicles/{id}`                   | client, admin           | Editar vehículo                              |
| DELETE | `/api/v1/vehicles/{id}`                   | client, admin           | Eliminar vehículo lógicamente                |
| GET    | `/api/v1/vehicle-types`                   | client, employee, admin | Listar tipos de vehículo                     |
| POST   | `/api/v1/vehicle-types`                   | admin                   | Crear tipo de vehículo                       |
| PUT    | `/api/v1/vehicle-types/{id}`              | admin                   | Editar tipo de vehículo                      |
| DELETE | `/api/v1/vehicle-types/{id}`              | admin                   | Desactivar tipo de vehículo                  |
| GET    | `/api/v1/services`                        | client, employee, admin | Ver catálogo y tarifas                       |
| GET    | `/api/v1/services/{id}`                   | client, employee, admin | Ver detalle y tarifas del servicio           |
| POST   | `/api/v1/services`                        | admin                   | Crear servicio                               |
| PATCH  | `/api/v1/services/{id}`                   | admin                   | Editar servicio                              |
| DELETE | `/api/v1/services/{id}`                   | admin                   | Eliminar servicio lógicamente                |
| PUT    | `/api/v1/services/{id}/prices/{typeId}`   | admin                   | Definir tarifa por tipo                      |
| GET    | `/api/v1/business`                        | client, employee, admin | Consultar atención y política de cancelación |
| GET    | `/api/v1/settings`                        | admin                   | Consultar configuración administrativa       |
| PUT    | `/api/v1/settings`                        | admin                   | Guardar configuración administrativa         |
| GET    | `/api/v1/availability`                    | client, admin           | Cotizar y consultar horarios                 |
| GET    | `/api/v1/appointments`                    | client, employee, admin | Listar turnos visibles                       |
| POST   | `/api/v1/appointments`                    | client, admin           | Reservar turno                               |
| GET    | `/api/v1/appointments/{id}`               | client, employee, admin | Consultar detalle del turno                  |
| PATCH  | `/api/v1/appointments/{id}/assignment`    | admin                   | Asignar o reasignar empleado                 |
| PATCH  | `/api/v1/appointments/{id}/status`        | employee, admin         | Cambiar estado                               |
| POST   | `/api/v1/appointments/{id}/cancel`        | client, admin           | Cancelar turno                               |
| POST   | `/api/v1/appointments/{id}/notes`         | employee, admin         | Registrar observación                        |
| GET    | `/api/v1/appointments/{id}/receipt`       | client, admin           | Ver comprobante de servicio                  |
| GET    | `/api/v1/appointments/{id}/payments`      | client, admin           | Ver cobros del turno                         |
| POST   | `/api/v1/appointments/{id}/payments`      | employee, admin         | Registrar cobro                              |
| GET    | `/api/v1/reports`                         | admin                   | Ver reportes administrativos                 |
| GET    | `/api/v1/reports/me`                      | employee                | Ver resumen propio de jornada                |

## POST /api/v1/auth/register

**Crear cuenta Cliente** · Roles: public.

El body no admite rol ni permisos.

Body validado por `registerSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "email": "cliente@example.com",
  "password": "Ejemplo-seguro-2026!",
  "firstName": "Ana",
  "lastName": "Pérez",
  "phone": "1100000000"
}
```

Respuesta exitosa: **201**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "user": {
      "id": "1",
      "email": "cliente@example.com",
      "role": "client",
      "firstName": "Ana",
      "lastName": "Pérez",
      "phone": "1100000000",
      "avatarUrl": null,
      "isActive": true,
      "canRecordPayments": false,
      "hasPassword": true,
      "authVersion": 0
    },
    "accessToken": "JWT_PROPIO",
    "refreshToken": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "expiresIn": 900
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## POST /api/v1/auth/login

**Iniciar sesión** · Roles: public.

Email y contraseña; límite de intentos por origen.

Body validado por `loginSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "email": "cliente@example.com",
  "password": "Ejemplo-seguro-2026!"
}
```

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "user": {
      "id": "1",
      "email": "cliente@example.com",
      "role": "client",
      "firstName": "Ana",
      "lastName": "Pérez",
      "phone": "1100000000",
      "avatarUrl": null,
      "isActive": true,
      "canRecordPayments": false,
      "hasPassword": true,
      "authVersion": 0
    },
    "accessToken": "JWT_PROPIO",
    "refreshToken": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "expiresIn": 900
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## POST /api/v1/auth/refresh

**Renovar sesión** · Roles: public.

Requiere refresh válido. Rotación/revocación de familia, incluso access tokens ya emitidos.

Body validado por `refreshSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "refreshToken": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "user": {
      "id": "1",
      "email": "cliente@example.com",
      "role": "client",
      "firstName": "Ana",
      "lastName": "Pérez",
      "phone": "1100000000",
      "avatarUrl": null,
      "isActive": true,
      "canRecordPayments": false,
      "hasPassword": true,
      "authVersion": 0
    },
    "accessToken": "JWT_PROPIO",
    "refreshToken": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "expiresIn": 900
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## POST /api/v1/auth/logout

**Cerrar sesión** · Roles: public.

Requiere refresh válido. Rotación/revocación de familia, incluso access tokens ya emitidos.

Body validado por `refreshSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "refreshToken": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "loggedOut": true
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## GET /api/v1/auth/providers

**Proveedores sociales habilitados** · Roles: public.

No revela IDs privados ni client secrets.

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": [
    {
      "provider": "google",
      "enabled": false
    },
    {
      "provider": "github",
      "enabled": false
    },
    {
      "provider": "discord",
      "enabled": false
    }
  ]
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## GET /api/v1/auth/oauth/{provider}/authorize

**Iniciar OAuth con PKCE** · Roles: public.

AuthSession genera state y PKCE S256. redirect_uri debe estar en la allowlist del servidor.

Parámetros: `provider` (path, obligatorio), `response_type` (query, obligatorio), `redirect_uri` (query, obligatorio), `state` (query, obligatorio), `code_challenge` (query, obligatorio), `code_challenge_method` (query, obligatorio).

Sin body.

Respuesta exitosa: **302**. Esquema completo en Swagger, incluyendo proyecciones por rol.

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## GET /api/v1/auth/oauth/{provider}/callback

**Recibir retorno OAuth** · Roles: public.

Solo proveedor→backend. Consume state de un uso; email debe estar verificado. Devuelve deep link con código efímero, nunca JWT.

Parámetros: `provider` (path, obligatorio), `state` (query, obligatorio), `code` (query, obligatorio).

Sin body.

Respuesta exitosa: **302**. Esquema completo en Swagger, incluyendo proyecciones por rol.

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## POST /api/v1/auth/oauth/exchange

**Canjear código móvil por sesión** · Roles: public.

PKCE y código de un uso. Vence en 60 segundos; si el correo ya tiene contraseña, OAUTH_LINK_REQUIRED (409) solicita reenviar el mismo code/codeVerifier con password. Ese grant dura 5 minutos y admite hasta cinco intentos. Tras confirmar se vincula el mismo usuario y se emite su sesión.

Body validado por `oauthExchangeSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "code": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "codeVerifier": "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv"
}
```

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "user": {
      "id": "1",
      "email": "cliente@example.com",
      "role": "client",
      "firstName": "Ana",
      "lastName": "Pérez",
      "phone": "1100000000",
      "avatarUrl": null,
      "isActive": true,
      "canRecordPayments": false,
      "hasPassword": true,
      "authVersion": 0
    },
    "accessToken": "JWT_PROPIO",
    "refreshToken": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "expiresIn": 900
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## GET /api/v1/users/me

**Ver perfil propio** · Roles: client, employee, admin.

Sin reglas adicionales a la autenticación y el rol indicado.

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "id": "1",
    "email": "cliente@example.com",
    "role": "client",
    "firstName": "Ana",
    "lastName": "Pérez",
    "phone": "1100000000",
    "avatarUrl": null,
    "isActive": true,
    "canRecordPayments": false,
    "hasPassword": true,
    "authVersion": 0
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## PATCH /api/v1/users/me

**Editar perfil propio** · Roles: client, employee, admin.

No admite rol, email ni privilegios de cobro.

Body validado por `profileSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "firstName": "Ana",
  "lastName": "Pérez",
  "phone": "1100000000",
  "avatarUrl": null
}
```

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "id": "1",
    "email": "cliente@example.com",
    "role": "client",
    "firstName": "Ana",
    "lastName": "Pérez",
    "phone": "1100000000",
    "avatarUrl": null,
    "isActive": true,
    "canRecordPayments": false,
    "hasPassword": true,
    "authVersion": 0
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## PUT /api/v1/users/me/password

**Cambiar contraseña propia** · Roles: client, employee, admin.

Solo cuentas con contraseña local; revoca las sesiones y requiere volver a ingresar.

Body validado por `passwordChangeSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "currentPassword": "Ejemplo-seguro-2026!",
  "newPassword": "Otra-clave-segura-2026!"
}
```

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "passwordChanged": true,
    "requiresLogin": true
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## GET /api/v1/users

**Listar/buscar usuarios** · Roles: admin.

Sin reglas adicionales a la autenticación y el rol indicado.

Parámetros: `page` (query, opcional), `limit` (query, opcional), `search` (query, opcional), `role` (query, opcional).

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "items": [],
    "page": 1,
    "limit": 20,
    "total": 0
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## POST /api/v1/users

**Crear usuario** · Roles: admin.

Sin reglas adicionales a la autenticación y el rol indicado.

Body validado por `createUserSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "email": "empleado@example.com",
  "password": "Ejemplo-seguro-2026!",
  "firstName": "Luis",
  "lastName": "Gómez",
  "role": "employee"
}
```

Respuesta exitosa: **201**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "id": "1",
    "email": "cliente@example.com",
    "role": "client",
    "firstName": "Ana",
    "lastName": "Pérez",
    "phone": "1100000000",
    "avatarUrl": null,
    "isActive": true,
    "canRecordPayments": false,
    "hasPassword": true,
    "authVersion": 0
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## GET /api/v1/users/{id}

**Consultar usuario** · Roles: admin.

Sin reglas adicionales a la autenticación y el rol indicado.

Parámetros: `id` (path, obligatorio).

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "id": "1",
    "email": "cliente@example.com",
    "role": "client",
    "firstName": "Ana",
    "lastName": "Pérez",
    "phone": "1100000000",
    "avatarUrl": null,
    "isActive": true,
    "canRecordPayments": false,
    "hasPassword": true,
    "authVersion": 0
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## PATCH /api/v1/users/{id}

**Editar, activar o desactivar usuario** · Roles: admin.

No permite auto-desactivarse. Serializa con cambios de rol y protege al último administrador. Revoca sesiones del usuario modificado.

Parámetros: `id` (path, obligatorio).

Body validado por `adminPatchSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "isActive": true,
  "canRecordPayments": true
}
```

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "updated": true
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## PATCH /api/v1/users/{id}/role

**Cambiar rol** · Roles: admin.

No permite auto-degradación ni dejar al sistema sin admin activo; invalida permisos anteriores.

Parámetros: `id` (path, obligatorio).

Body validado por `roleSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "role": "employee"
}
```

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "id": "1",
    "email": "cliente@example.com",
    "role": "client",
    "firstName": "Ana",
    "lastName": "Pérez",
    "phone": "1100000000",
    "avatarUrl": null,
    "isActive": true,
    "canRecordPayments": false,
    "hasPassword": true,
    "authVersion": 0
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## DELETE /api/v1/users/{id}

**Eliminar usuario lógicamente** · Roles: admin.

Nunca destruye su historial; prohíbe eliminarse a sí mismo.

Parámetros: `id` (path, obligatorio).

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "updated": true
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## GET /api/v1/vehicles

**Listar/buscar vehículos** · Roles: client, admin.

Cliente: solo propios. Admin: todos.

Parámetros: `page` (query, opcional), `limit` (query, opcional), `search` (query, opcional).

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "items": [],
    "page": 1,
    "limit": 20,
    "total": 0
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## POST /api/v1/vehicles

**Registrar vehículo** · Roles: client, admin.

ownerId opcional exclusivamente para Admin; cliente no puede elegir dueño ajeno.

Body validado por `vehicleSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "plate": "AB123CD",
  "brand": "Toyota",
  "model": "Etios",
  "color": "Gris",
  "vehicleTypeId": "1"
}
```

Respuesta exitosa: **201**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "id": "1",
    "ownerId": "1",
    "vehicleTypeId": "1",
    "plate": "AB123CD",
    "brand": "Toyota",
    "model": "Etios",
    "color": "Gris",
    "typeName": "Auto"
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## GET /api/v1/vehicles/{id}

**Consultar vehículo** · Roles: client, admin.

Propio o administrado; un recurso ajeno responde 404.

Parámetros: `id` (path, obligatorio).

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "id": "1",
    "ownerId": "1",
    "vehicleTypeId": "1",
    "plate": "AB123CD",
    "brand": "Toyota",
    "model": "Etios",
    "color": "Gris",
    "typeName": "Auto"
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## PATCH /api/v1/vehicles/{id}

**Editar vehículo** · Roles: client, admin.

Propio o administrado; valida propietario y tipo activo.

Parámetros: `id` (path, obligatorio).

Body validado por `vehiclePatchSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "color": "Azul"
}
```

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "id": "1",
    "ownerId": "1",
    "vehicleTypeId": "1",
    "plate": "AB123CD",
    "brand": "Toyota",
    "model": "Etios",
    "color": "Gris",
    "typeName": "Auto"
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## DELETE /api/v1/vehicles/{id}

**Eliminar vehículo lógicamente** · Roles: client, admin.

Propio o administrado. 409 si tiene turnos pendientes, confirmados o en proceso.

Parámetros: `id` (path, obligatorio).

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "deleted": true
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## GET /api/v1/vehicle-types

**Listar tipos de vehículo** · Roles: client, employee, admin.

Solo activos, salvo Admin que también consulta inactivos.

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": [
    {
      "id": "1",
      "code": "car",
      "name": "Auto",
      "isActive": true
    }
  ]
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## POST /api/v1/vehicle-types

**Crear tipo de vehículo** · Roles: admin.

Sin reglas adicionales a la autenticación y el rol indicado.

Body validado por `vehicleTypeSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "code": "van",
  "name": "Utilitario",
  "isActive": true
}
```

Respuesta exitosa: **201**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "id": "1",
    "code": "van",
    "name": "Utilitario",
    "isActive": true
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## PUT /api/v1/vehicle-types/{id}

**Editar tipo de vehículo** · Roles: admin.

Sin reglas adicionales a la autenticación y el rol indicado.

Parámetros: `id` (path, obligatorio).

Body validado por `vehicleTypeSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "code": "van",
  "name": "Utilitario",
  "isActive": true
}
```

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "id": "1",
    "code": "van",
    "name": "Utilitario",
    "isActive": true
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## DELETE /api/v1/vehicle-types/{id}

**Desactivar tipo de vehículo** · Roles: admin.

No elimina vehículos ni tarifas históricas relacionadas.

Parámetros: `id` (path, obligatorio).

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "deleted": true
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## GET /api/v1/services

**Ver catálogo y tarifas** · Roles: client, employee, admin.

Descripción, duración y precio por tipo. Admin también ve inactivos.

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": [
    {
      "id": "1",
      "code": "exterior",
      "name": "Lavado exterior",
      "description": "Lavado y secado exterior.",
      "durationMinutes": 35,
      "isActive": true,
      "prices": [
        {
          "vehicleTypeId": "1",
          "priceCents": 900000
        }
      ]
    }
  ]
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## GET /api/v1/services/{id}

**Ver detalle y tarifas del servicio** · Roles: client, employee, admin.

Sin reglas adicionales a la autenticación y el rol indicado.

Parámetros: `id` (path, obligatorio).

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "id": "1",
    "code": "exterior",
    "name": "Lavado exterior",
    "description": "Lavado y secado exterior.",
    "durationMinutes": 35,
    "isActive": true,
    "prices": [
      {
        "vehicleTypeId": "1",
        "priceCents": 900000
      }
    ]
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## POST /api/v1/services

**Crear servicio** · Roles: admin.

Sin reglas adicionales a la autenticación y el rol indicado.

Body validado por `serviceSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "code": "exterior-plus",
  "name": "Exterior Plus",
  "description": "Lavado exterior con secado manual.",
  "durationMinutes": 35,
  "isActive": true
}
```

Respuesta exitosa: **201**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "id": "1",
    "code": "exterior",
    "name": "Lavado exterior",
    "description": "Lavado y secado exterior.",
    "durationMinutes": 35,
    "isActive": true,
    "prices": [
      {
        "vehicleTypeId": "1",
        "priceCents": 900000
      }
    ]
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## PATCH /api/v1/services/{id}

**Editar servicio** · Roles: admin.

No modifica snapshots de turnos guardados.

Parámetros: `id` (path, obligatorio).

Body validado por `servicePatchSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "durationMinutes": 40
}
```

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "id": "1",
    "code": "exterior",
    "name": "Lavado exterior",
    "description": "Lavado y secado exterior.",
    "durationMinutes": 35,
    "isActive": true,
    "prices": [
      {
        "vehicleTypeId": "1",
        "priceCents": 900000
      }
    ]
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## DELETE /api/v1/services/{id}

**Eliminar servicio lógicamente** · Roles: admin.

Conserva todos los servicios ya contratados.

Parámetros: `id` (path, obligatorio).

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "deleted": true
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## PUT /api/v1/services/{id}/prices/{typeId}

**Definir tarifa por tipo** · Roles: admin.

Importe entero en centavos ARS: 900000 = ARS 9000. Evita coma flotante.

Parámetros: `id` (path, obligatorio), `typeId` (path, obligatorio).

Body validado por `priceSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "priceCents": 900000
}
```

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "updated": true
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## GET /api/v1/business

**Consultar atención y política de cancelación** · Roles: client, employee, admin.

Información operativa de lectura para clientes y empleados; no modifica configuración.

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "currencyCode": "ARS",
    "timeZone": "America/Argentina/Buenos_Aires",
    "cancellationNoticeMinutes": 120,
    "simultaneousCapacity": 1,
    "slotStepMinutes": 5,
    "hours": [
      {
        "weekday": 1,
        "opensAt": "09:30",
        "closesAt": "16:30"
      },
      {
        "weekday": 2,
        "opensAt": "09:30",
        "closesAt": "16:30"
      },
      {
        "weekday": 3,
        "opensAt": "09:30",
        "closesAt": "16:30"
      },
      {
        "weekday": 4,
        "opensAt": "09:30",
        "closesAt": "16:30"
      },
      {
        "weekday": 5,
        "opensAt": "09:30",
        "closesAt": "16:30"
      },
      {
        "weekday": 6,
        "opensAt": "09:30",
        "closesAt": "16:30"
      }
    ]
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## GET /api/v1/settings

**Consultar configuración administrativa** · Roles: admin.

Sin reglas adicionales a la autenticación y el rol indicado.

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "currencyCode": "ARS",
    "timeZone": "America/Argentina/Buenos_Aires",
    "cancellationNoticeMinutes": 120,
    "simultaneousCapacity": 1,
    "slotStepMinutes": 5,
    "hours": [
      {
        "weekday": 1,
        "opensAt": "09:30",
        "closesAt": "16:30"
      },
      {
        "weekday": 2,
        "opensAt": "09:30",
        "closesAt": "16:30"
      },
      {
        "weekday": 3,
        "opensAt": "09:30",
        "closesAt": "16:30"
      },
      {
        "weekday": 4,
        "opensAt": "09:30",
        "closesAt": "16:30"
      },
      {
        "weekday": 5,
        "opensAt": "09:30",
        "closesAt": "16:30"
      },
      {
        "weekday": 6,
        "opensAt": "09:30",
        "closesAt": "16:30"
      }
    ]
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## PUT /api/v1/settings

**Guardar configuración administrativa** · Roles: admin.

La semana se guarda atómicamente. Días ausentes quedan cerrados; horarios locales, persistencia de turnos UTC.

Body validado por `settingsSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "timeZone": "America/Argentina/Buenos_Aires",
  "cancellationNoticeMinutes": 120,
  "simultaneousCapacity": 1,
  "slotStepMinutes": 5,
  "hours": [
    {
      "weekday": 1,
      "opensAt": "09:30",
      "closesAt": "16:30"
    },
    {
      "weekday": 2,
      "opensAt": "09:30",
      "closesAt": "16:30"
    },
    {
      "weekday": 3,
      "opensAt": "09:30",
      "closesAt": "16:30"
    },
    {
      "weekday": 4,
      "opensAt": "09:30",
      "closesAt": "16:30"
    },
    {
      "weekday": 5,
      "opensAt": "09:30",
      "closesAt": "16:30"
    },
    {
      "weekday": 6,
      "opensAt": "09:30",
      "closesAt": "16:30"
    }
  ]
}
```

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "currencyCode": "ARS",
    "timeZone": "America/Argentina/Buenos_Aires",
    "cancellationNoticeMinutes": 120,
    "simultaneousCapacity": 1,
    "slotStepMinutes": 5,
    "hours": [
      {
        "weekday": 1,
        "opensAt": "09:30",
        "closesAt": "16:30"
      },
      {
        "weekday": 2,
        "opensAt": "09:30",
        "closesAt": "16:30"
      },
      {
        "weekday": 3,
        "opensAt": "09:30",
        "closesAt": "16:30"
      },
      {
        "weekday": 4,
        "opensAt": "09:30",
        "closesAt": "16:30"
      },
      {
        "weekday": 5,
        "opensAt": "09:30",
        "closesAt": "16:30"
      },
      {
        "weekday": 6,
        "opensAt": "09:30",
        "closesAt": "16:30"
      }
    ]
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## GET /api/v1/availability

**Cotizar y consultar horarios** · Roles: client, admin.

Cliente solo vehículo propio. Suma duración y precios; capacidad se vuelve a comprobar al reservar. Grilla de cinco minutos por defecto.

Parámetros: `date` (query, obligatorio), `vehicleId` (query, obligatorio), `serviceIds` (query, obligatorio).

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "slots": ["2026-12-01T12:30:00.000Z"],
    "totalCents": 900000,
    "durationMinutes": 35,
    "currencyCode": "ARS"
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## GET /api/v1/appointments

**Listar turnos visibles** · Roles: client, employee, admin.

Cliente: propios, sin datos de asignación. Empleado activo: agenda compartida del equipo por fecha local e historial. Admin: todos; puede filtrar por responsable interno.

Parámetros: `page` (query, opcional), `limit` (query, opcional), `date` (query, opcional), `status` (query, opcional), `history` (query, opcional).

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "items": [],
    "page": 1,
    "limit": 20,
    "total": 0
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## POST /api/v1/appointments

**Reservar turno** · Roles: client, admin.

Reserva confirmada automáticamente y visible para todo el equipo. Admin puede incluir clientId; debe ser titular activo del vehículo. Precio/duración se recalculan y congelan bajo lock de agenda. 409 si otro ocupa el horario.

Body validado por `appointmentSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "vehicleId": "1",
  "serviceIds": ["1"],
  "startsAt": "2026-12-01T09:30:00-03:00"
}
```

Respuesta exitosa: **201**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "id": "1",
    "status": "confirmed",
    "startsAt": "2026-12-01T12:30:00.000Z",
    "endsAt": "2026-12-01T13:05:00.000Z",
    "plate": "AB123CD",
    "brand": "Toyota",
    "model": "Etios",
    "color": "Gris",
    "clientName": "Ana Pérez",
    "clientPhone": "1100000000",
    "version": 1,
    "clientId": "1",
    "vehicleId": "1",
    "currencyCode": "ARS",
    "totalCents": 900000,
    "paidCents": 0
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## GET /api/v1/appointments/{id}

**Consultar detalle del turno** · Roles: client, employee, admin.

Cliente propietario; equipo con acceso operativo compartido. Responsable interno solo para Admin. Empleado recibe nombre/teléfono operativos; importes solo con permiso de cobro.

Parámetros: `id` (path, obligatorio).

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "id": "1",
    "status": "pending",
    "startsAt": "2026-12-01T12:30:00.000Z",
    "endsAt": "2026-12-01T13:05:00.000Z",
    "plate": "AB123CD",
    "brand": "Toyota",
    "model": "Etios",
    "color": "Gris",
    "clientName": "Ana Pérez",
    "clientPhone": "1100000000",
    "version": 1,
    "clientId": "1",
    "vehicleId": "1",
    "currencyCode": "ARS",
    "totalCents": 900000,
    "paidCents": 0
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## PATCH /api/v1/appointments/{id}/assignment

**Asignar o reasignar empleado** · Roles: admin.

Empleado activo; no asigna a turnos cerrados ni solapa su agenda.

Parámetros: `id` (path, obligatorio).

Body validado por `assignmentSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "employeeId": "2"
}
```

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "assigned": true
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## PATCH /api/v1/appointments/{id}/status

**Cambiar estado** · Roles: employee, admin.

Equipo: confirmed (o pending anterior) → in_progress → completed. Al iniciar se registra el responsable interno. El acceso continúa compartido. Lock transaccional evita doble inicio y valida capacidad. Admin puede corregir estados. Finalizar requiere que el negocio esté abierto según su horario local. Fuera de horario devuelve 409 OUTSIDE_BUSINESS_HOURS.

Parámetros: `id` (path, obligatorio).

Body validado por `statusSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "status": "in_progress"
}
```

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "updated": true,
    "status": "in_progress"
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## POST /api/v1/appointments/{id}/cancel

**Cancelar turno** · Roles: client, admin.

Cliente propietario: pending/confirmed y más de la anticipación configurada. Admin sin restricción horaria. Registra motivo/actor.

Parámetros: `id` (path, obligatorio).

Body validado por `cancelSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "reason": "Cambio de planes"
}
```

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "updated": true,
    "status": "cancelled"
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## POST /api/v1/appointments/{id}/notes

**Registrar observación** · Roles: employee, admin.

Equipo sobre agenda compartida; autor autenticado se toma de la sesión.

Parámetros: `id` (path, obligatorio).

Body validado por `noteSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "body": "Raya previa en puerta derecha."
}
```

Respuesta exitosa: **201**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "created": true
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## GET /api/v1/appointments/{id}/receipt

**Ver comprobante de servicio** · Roles: client, admin.

Solo turno finalizado y propio/administrado. Es comprobante de trabajo, no factura fiscal.

Parámetros: `id` (path, obligatorio).

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "id": "1",
    "status": "completed",
    "startsAt": "2026-12-01T12:30:00.000Z",
    "endsAt": "2026-12-01T13:05:00.000Z",
    "plate": "AB123CD",
    "brand": "Toyota",
    "model": "Etios",
    "color": "Gris",
    "clientName": "Ana Pérez",
    "clientPhone": "1100000000",
    "version": 1,
    "clientId": "1",
    "vehicleId": "1",
    "currencyCode": "ARS",
    "totalCents": 900000,
    "paidCents": 0,
    "receiptNumber": "LAV-1",
    "issuedAt": "2026-12-01T13:10:00.000Z",
    "fiscalInvoice": false,
    "services": [
      {
        "serviceId": "1",
        "name": "Lavado exterior",
        "priceCents": 900000,
        "durationMinutes": 35
      }
    ],
    "notes": []
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## GET /api/v1/appointments/{id}/payments

**Ver cobros del turno** · Roles: client, admin.

Solo propios/administrados.

Parámetros: `id` (path, obligatorio).

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": []
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## POST /api/v1/appointments/{id}/payments

**Registrar cobro** · Roles: employee, admin.

Empleado del equipo habilitado por Admin. Solo en proceso/finalizado. Mismo reintento no duplica; otro importe con misma clave: 409. Nunca supera saldo.

Parámetros: `id` (path, obligatorio).

Body validado por `paymentSchema`; campos/tipos/restricciones exactos en [request-schemas.json](docs/request-schemas.json).

```json
{
  "amountCents": 900000,
  "method": "cash",
  "reference": null,
  "idempotencyKey": "f6a7d090-2698-4c8f-83be-a0bc369a58c2"
}
```

Respuesta exitosa: **201**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "recorded": true,
    "id": "1",
    "replayed": false
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## GET /api/v1/reports

**Ver reportes administrativos** · Roles: admin.

Lavados por día/semana/mes, ingresos por fecha real de cobro, servicios más pedidos y rendimiento por empleado.

Parámetros: `period` (query, opcional), `date` (query, opcional).

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "period": "day",
    "from": "2026-12-01",
    "to": "2026-12-01",
    "currencyCode": "ARS",
    "totalWashes": 0,
    "revenueCents": 0,
    "days": [
      {
        "date": "2026-12-01",
        "washes": 0,
        "revenueCents": 0
      }
    ],
    "services": [],
    "employees": []
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## GET /api/v1/reports/me

**Ver resumen propio de jornada** · Roles: employee.

Jornada compartida del equipo en la fecha local consultada, con trabajos hechos y pendientes. No revela ingresos del negocio.

Parámetros: `date` (query, opcional).

Sin body.

Respuesta exitosa: **200**. Esquema completo en Swagger, incluyendo proyecciones por rol.

```json
{
  "data": {
    "date": "2026-12-01",
    "completed": 0,
    "pending": 0
  }
}
```

Errores: 400, 401, 403, 404, 409, 429, 500, 503. El código estable `error.code` distingue el motivo; nunca incluye SQL ni hashes.

## Errores comunes

- **400**: Datos inválidos. Revisar error.fields.
- **401**: Sesión ausente, vencida, revocada o credenciales inválidas.
- **403**: Rol/permiso insuficiente.
- **404**: Recurso inexistente o no visible para el actor.
- **409**: Conflicto, duplicado, estado, capacidad o pago inválido.
- **429**: Demasiados intentos.
- **500**: Error interno sin datos sensibles.
- **503**: Servicio o proveedor todavía sin configurar/no disponible.

Ejemplo de error: `{"error":{"code":"SLOT_UNAVAILABLE","message":"Ese horario acaba de ocuparse. Elegí otro."}}`.

## Probar con Postman

Importar [la colección](docs/postman.collection.json), completar los ejemplos con IDs reales y usar un accessToken del rol requerido. Login/registro/refresh actualizan automáticamente los tokens de la colección. Los ejemplos usan cuentas ficticias; no contienen credenciales de producción.

La aceptación automatizada cubre acceso cruzado, sesión revocada, refresh reutilizado, sobrecupo concurrente, estados inválidos, precios históricos y cobros idempotentes. OAuth tiene además pruebas con proveedores simulados; eso no acredita una autorización real hasta configurar cada consola.

## Infraestructura pública

| Método | Ruta                | Rol     | Respuesta                                                         |
| ------ | ------------------- | ------- | ----------------------------------------------------------------- |
| GET    | `/health`           | público | 200: `{"status":"ok","service":"lavadero-api","version":"1.0.0"}` |
| GET    | `/ready`            | público | 200 si MySQL responde; 503 si no está disponible                  |
| GET    | `/api/v1`           | público | 200: `{"version":"v1","stage":10}`                                |
| GET    | `/api/docs/`        | público | 200 HTML Swagger                                                  |
| GET    | `/api/openapi.json` | público | 200 contrato OpenAPI 3.1                                          |
| GET    | `/privacy`          | público | 200 HTML con información de uso de datos                          |

Estos endpoints no reciben body ni requieren JWT.
