-- CHECK acepta UNKNOWN en MySQL: IS NOT NULL evita un par incompleto con proveedor NULL.
ALTER TABLE oauth_grants
 ADD CONSTRAINT chk_oauth_link_complete_pair CHECK (
  (link_provider IS NULL AND link_subject IS NULL) OR
  (link_provider IS NOT NULL AND link_provider IN ('google','discord','github')
   AND link_subject IS NOT NULL)
 );
