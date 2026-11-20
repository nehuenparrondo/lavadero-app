-- Actualiza únicamente las nueve tarifas acordadas, en centavos ARS.
-- Las reservas conservan su precio histórico en appointment_services.
INSERT INTO service_prices (service_id, vehicle_type_id, price_cents)
SELECT s.id, v.id, prices.new_price
FROM (
  SELECT 'car' AS vehicle_code, 'interior' AS service_code, 1500000 AS new_price
  UNION ALL SELECT 'car', 'exterior', 1500000
  UNION ALL SELECT 'car', 'complete', 2800000
  UNION ALL SELECT 'pickup', 'interior', 2000000
  UNION ALL SELECT 'pickup', 'exterior', 2000000
  UNION ALL SELECT 'pickup', 'complete', 4400000
  UNION ALL SELECT 'suv', 'interior', 1700000
  UNION ALL SELECT 'suv', 'exterior', 1700000
  UNION ALL SELECT 'suv', 'complete', 3400000
) AS prices
JOIN services s ON s.code = prices.service_code
JOIN vehicle_types v ON v.code = prices.vehicle_code
ON DUPLICATE KEY UPDATE price_cents = prices.new_price;
