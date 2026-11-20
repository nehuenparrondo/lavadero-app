-- El motivo y autor ya pertenecen a turnos; la lectura del aviso también debe persistir.
SET @notice_read_ddl = IF(EXISTS(
 SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE()
 AND TABLE_NAME='turnos' AND COLUMN_NAME='cancellation_read_at'
), 'DO 0', 'ALTER TABLE turnos ADD COLUMN cancellation_read_at DATETIME(3) NULL');

-- statement-breakpoint
PREPARE notice_read FROM @notice_read_ddl;
-- statement-breakpoint
EXECUTE notice_read;
-- statement-breakpoint
DEALLOCATE PREPARE notice_read;
-- statement-breakpoint
SET @notice_index_ddl = IF(EXISTS(
 SELECT 1 FROM information_schema.STATISTICS WHERE TABLE_SCHEMA=DATABASE()
 AND TABLE_NAME='turnos' AND INDEX_NAME='idx_turnos_cancel_notice'
), 'DO 0', 'CREATE INDEX idx_turnos_cancel_notice ON turnos(client_id,cancellation_read_at,status_id)');
-- statement-breakpoint
PREPARE notice_index FROM @notice_index_ddl;
-- statement-breakpoint
EXECUTE notice_index;
-- statement-breakpoint
DEALLOCATE PREPARE notice_index;
