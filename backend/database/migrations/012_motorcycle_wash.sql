-- Una sola opción para motos. Los turnos ya contratados tienen sus propios importes.
INSERT INTO services (code,name,description,duration_minutes) VALUES
('motorcycle_wash','Lavado','Lavado y secado de moto.',35)
ON DUPLICATE KEY UPDATE code=services.code;

-- statement-breakpoint
INSERT INTO service_prices (service_id,vehicle_type_id,price_cents)
SELECT s.id,t.id,1500000 FROM services s CROSS JOIN vehicle_types t
WHERE s.code='motorcycle_wash' AND t.code='motorcycle'
ON DUPLICATE KEY UPDATE price_cents=service_prices.price_cents;
