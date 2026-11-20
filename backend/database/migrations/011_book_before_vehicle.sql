-- Los turnos históricos conservan el vehículo y los nuevos guardan su tipo cotizado.
SET @vehicle_booking_ddl = IF(EXISTS(
  SELECT 1 FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='appointments' AND COLUMN_NAME='reserved_vehicle_type_id'
), 'DO 0',
 'ALTER TABLE appointments
    MODIFY vehicle_id BIGINT UNSIGNED NULL,
    ADD COLUMN reserved_vehicle_type_id SMALLINT UNSIGNED NULL,
    ADD CONSTRAINT fk_appointment_reserved_type FOREIGN KEY (reserved_vehicle_type_id) REFERENCES vehicle_types(id),
    ADD CONSTRAINT chk_appointment_vehicle_or_type CHECK (vehicle_id IS NOT NULL OR reserved_vehicle_type_id IS NOT NULL)');

-- statement-breakpoint
PREPARE booking_vehicle_update FROM @vehicle_booking_ddl;

-- statement-breakpoint
EXECUTE booking_vehicle_update;

-- statement-breakpoint
DEALLOCATE PREPARE booking_vehicle_update;
