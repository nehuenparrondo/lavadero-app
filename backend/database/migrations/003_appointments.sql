-- Estados por código inglés, etiquetas en español.
CREATE TABLE IF NOT EXISTS appointment_statuses (
  id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(20) CHARACTER SET ascii COLLATE ascii_bin NOT NULL UNIQUE,
  label VARCHAR(40) NOT NULL,
  CONSTRAINT chk_status_code CHECK (code IN ('pending','confirmed','in_progress','completed','cancelled'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS appointments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  client_id BIGINT UNSIGNED NOT NULL COMMENT 'Titular histórico al reservar',
  vehicle_id BIGINT UNSIGNED NOT NULL,
  employee_id BIGINT UNSIGNED NULL,
  status_id TINYINT UNSIGNED NOT NULL,
  starts_at DATETIME(3) NOT NULL COMMENT 'UTC, convertir horario de negocio en la API',
  ends_at DATETIME(3) NOT NULL,
  currency_code CHAR(3) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  created_by_id BIGINT UNSIGNED NOT NULL,
  cancelled_by_id BIGINT UNSIGNED NULL,
  cancellation_reason VARCHAR(500) NULL,
  version INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Control de edición concurrente',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_appointment_client FOREIGN KEY (client_id) REFERENCES users(id),
  CONSTRAINT fk_appointment_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
  CONSTRAINT fk_appointment_employee FOREIGN KEY (employee_id) REFERENCES users(id),
  CONSTRAINT fk_appointment_status FOREIGN KEY (status_id) REFERENCES appointment_statuses(id),
  CONSTRAINT fk_appointment_creator FOREIGN KEY (created_by_id) REFERENCES users(id),
  CONSTRAINT fk_appointment_canceller FOREIGN KEY (cancelled_by_id) REFERENCES users(id),
  CONSTRAINT chk_appointment_time CHECK (ends_at > starts_at),
  INDEX idx_appointments_schedule (starts_at, ends_at, status_id),
  INDEX idx_appointments_client (client_id, starts_at),
  INDEX idx_appointments_employee (employee_id, starts_at),
  INDEX idx_appointments_vehicle (vehicle_id, starts_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS appointment_services (
  appointment_id BIGINT UNSIGNED NOT NULL,
  service_id BIGINT UNSIGNED NOT NULL,
  applied_price_cents INT UNSIGNED NOT NULL,
  applied_duration_minutes SMALLINT UNSIGNED NOT NULL,
  applied_service_name VARCHAR(100) NOT NULL COMMENT 'Nombre histórico del servicio contratado',
  PRIMARY KEY (appointment_id, service_id),
  CONSTRAINT fk_item_appointment FOREIGN KEY (appointment_id) REFERENCES appointments(id),
  CONSTRAINT fk_item_service FOREIGN KEY (service_id) REFERENCES services(id),
  CONSTRAINT chk_applied_price CHECK (applied_price_cents > 0),
  CONSTRAINT chk_applied_duration CHECK (applied_duration_minutes > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS appointment_notes (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  appointment_id BIGINT UNSIGNED NOT NULL,
  author_id BIGINT UNSIGNED NOT NULL,
  body VARCHAR(2000) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_note_appointment FOREIGN KEY (appointment_id) REFERENCES appointments(id),
  CONSTRAINT fk_note_author FOREIGN KEY (author_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS appointment_status_history (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  appointment_id BIGINT UNSIGNED NOT NULL,
  status_id TINYINT UNSIGNED NOT NULL,
  changed_by_id BIGINT UNSIGNED NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_history_appointment FOREIGN KEY (appointment_id) REFERENCES appointments(id),
  CONSTRAINT fk_history_status FOREIGN KEY (status_id) REFERENCES appointment_statuses(id),
  CONSTRAINT fk_history_actor FOREIGN KEY (changed_by_id) REFERENCES users(id),
  INDEX idx_status_history (appointment_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS payments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  appointment_id BIGINT UNSIGNED NOT NULL,
  recorded_by_id BIGINT UNSIGNED NOT NULL,
  amount_cents INT UNSIGNED NOT NULL,
  method VARCHAR(16) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  reference VARCHAR(100) NULL,
  idempotency_key CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL UNIQUE,
  paid_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_payment_appointment FOREIGN KEY (appointment_id) REFERENCES appointments(id),
  CONSTRAINT fk_payment_actor FOREIGN KEY (recorded_by_id) REFERENCES users(id),
  CONSTRAINT chk_payment_amount CHECK (amount_cents > 0),
  CONSTRAINT chk_payment_method CHECK (method IN ('cash', 'transfer'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
