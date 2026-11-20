-- Estados efímeros consumidos una sola vez, con PKCE móvil y PKCE de proveedor.
CREATE TABLE IF NOT EXISTS oauth_states (
 state_hash BINARY(32) PRIMARY KEY,
 provider VARCHAR(16) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 client_state VARCHAR(256) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 redirect_uri VARCHAR(2048) NOT NULL,
 client_challenge VARCHAR(128) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 provider_verifier VARCHAR(128) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 expires_at DATETIME(3) NOT NULL,
 INDEX idx_oauth_states_expiry (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- statement-breakpoint
-- El deep link transporta este código efímero, nunca JWT ni refresh token.
CREATE TABLE IF NOT EXISTS oauth_grants (
 code_hash BINARY(32) PRIMARY KEY,
 user_id BIGINT UNSIGNED NOT NULL,
 code_challenge VARCHAR(128) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 expires_at DATETIME(3) NOT NULL,
 consumed_at DATETIME(3) NULL,
 CONSTRAINT fk_oauth_grant_user FOREIGN KEY (user_id) REFERENCES users(id),
 INDEX idx_oauth_grants_expiry (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
