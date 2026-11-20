-- Configuración de una única sucursal, tipada para evitar claves JSON ambiguas.
CREATE TABLE IF NOT EXISTS business_settings (
  id TINYINT UNSIGNED PRIMARY KEY,
  currency_code CHAR(3) CHARACTER SET ascii COLLATE ascii_bin NOT NULL DEFAULT 'ARS',
  time_zone VARCHAR(80) NOT NULL,
  cancellation_notice_minutes SMALLINT UNSIGNED NOT NULL DEFAULT 120,
  simultaneous_capacity SMALLINT UNSIGNED NOT NULL DEFAULT 1,
  slot_step_minutes SMALLINT UNSIGNED NOT NULL DEFAULT 5,
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT chk_single_business CHECK (id = 1),
  CONSTRAINT chk_capacity CHECK (simultaneous_capacity > 0),
  CONSTRAINT chk_slot_step CHECK (slot_step_minutes > 0),
  CONSTRAINT chk_currency CHECK (currency_code REGEXP '^[A-Z]{3}$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS business_hours (
  weekday TINYINT UNSIGNED PRIMARY KEY COMMENT 'ISO 1=lunes, 7=domingo',
  opens_at TIME NOT NULL,
  closes_at TIME NOT NULL,
  CONSTRAINT chk_weekday CHECK (weekday BETWEEN 1 AND 7),
  CONSTRAINT chk_business_hours CHECK (opens_at >= '00:00:00' AND closes_at <= '24:00:00' AND closes_at > opens_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS booking_day_locks (
  business_date DATE PRIMARY KEY COMMENT 'Fila para SELECT FOR UPDATE al reservar/reprogramar',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
