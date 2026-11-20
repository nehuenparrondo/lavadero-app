-- La tabla de serialización también usa un nombre intuitivo y conserva todos los bloqueos por día.
SET @spanish_locks_ddl = IF(EXISTS(
 SELECT 1 FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='bloqueos_agenda' AND TABLE_TYPE='BASE TABLE'
), 'DO 0', 'RENAME TABLE booking_day_locks TO bloqueos_agenda');

-- statement-breakpoint
PREPARE spanish_locks FROM @spanish_locks_ddl;

-- statement-breakpoint
EXECUTE spanish_locks;

-- statement-breakpoint
DEALLOCATE PREPARE spanish_locks;

-- statement-breakpoint
CREATE OR REPLACE VIEW booking_day_locks AS SELECT * FROM bloqueos_agenda;
