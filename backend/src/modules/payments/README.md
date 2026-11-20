# src/modules/payments

<!-- Generado por npm run docs. -->

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

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
