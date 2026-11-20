-- ESQUEMA AGREGADO DE REFERENCIA. Usar npm run db:migrate para registrar versiones.
-- MariaDB 11.8, compatible con MySQL 8.4, InnoDB, UTF-8. Identidades con borrado lógico.
CREATE TABLE IF NOT EXISTS roles (
  id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(20) CHARACTER SET ascii COLLATE ascii_bin NOT NULL UNIQUE,
  label VARCHAR(40) NOT NULL,
  CONSTRAINT chk_role_code CHECK (code IN ('client', 'employee', 'admin'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS usuarios (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  role_id TINYINT UNSIGNED NOT NULL,
  email VARCHAR(254) NOT NULL UNIQUE COMMENT 'Normalizar a minúsculas antes de persistir',
  password_hash VARCHAR(60) CHARACTER SET ascii NULL COMMENT 'bcrypt, NULL si solo usa OAuth',
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL DEFAULT '',
  phone VARCHAR(30) NULL,
  avatar_url VARCHAR(2048) NULL,
  can_record_payments BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  auth_version INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Invalida JWT al cambiar permisos',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  deleted_at DATETIME(3) NULL,
  CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(id),
  CONSTRAINT chk_deleted_user CHECK (deleted_at IS NULL OR is_active = FALSE),
  INDEX idx_users_role_active (role_id, is_active, deleted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS cuentas_sociales (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  provider VARCHAR(16) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  provider_subject VARCHAR(255) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_social_user FOREIGN KEY (user_id) REFERENCES usuarios(id),
  CONSTRAINT chk_provider CHECK (provider IN ('google', 'discord', 'github')),
  UNIQUE KEY uq_provider_subject (provider, provider_subject),
  UNIQUE KEY uq_user_provider (user_id, provider)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS sesiones_renovacion (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  token_hash BINARY(32) NOT NULL UNIQUE COMMENT 'SHA-256, nunca guardar el token legible',
  family_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  expires_at DATETIME(3) NOT NULL,
  revoked_at DATETIME(3) NULL,
  replaced_by_id BIGINT UNSIGNED NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_refresh_user FOREIGN KEY (user_id) REFERENCES usuarios(id),
  CONSTRAINT fk_refresh_replacement FOREIGN KEY (replaced_by_id) REFERENCES sesiones_renovacion(id),
  CONSTRAINT chk_refresh_expiration CHECK (expires_at > created_at),
  INDEX idx_refresh_family (family_id),
  INDEX idx_refresh_user_expiry (user_id, expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- statement-breakpoint
-- Catálogos y vehículos. Patentes y servicios permanecen para conservar el historial.
CREATE TABLE IF NOT EXISTS tipos_vehiculo (
  id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(24) CHARACTER SET ascii COLLATE ascii_bin NOT NULL UNIQUE,
  name VARCHAR(80) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS vehiculos (
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
  CONSTRAINT fk_vehicle_owner FOREIGN KEY (owner_id) REFERENCES usuarios(id),
  CONSTRAINT fk_vehicle_type FOREIGN KEY (vehicle_type_id) REFERENCES tipos_vehiculo(id),
  INDEX idx_vehicles_owner_deleted (owner_id, deleted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS servicios (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS tarifas_servicio (
  service_id BIGINT UNSIGNED NOT NULL,
  vehicle_type_id SMALLINT UNSIGNED NOT NULL,
  price_cents INT UNSIGNED NOT NULL COMMENT 'Centavos ARS, evitar coma flotante',
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (service_id, vehicle_type_id),
  CONSTRAINT fk_price_service FOREIGN KEY (service_id) REFERENCES servicios(id),
  CONSTRAINT fk_price_type FOREIGN KEY (vehicle_type_id) REFERENCES tipos_vehiculo(id),
  CONSTRAINT chk_positive_price CHECK (price_cents > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- statement-breakpoint
-- Estados por código inglés, etiquetas en español.
CREATE TABLE IF NOT EXISTS estados_turno (
  id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(20) CHARACTER SET ascii COLLATE ascii_bin NOT NULL UNIQUE,
  label VARCHAR(40) NOT NULL,
  CONSTRAINT chk_status_code CHECK (code IN ('pending','confirmed','in_progress','completed','cancelled'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS turnos (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  client_id BIGINT UNSIGNED NULL COMMENT 'Titular histórico al reservar',
  vehicle_id BIGINT UNSIGNED NULL,
  reserved_vehicle_type_id SMALLINT UNSIGNED NULL,
  employee_id BIGINT UNSIGNED NULL,
  status_id TINYINT UNSIGNED NOT NULL,
  starts_at DATETIME(3) NOT NULL COMMENT 'UTC, convertir horario de negocio en la API',
  ends_at DATETIME(3) NOT NULL,
  currency_code CHAR(3) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  created_by_id BIGINT UNSIGNED NOT NULL,
  cancelled_by_id BIGINT UNSIGNED NULL,
  cancellation_reason VARCHAR(500) NULL,
  cancellation_read_at DATETIME(3) NULL COMMENT 'Lectura confirmada del aviso de cancelación',
  version INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Control de edición concurrente',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_appointment_client FOREIGN KEY (client_id) REFERENCES usuarios(id),
  CONSTRAINT fk_appointment_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehiculos(id),
  CONSTRAINT fk_appointment_reserved_type FOREIGN KEY (reserved_vehicle_type_id) REFERENCES tipos_vehiculo(id),
  CONSTRAINT chk_appointment_vehicle_or_type CHECK (vehicle_id IS NOT NULL OR reserved_vehicle_type_id IS NOT NULL),
  CONSTRAINT fk_appointment_employee FOREIGN KEY (employee_id) REFERENCES usuarios(id),
  CONSTRAINT fk_appointment_status FOREIGN KEY (status_id) REFERENCES estados_turno(id),
  CONSTRAINT fk_appointment_creator FOREIGN KEY (created_by_id) REFERENCES usuarios(id),
  CONSTRAINT fk_appointment_canceller FOREIGN KEY (cancelled_by_id) REFERENCES usuarios(id),
  CONSTRAINT chk_appointment_time CHECK (ends_at > starts_at),
  INDEX idx_appointments_schedule (starts_at, ends_at, status_id),
  INDEX idx_appointments_client (client_id, starts_at),
  INDEX idx_appointments_employee (employee_id, starts_at),
  INDEX idx_appointments_vehicle (vehicle_id, starts_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS servicios_turno (
  appointment_id BIGINT UNSIGNED NOT NULL,
  service_id BIGINT UNSIGNED NOT NULL,
  applied_price_cents INT UNSIGNED NOT NULL,
  applied_duration_minutes SMALLINT UNSIGNED NOT NULL,
  applied_service_name VARCHAR(100) NOT NULL COMMENT 'Nombre histórico del servicio contratado',
  PRIMARY KEY (appointment_id, service_id),
  CONSTRAINT fk_item_appointment FOREIGN KEY (appointment_id) REFERENCES turnos(id),
  CONSTRAINT fk_item_service FOREIGN KEY (service_id) REFERENCES servicios(id),
  CONSTRAINT chk_applied_price CHECK (applied_price_cents > 0),
  CONSTRAINT chk_applied_duration CHECK (applied_duration_minutes > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS notas_turno (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  appointment_id BIGINT UNSIGNED NOT NULL,
  author_id BIGINT UNSIGNED NOT NULL,
  body VARCHAR(2000) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_note_appointment FOREIGN KEY (appointment_id) REFERENCES turnos(id),
  CONSTRAINT fk_note_author FOREIGN KEY (author_id) REFERENCES usuarios(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS historial_estados_turno (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  appointment_id BIGINT UNSIGNED NOT NULL,
  status_id TINYINT UNSIGNED NOT NULL,
  changed_by_id BIGINT UNSIGNED NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_history_appointment FOREIGN KEY (appointment_id) REFERENCES turnos(id),
  CONSTRAINT fk_history_status FOREIGN KEY (status_id) REFERENCES estados_turno(id),
  CONSTRAINT fk_history_actor FOREIGN KEY (changed_by_id) REFERENCES usuarios(id),
  INDEX idx_status_history (appointment_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS pagos (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  appointment_id BIGINT UNSIGNED NOT NULL,
  recorded_by_id BIGINT UNSIGNED NOT NULL,
  amount_cents INT UNSIGNED NOT NULL,
  method VARCHAR(16) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  reference VARCHAR(100) NULL,
  idempotency_key CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL UNIQUE,
  paid_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_payment_appointment FOREIGN KEY (appointment_id) REFERENCES turnos(id),
  CONSTRAINT fk_payment_actor FOREIGN KEY (recorded_by_id) REFERENCES usuarios(id),
  CONSTRAINT chk_payment_amount CHECK (amount_cents > 0),
  CONSTRAINT chk_payment_method CHECK (method IN ('cash', 'transfer'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- statement-breakpoint
-- Configuración de una única sucursal, tipada para evitar claves JSON ambiguas.
CREATE TABLE IF NOT EXISTS configuracion_negocio (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS horarios_atencion (
  weekday TINYINT UNSIGNED PRIMARY KEY COMMENT 'ISO 1=lunes, 7=domingo',
  opens_at TIME NOT NULL,
  closes_at TIME NOT NULL,
  CONSTRAINT chk_weekday CHECK (weekday BETWEEN 1 AND 7),
  CONSTRAINT chk_business_hours CHECK (opens_at >= '00:00:00' AND closes_at <= '24:00:00' AND closes_at > opens_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS bloqueos_agenda (
  business_date DATE PRIMARY KEY COMMENT 'Fila para SELECT FOR UPDATE al reservar/reprogramar',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- statement-breakpoint
-- Estados efímeros consumidos una sola vez, con PKCE móvil y PKCE de proveedor.
CREATE TABLE IF NOT EXISTS estados_oauth (
 state_hash BINARY(32) PRIMARY KEY,
 provider VARCHAR(16) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 client_state VARCHAR(256) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 redirect_uri VARCHAR(2048) NOT NULL,
 client_challenge VARCHAR(128) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 provider_verifier VARCHAR(128) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 expires_at DATETIME(3) NOT NULL,
 INDEX idx_oauth_states_expiry (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- statement-breakpoint
-- El deep link transporta este código efímero, nunca JWT ni refresh token.
CREATE TABLE IF NOT EXISTS autorizaciones_oauth (
 code_hash BINARY(32) PRIMARY KEY,
 user_id BIGINT UNSIGNED NOT NULL,
 code_challenge VARCHAR(128) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 expires_at DATETIME(3) NOT NULL,
 consumed_at DATETIME(3) NULL,
 CONSTRAINT fk_oauth_grant_user FOREIGN KEY (user_id) REFERENCES usuarios(id),
 INDEX idx_oauth_grants_expiry (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Una coincidencia de email no prueba la contraseña de una cuenta local.
-- El grant queda vinculado al PKCE y requiere confirmar esa contraseña una vez.
ALTER TABLE autorizaciones_oauth
 ADD COLUMN link_provider VARCHAR(16) CHARACTER SET ascii COLLATE ascii_bin NULL,
 ADD COLUMN link_subject VARCHAR(255) CHARACTER SET ascii COLLATE ascii_bin NULL,
 ADD COLUMN link_attempts TINYINT UNSIGNED NOT NULL DEFAULT 0,
 ADD CONSTRAINT chk_oauth_link_pair CHECK (
  (link_provider IS NULL AND link_subject IS NULL) OR
  (link_provider IN ('google','discord','github') AND link_subject IS NOT NULL)
 );

-- CHECK acepta UNKNOWN en MySQL: IS NOT NULL evita un par incompleto con proveedor NULL.
ALTER TABLE autorizaciones_oauth
 ADD CONSTRAINT chk_oauth_link_complete_pair CHECK (
  (link_provider IS NULL AND link_subject IS NULL) OR
  (link_provider IS NOT NULL AND link_provider IN ('google','discord','github')
   AND link_subject IS NOT NULL)
 );


-- statement-breakpoint
-- Detalles del vehículo, partes de trabajo, atención al cliente y fichajes.
CREATE TABLE IF NOT EXISTS detalles_vehiculo_turno (
  appointment_id BIGINT UNSIGNED PRIMARY KEY,
  description VARCHAR(1000) NOT NULL,
  CONSTRAINT fk_detail_appointment FOREIGN KEY (appointment_id) REFERENCES turnos(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS partes_lavado (
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
  CONSTRAINT fk_wash_appointment FOREIGN KEY (appointment_id) REFERENCES turnos(id),
  CONSTRAINT fk_wash_employee FOREIGN KEY (employee_id) REFERENCES usuarios(id),
  CONSTRAINT fk_wash_reviewer FOREIGN KEY (reviewed_by_id) REFERENCES usuarios(id),
  INDEX idx_wash_appointment (appointment_id, id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS mensajes_cliente (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  client_id BIGINT UNSIGNED NOT NULL,
  submission_id BIGINT UNSIGNED NULL UNIQUE,
  kind ENUM('complaint','feedback') NOT NULL,
  body VARCHAR(2000) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  resolved_at DATETIME(3) NULL,
  resolved_by_id BIGINT UNSIGNED NULL,
  reply VARCHAR(2000) NULL,
  CONSTRAINT fk_message_client FOREIGN KEY (client_id) REFERENCES usuarios(id),
  CONSTRAINT fk_message_submission FOREIGN KEY (submission_id) REFERENCES partes_lavado(id),
  CONSTRAINT fk_message_resolver FOREIGN KEY (resolved_by_id) REFERENCES usuarios(id),
  INDEX idx_message_client (client_id, id),
  INDEX idx_message_open (resolved_at, id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS asistencia_empleados (
  employee_id BIGINT UNSIGNED NOT NULL,
  work_date DATE NOT NULL,
  employee_name VARCHAR(161) NOT NULL,
  arrived_at DATETIME(3) NOT NULL,
  recorded_by_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (employee_id, work_date),
  CONSTRAINT fk_attendance_employee FOREIGN KEY (employee_id) REFERENCES usuarios(id),
  CONSTRAINT fk_attendance_recorder FOREIGN KEY (recorded_by_id) REFERENCES usuarios(id),
  INDEX idx_attendance_day (work_date, arrived_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- statement-breakpoint
-- Reintentar la migración es seguro si hubo un corte luego del ALTER.
SET @wash_status_ddl = IF(EXISTS(
  SELECT 1 FROM information_schema.TABLE_CONSTRAINTS
  WHERE CONSTRAINT_SCHEMA=DATABASE() AND TABLE_NAME='estados_turno'
    AND CONSTRAINT_NAME='chk_status_code'
), 'ALTER TABLE estados_turno DROP CONSTRAINT chk_status_code,
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
INSERT IGNORE INTO estados_turno (code,label) VALUES ('awaiting_review','En verificación');

-- statement-breakpoint
CREATE INDEX idx_turnos_cancel_notice ON turnos(client_id,cancellation_read_at,status_id);

-- statement-breakpoint
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

-- statement-breakpoint
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
