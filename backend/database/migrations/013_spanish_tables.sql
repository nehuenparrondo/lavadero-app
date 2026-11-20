-- Renombrado atómico, sin copiar ni borrar filas. Las vistas sostienen la versión anterior durante el despliegue.
-- Una repetición tras una interrupción conserva los mismos datos y crea solo las vistas faltantes.
SET @spanish_schema_ddl = IF(EXISTS(
 SELECT 1 FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='turnos' AND TABLE_TYPE='BASE TABLE'
), 'DO 0', 'RENAME TABLE
  users TO usuarios,
  social_accounts TO cuentas_sociales,
  refresh_tokens TO sesiones_renovacion,
  vehicle_types TO tipos_vehiculo,
  vehicles TO vehiculos,
  services TO servicios,
  service_prices TO tarifas_servicio,
  appointment_statuses TO estados_turno,
  appointments TO turnos,
  appointment_services TO servicios_turno,
  appointment_notes TO notas_turno,
  appointment_status_history TO historial_estados_turno,
  payments TO pagos,
  business_settings TO configuracion_negocio,
  business_hours TO horarios_atencion,
  oauth_states TO estados_oauth,
  oauth_grants TO autorizaciones_oauth,
  appointment_vehicle_details TO detalles_vehiculo_turno,
  wash_submissions TO partes_lavado,
  customer_messages TO mensajes_cliente,
  employee_attendance TO asistencia_empleados');

-- statement-breakpoint
PREPARE spanish_schema FROM @spanish_schema_ddl;

-- statement-breakpoint
EXECUTE spanish_schema;

-- statement-breakpoint
DEALLOCATE PREPARE spanish_schema;

-- statement-breakpoint
CREATE OR REPLACE VIEW users AS SELECT * FROM usuarios;

-- statement-breakpoint
CREATE OR REPLACE VIEW social_accounts AS SELECT * FROM cuentas_sociales;

-- statement-breakpoint
CREATE OR REPLACE VIEW refresh_tokens AS SELECT * FROM sesiones_renovacion;

-- statement-breakpoint
CREATE OR REPLACE VIEW vehicle_types AS SELECT * FROM tipos_vehiculo;

-- statement-breakpoint
CREATE OR REPLACE VIEW vehicles AS SELECT * FROM vehiculos;

-- statement-breakpoint
CREATE OR REPLACE VIEW services AS SELECT * FROM servicios;

-- statement-breakpoint
CREATE OR REPLACE VIEW service_prices AS SELECT * FROM tarifas_servicio;

-- statement-breakpoint
CREATE OR REPLACE VIEW appointment_statuses AS SELECT * FROM estados_turno;

-- statement-breakpoint
CREATE OR REPLACE VIEW appointments AS SELECT * FROM turnos;

-- statement-breakpoint
CREATE OR REPLACE VIEW appointment_services AS SELECT * FROM servicios_turno;

-- statement-breakpoint
CREATE OR REPLACE VIEW appointment_notes AS SELECT * FROM notas_turno;

-- statement-breakpoint
CREATE OR REPLACE VIEW appointment_status_history AS SELECT * FROM historial_estados_turno;

-- statement-breakpoint
CREATE OR REPLACE VIEW payments AS SELECT * FROM pagos;

-- statement-breakpoint
CREATE OR REPLACE VIEW business_settings AS SELECT * FROM configuracion_negocio;

-- statement-breakpoint
CREATE OR REPLACE VIEW business_hours AS SELECT * FROM horarios_atencion;

-- statement-breakpoint
CREATE OR REPLACE VIEW oauth_states AS SELECT * FROM estados_oauth;

-- statement-breakpoint
CREATE OR REPLACE VIEW oauth_grants AS SELECT * FROM autorizaciones_oauth;

-- statement-breakpoint
CREATE OR REPLACE VIEW appointment_vehicle_details AS SELECT * FROM detalles_vehiculo_turno;

-- statement-breakpoint
CREATE OR REPLACE VIEW wash_submissions AS SELECT * FROM partes_lavado;

-- statement-breakpoint
CREATE OR REPLACE VIEW customer_messages AS SELECT * FROM mensajes_cliente;

-- statement-breakpoint
CREATE OR REPLACE VIEW employee_attendance AS SELECT * FROM asistencia_empleados;
