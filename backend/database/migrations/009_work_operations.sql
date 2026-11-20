-- Detalles del vehículo, partes de trabajo, atención al cliente y fichajes.
CREATE TABLE IF NOT EXISTS appointment_vehicle_details (
  appointment_id BIGINT UNSIGNED PRIMARY KEY,
  description VARCHAR(1000) NOT NULL,
  CONSTRAINT fk_detail_appointment FOREIGN KEY (appointment_id) REFERENCES appointments(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS wash_submissions (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  appointment_id BIGINT UNSIGNED NOT NULL,
  employee_id BIGINT UNSIGNED NOT NULL,
  employee_name VARCHAR(161) NOT NULL,
  description VARCHAR(2000) NOT NULL,
  submitted_at DATETIME(3) NOT NULL,
  decision ENUM('approved','returned') NULL,
  review_note VARCHAR(1000) NULL,
  reviewed_by_id BIGINT UNSIGNED NULL,
  reviewed_at DATETIME(3) NULL,
  CONSTRAINT fk_wash_appointment FOREIGN KEY (appointment_id) REFERENCES appointments(id),
  CONSTRAINT fk_wash_employee FOREIGN KEY (employee_id) REFERENCES users(id),
  CONSTRAINT fk_wash_reviewer FOREIGN KEY (reviewed_by_id) REFERENCES users(id),
  INDEX idx_wash_appointment (appointment_id, id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS customer_messages (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  client_id BIGINT UNSIGNED NOT NULL,
  submission_id BIGINT UNSIGNED NULL UNIQUE,
  kind ENUM('complaint','feedback') NOT NULL,
  body VARCHAR(2000) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  resolved_at DATETIME(3) NULL,
  resolved_by_id BIGINT UNSIGNED NULL,
  reply VARCHAR(2000) NULL,
  CONSTRAINT fk_message_client FOREIGN KEY (client_id) REFERENCES users(id),
  CONSTRAINT fk_message_submission FOREIGN KEY (submission_id) REFERENCES wash_submissions(id),
  CONSTRAINT fk_message_resolver FOREIGN KEY (resolved_by_id) REFERENCES users(id),
  INDEX idx_message_client (client_id, id),
  INDEX idx_message_open (resolved_at, id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS employee_attendance (
  employee_id BIGINT UNSIGNED NOT NULL,
  work_date DATE NOT NULL,
  employee_name VARCHAR(161) NOT NULL,
  arrived_at DATETIME(3) NOT NULL,
  recorded_by_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (employee_id, work_date),
  CONSTRAINT fk_attendance_employee FOREIGN KEY (employee_id) REFERENCES users(id),
  CONSTRAINT fk_attendance_recorder FOREIGN KEY (recorded_by_id) REFERENCES users(id),
  INDEX idx_attendance_day (work_date, arrived_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- statement-breakpoint
-- Reintentar la migración es seguro si hubo un corte luego del ALTER.
SET @wash_status_ddl = IF(EXISTS(
  SELECT 1 FROM information_schema.TABLE_CONSTRAINTS
  WHERE CONSTRAINT_SCHEMA=DATABASE() AND TABLE_NAME='appointment_statuses'
    AND CONSTRAINT_NAME='chk_status_code'
), 'ALTER TABLE appointment_statuses DROP CHECK chk_status_code,
 ADD CONSTRAINT chk_appointment_status_code
 CHECK (code IN (''pending'',''confirmed'',''in_progress'',''awaiting_review'',''completed'',''cancelled''))',
 'DO 0');

-- statement-breakpoint
PREPARE wash_status_update FROM @wash_status_ddl;

-- statement-breakpoint
EXECUTE wash_status_update;

-- statement-breakpoint
DEALLOCATE PREPARE wash_status_update;

-- statement-breakpoint
INSERT IGNORE INTO appointment_statuses (code,label) VALUES ('awaiting_review','En verificación');
