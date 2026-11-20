-- Los servicios se pueden editar desde el catálogo; la migración conserva cambios previos.
INSERT INTO services (code, name, description, duration_minutes) VALUES
('wax','Encerado','Protección y brillo de la carrocería. Agregalo al lavado exterior o completo.',15),
('upholstery','Limpieza de tapizados','Limpieza de asientos y superficies textiles.',35)
ON DUPLICATE KEY UPDATE code=services.code;

-- statement-breakpoint
INSERT INTO service_prices (service_id,vehicle_type_id,price_cents)
SELECT s.id,t.id,IF(s.code='wax',1500000,2000000)
FROM services s CROSS JOIN vehicle_types t
WHERE s.code IN ('wax','upholstery') AND t.code IN ('car','suv','pickup')
ON DUPLICATE KEY UPDATE price_cents=service_prices.price_cents;
