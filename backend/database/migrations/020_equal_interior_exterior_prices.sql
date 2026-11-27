-- Seis tarifas vigentes en centavos ARS. El código suv corresponde al actual Utilitario.
-- Conserva completos, adicionales, otros tipos y los importes históricos de cada turno.
START TRANSACTION;
-- statement-breakpoint
SELECT id FROM configuracion_negocio WHERE id = 1 FOR UPDATE;
-- statement-breakpoint
INSERT INTO tarifas_servicio (service_id, vehicle_type_id, price_cents)
SELECT s.id, t.id, agreed.price_cents
FROM (
  SELECT 'car' AS type_code, 1500000 AS price_cents
  UNION ALL SELECT 'pickup', 2000000
  UNION ALL SELECT 'suv', 1700000
) AS agreed
JOIN tipos_vehiculo t ON t.code = agreed.type_code
JOIN servicios s ON s.code IN ('interior', 'exterior') AND s.deleted_at IS NULL
ON DUPLICATE KEY UPDATE price_cents = agreed.price_cents;
-- statement-breakpoint
COMMIT;
