-- Catálogos idempotentes. No cambia precios ni desactiva registros existentes.
INSERT INTO roles (code, label) VALUES
('client','Cliente'),('employee','Empleado'),('admin','Administrador')
ON DUPLICATE KEY UPDATE code = roles.code;

-- statement-breakpoint
INSERT INTO estados_turno (code, label) VALUES
('pending','Pendiente'),('confirmed','Confirmado'),('in_progress','En proceso'),
('completed','Finalizado'),('cancelled','Cancelado'),('awaiting_review','En verificación')
ON DUPLICATE KEY UPDATE code = estados_turno.code;

-- statement-breakpoint
INSERT INTO tipos_vehiculo (code, name) VALUES
('car','Auto'),('pickup','Camioneta'),('suv','SUV'),('motorcycle','Moto')
ON DUPLICATE KEY UPDATE code = tipos_vehiculo.code;

-- statement-breakpoint
INSERT INTO servicios (code, name, description, duration_minutes) VALUES
('exterior','Lavado exterior','Carrocería, llantas y secado manual.',35),
('interior','Limpieza interior','Aspirado y limpieza de superficies interiores.',30),
('complete','Lavado completo','Lavado exterior y limpieza interior.',40),
('wax','Encerado','Protección y brillo de la carrocería. Agregalo al lavado exterior o completo.',15),
('upholstery','Limpieza de tapizados','Limpieza de asientos y superficies textiles.',35),
('motorcycle_wash','Lavado','Lavado y secado de moto.',35)
ON DUPLICATE KEY UPDATE code = servicios.code;

-- statement-breakpoint
-- Tarifas iniciales en centavos ARS.
INSERT INTO tarifas_servicio (service_id, vehicle_type_id, price_cents)
SELECT s.id, v.id,
  CASE v.code
    WHEN 'car' THEN IF(s.code = 'complete', 2800000, 1500000)
    WHEN 'pickup' THEN IF(s.code = 'complete', 4400000, 2000000)
    WHEN 'suv' THEN IF(s.code = 'complete', 3400000, 1700000)
  END
FROM servicios s CROSS JOIN tipos_vehiculo v
WHERE s.code IN ('exterior','interior','complete') AND v.code IN ('car','pickup','suv')
ON DUPLICATE KEY UPDATE price_cents = tarifas_servicio.price_cents;

-- statement-breakpoint
INSERT INTO tarifas_servicio (service_id,vehicle_type_id,price_cents)
SELECT s.id,t.id,IF(s.code='wax',1500000,2000000)
FROM servicios s CROSS JOIN tipos_vehiculo t
WHERE s.code IN ('wax','upholstery') AND t.code IN ('car','suv','pickup')
ON DUPLICATE KEY UPDATE price_cents=tarifas_servicio.price_cents;

-- statement-breakpoint
INSERT INTO tarifas_servicio (service_id,vehicle_type_id,price_cents)
SELECT s.id,t.id,1500000 FROM servicios s CROSS JOIN tipos_vehiculo t
WHERE s.code='motorcycle_wash' AND t.code='motorcycle'
ON DUPLICATE KEY UPDATE price_cents=tarifas_servicio.price_cents;
