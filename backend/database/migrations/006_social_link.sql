-- Una coincidencia de email no prueba la contraseña de una cuenta local.
-- El grant queda vinculado al PKCE y requiere confirmar esa contraseña una vez.
ALTER TABLE oauth_grants
 ADD COLUMN link_provider VARCHAR(16) CHARACTER SET ascii COLLATE ascii_bin NULL,
 ADD COLUMN link_subject VARCHAR(255) CHARACTER SET ascii COLLATE ascii_bin NULL,
 ADD COLUMN link_attempts TINYINT UNSIGNED NOT NULL DEFAULT 0,
 ADD CONSTRAINT chk_oauth_link_pair CHECK (
  (link_provider IS NULL AND link_subject IS NULL) OR
  (link_provider IN ('google','discord','github') AND link_subject IS NOT NULL)
 );
