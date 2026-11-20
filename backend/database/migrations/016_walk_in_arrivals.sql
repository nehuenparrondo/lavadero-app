-- Un ingreso presencial no requiere una cuenta ficticia ni un vehículo de garaje.
ALTER TABLE turnos MODIFY client_id BIGINT UNSIGNED NULL;
-- statement-breakpoint
CREATE TABLE IF NOT EXISTS ingresos_sin_turno (
  appointment_id BIGINT UNSIGNED PRIMARY KEY,
  request_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL UNIQUE,
  plate VARCHAR(16) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  brand VARCHAR(80) NOT NULL DEFAULT '',
  model VARCHAR(80) NOT NULL DEFAULT '',
  color VARCHAR(50) NOT NULL DEFAULT '',
  customer_name VARCHAR(160) NOT NULL DEFAULT '',
  customer_phone VARCHAR(30) NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_ingreso_turno FOREIGN KEY (appointment_id) REFERENCES turnos(id),
  INDEX idx_ingresos_patente (plate)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
