-- MySQL 8.4 LTS, InnoDB, UTF-8. Identidades con borrado lógico.
CREATE TABLE IF NOT EXISTS roles (
  id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(20) CHARACTER SET ascii COLLATE ascii_bin NOT NULL UNIQUE,
  label VARCHAR(40) NOT NULL,
  CONSTRAINT chk_role_code CHECK (code IN ('client', 'employee', 'admin'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS users (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS social_accounts (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  provider VARCHAR(16) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  provider_subject VARCHAR(255) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_social_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT chk_provider CHECK (provider IN ('google', 'discord', 'github')),
  UNIQUE KEY uq_provider_subject (provider, provider_subject),
  UNIQUE KEY uq_user_provider (user_id, provider)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- statement-breakpoint
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  token_hash BINARY(32) NOT NULL UNIQUE COMMENT 'SHA-256, nunca guardar el token legible',
  family_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  expires_at DATETIME(3) NOT NULL,
  revoked_at DATETIME(3) NULL,
  replaced_by_id BIGINT UNSIGNED NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_refresh_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_refresh_replacement FOREIGN KEY (replaced_by_id) REFERENCES refresh_tokens(id),
  CONSTRAINT chk_refresh_expiration CHECK (expires_at > created_at),
  INDEX idx_refresh_family (family_id),
  INDEX idx_refresh_user_expiry (user_id, expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
