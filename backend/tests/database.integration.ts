import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { database } from '../src/config/database.js';

if (!database || process.env.NODE_ENV !== 'test') {
  throw new Error(
    'Usá NODE_ENV=test y DATABASE_URL de una base de pruebas migrada y sembrada.',
  );
}
const pool = database;
after(async () => {
  await pool.end();
});

test('catálogos y configuración confirmada existen', async () => {
  const [roles] = await pool.query<RowDataPacket[]>('SELECT code FROM roles ORDER BY code');
  assert.deepEqual(
    roles.map((row) => row.code),
    ['admin', 'client', 'employee'],
  );
  const [settings] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM configuracion_negocio WHERE id=1',
  );
  assert.equal(settings[0]?.currency_code, 'ARS');
  assert.equal(settings[0]?.simultaneous_capacity, 1);
  assert.equal(settings[0]?.slot_step_minutes, 5);
  const [hours] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM horarios_atencion ORDER BY weekday',
  );
  assert.deepEqual(
    hours.map((row) => row.weekday),
    [1, 2, 3, 4, 5, 6],
  );
  assert.equal(hours[0]?.opens_at, '09:30:00');
  assert.equal(hours[0]?.closes_at, '16:30:00');
});

test('email, patente y claves foráneas se protegen en la base', async () => {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  try {
    const email = `${randomUUID()}@example.invalid`;
    const [user] = await connection.execute<ResultSetHeader>(
      "INSERT INTO usuarios (role_id,email,first_name) SELECT id,?,'Test' FROM roles WHERE code='client'",
      [email],
    );
    await assert.rejects(
      connection.execute(
        'INSERT INTO usuarios (role_id,email,first_name) SELECT role_id,?,first_name FROM usuarios WHERE id=?',
        [email, user.insertId],
      ),
      { code: 'ER_DUP_ENTRY' },
    );
    await connection.execute(
      "INSERT INTO vehiculos (owner_id,vehicle_type_id,plate,brand,model,color) SELECT ?,id,'TESTSQL01','A','B','C' FROM tipos_vehiculo WHERE code='car'",
      [user.insertId],
    );
    await assert.rejects(
      connection.execute(
        "INSERT INTO vehiculos (owner_id,vehicle_type_id,plate,brand,model,color) SELECT ?,id,'testsql01','A','B','C' FROM tipos_vehiculo WHERE code='car'",
        [user.insertId],
      ),
      { code: 'ER_DUP_ENTRY' },
    );
    await assert.rejects(
      connection.execute(
        "INSERT INTO usuarios (role_id,email,first_name) VALUES (255,?,'Invalid')",
        [randomUUID() + '@example.invalid'],
      ),
      { code: 'ER_NO_REFERENCED_ROW_2' },
    );
  } finally {
    await connection.rollback();
    connection.release();
  }
});

test('la base rechaza duración cero y un rango horario invertido', async () => {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  try {
    await assert.rejects(
      connection.execute(
        "INSERT INTO servicios (code,name,description,duration_minutes) VALUES (?,'Test','Test',0)",
        [randomUUID()],
      ),
      checkConstraint,
    );
    await assert.rejects(
      connection.query(
        "UPDATE horarios_atencion SET opens_at='17:00:00',closes_at='09:00:00' WHERE weekday=1",
      ),
      checkConstraint,
    );
  } finally {
    await connection.rollback();
    connection.release();
  }
});

function checkConstraint(error: unknown) {
  return Boolean(
    error &&
    typeof error === 'object' &&
    'errno' in error &&
    [3819, 4025].includes(Number(error.errno)),
  );
}

test('todas las tablas de negocio usan los nombres españoles y conservan sus claves', async () => {
  const [tables] = await pool.query<RowDataPacket[]>(
    "SELECT TABLE_NAME name FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_TYPE='BASE TABLE'",
  );
  const expected = [
    'limites_recuperacion',
    'recuperaciones_clave',
    'roles',
    'usuarios',
    'cuentas_sociales',
    'sesiones_renovacion',
    'tipos_vehiculo',
    'vehiculos',
    'servicios',
    'tarifas_servicio',
    'estados_turno',
    'turnos',
    'servicios_turno',
    'notas_turno',
    'historial_estados_turno',
    'pagos',
    'configuracion_negocio',
    'horarios_atencion',
    'estados_oauth',
    'autorizaciones_oauth',
    'detalles_vehiculo_turno',
    'partes_lavado',
    'mensajes_cliente',
    'asistencia_empleados',
    'migraciones_esquema',
    'bloqueos_agenda',
    'ingresos_sin_turno',
  ];
  assert.deepEqual(tables.map((row) => row.name).sort(), expected.sort());
  const [keys] = await pool.query<RowDataPacket[]>(
    'SELECT REFERENCED_TABLE_NAME name FROM information_schema.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA=DATABASE() AND REFERENCED_TABLE_NAME IS NOT NULL',
  );
  assert.ok(keys.length > 20);
  assert.ok(keys.every((key) => expected.includes(String(key.name))));
});
