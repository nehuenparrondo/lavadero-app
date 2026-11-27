# Migraciones

Archivos SQL ordenados por prefijo y separados internamente por `-- statement-breakpoint`.
Usar un bloque por sentencia; el punto y coma puede aparecer dentro de cadenas sin dividirlas.
Después de desplegar una migración, nunca editarla: crear la siguiente. Se verifica SHA-256.
MySQL DDL hace commit implícito; tomar backup y aplicar cambios compatibles con la versión anterior.
El runner obtiene lock MySQL por base, mantiene la sesión en UTC y registra versiones aplicadas.

`019_extended_business_hours.sql` cambia los días ya configurados a 09:30–21:30 bajo la misma fila de bloqueo que las reservas. Conserva los días cerrados, los turnos y las tarifas. No editar esa migración después de aplicarla; los cambios posteriores de operación se realizan en Configuración. Ver [horarios y validaciones](../../docs/business-hours.md).

`020_equal_interior_exterior_prices.sql` actualiza solo las seis tarifas interior/exterior de Auto, Camioneta y Utilitario. Conserva completos, extras, otros tipos y los precios contratados de `servicios_turno`. El código `suv` es la categoría cuyo nombre actual en producción es Utilitario. Ver [catálogo, responsables y pendientes](../../docs/catalog-assignment-queue.md).
