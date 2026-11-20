-- Catálogos y vehículos. Patentes y servicios permanecen para conservar el historial.
CREATE TABLE IF NOT EXISTS vehicle_types (
  id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(24) CHARACTER SET ascii COLLATE ascii_bin NOT NULL UNIQUE,
  name VARCHAR(80) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS vehicles (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  owner_id BIGINT UNSIGNED NOT NULL,
  vehicle_type_id SMALLINT UNSIGNED NOT NULL,
  plate VARCHAR(16) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL UNIQUE,
  brand VARCHAR(80) NOT NULL,
  model VARCHAR(80) NOT NULL,
  color VARCHAR(50) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  deleted_at DATETIME(3) NULL,
  CONSTRAINT fk_vehicle_owner FOREIGN KEY (owner_id) REFERENCES users(id),
  CONSTRAINT fk_vehicle_type FOREIGN KEY (vehicle_type_id) REFERENCES vehicle_types(id),
  INDEX idx_vehicles_owner_deleted (owner_id, deleted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS services (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(40) CHARACTER SET ascii COLLATE ascii_bin NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  duration_minutes SMALLINT UNSIGNED NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  deleted_at DATETIME(3) NULL,
  CONSTRAINT chk_service_duration CHECK (duration_minutes > 0),
  CONSTRAINT chk_deleted_service CHECK (deleted_at IS NULL OR is_active = FALSE)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS service_prices (
  service_id BIGINT UNSIGNED NOT NULL,
  vehicle_type_id SMALLINT UNSIGNED NOT NULL,
  price_cents INT UNSIGNED NOT NULL COMMENT 'Centavos ARS, evitar coma flotante',
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (service_id, vehicle_type_id),
  CONSTRAINT fk_price_service FOREIGN KEY (service_id) REFERENCES services(id),
  CONSTRAINT fk_price_type FOREIGN KEY (vehicle_type_id) REFERENCES vehicle_types(id),
  CONSTRAINT chk_positive_price CHECK (price_cents > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
