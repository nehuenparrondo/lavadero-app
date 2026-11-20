-- Cola duradera: la solicitud pública nunca consulta si existe el correo.
CREATE TABLE IF NOT EXISTS limites_recuperacion (
 correo_hash BINARY(32) PRIMARY KEY,
 ventana DATETIME(3) NOT NULL,
 intentos INT UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB;
-- statement-breakpoint
CREATE TABLE IF NOT EXISTS recuperaciones_clave (
 id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin PRIMARY KEY,
 correo VARCHAR(254) NOT NULL,
 usuario_id BIGINT UNSIGNED NULL,
 version_clave INT UNSIGNED NULL,
 nonce BINARY(32) NOT NULL,
 token_hash BINARY(32) NULL UNIQUE,
 estado ENUM('pendiente','procesando','enviado','descartado','usado') NOT NULL DEFAULT 'pendiente',
 intentos INT UNSIGNED NOT NULL DEFAULT 0,
 solicitado_en DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
 proximo_intento DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
 bloqueo_hasta DATETIME(3) NULL,
 vence_en DATETIME(3) NULL,
 enviado_en DATETIME(3) NULL,
 usado_en DATETIME(3) NULL,
 ultimo_error VARCHAR(40) NULL,
 CONSTRAINT fk_recuperacion_usuario FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
 INDEX idx_recuperacion_cola(estado,proximo_intento,bloqueo_hasta),
 INDEX idx_recuperacion_correo(correo,solicitado_en)
) ENGINE=InnoDB;
