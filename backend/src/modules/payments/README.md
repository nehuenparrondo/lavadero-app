# modules/payments

Registro contable de cobros, no ejecución de transferencias. Bloquear turno, respetar saldo y conservar la clave al reintentar.

## Archivos y responsabilidades

| Archivo                                          | Responsabilidad                                                                                 |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| [payments.controller.ts](payments.controller.ts) | Cobros del turno autorizado.                                                                    |
| [payments.repository.ts](payments.repository.ts) | Lista cobros del turno sin datos de autenticación.                                              |
| [payments.routes.ts](payments.routes.ts)         | Rutas anidadas que conservan appointment id por mergeParams.                                    |
| [payments.schema.ts](payments.schema.ts)         | Cobro idempotente en centavos ARS. Clave estable al reintentar desde móvil.                     |
| [payments.service.ts](payments.service.ts)       | Lista cobros propios o administrados; empleados solo pueden registrar cuando están habilitados. |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
