-- Extiende la jornada de los días actualmente abiertos sin agregar días de atención.
-- Usa el mismo lock de configuración que reservas, fichajes y cierre de lavados.
START TRANSACTION;
-- statement-breakpoint
SELECT id FROM configuracion_negocio WHERE id = 1 FOR UPDATE;
-- statement-breakpoint
UPDATE horarios_atencion SET opens_at = '09:30:00', closes_at = '21:30:00';
-- statement-breakpoint
COMMIT;
