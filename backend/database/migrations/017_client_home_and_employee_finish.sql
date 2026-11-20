-- Limpieza visual propia del cliente y autoría del cierre directo tras cobrar.
SET @home_ddl = IF(EXISTS(SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE()
 AND TABLE_NAME='turnos' AND COLUMN_NAME='home_hidden_at'), 'DO 0',
 'ALTER TABLE turnos ADD COLUMN home_hidden_at DATETIME(3) NULL');
-- statement-breakpoint
PREPARE home_change FROM @home_ddl;
-- statement-breakpoint
EXECUTE home_change;
-- statement-breakpoint
DEALLOCATE PREPARE home_change;
-- statement-breakpoint
SET @finish_ddl = IF(EXISTS(SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE()
 AND TABLE_NAME='partes_lavado' AND COLUMN_NAME='completed_by_employee'), 'DO 0',
 'ALTER TABLE partes_lavado ADD COLUMN completed_by_employee BOOLEAN NOT NULL DEFAULT FALSE');
-- statement-breakpoint
PREPARE finish_change FROM @finish_ddl;
-- statement-breakpoint
EXECUTE finish_change;
-- statement-breakpoint
DEALLOCATE PREPARE finish_change;
