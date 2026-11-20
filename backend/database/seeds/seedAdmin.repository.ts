import bcrypt from 'bcrypt';
import type { PoolConnection, RowDataPacket } from 'mysql2/promise';

/** Crea solo el administrador inicial. Nunca promueve cuentas existentes ni resetea claves.
 * @param connection - Conexión de las semillas en la base de instalación.
 * @param email - Correo del administrador inicial, validado desde SEED_ADMIN_EMAIL.
 * @param password - Contraseña inicial validada; solo se guarda su hash y no reemplaza la existente.
 * @returns Promesa sin valor; crea la cuenta inicial si falta y conserva cuentas ya existentes.
 */
export async function seedAdmin(connection: PoolConnection, email: string, password: string) {
  const [existing] = await connection.execute<RowDataPacket[]>(
    'SELECT u.id, u.is_active, u.deleted_at, r.code FROM usuarios u JOIN roles r ON r.id=u.role_id WHERE u.email=?',
    [email],
  );
  if (existing[0]) {
    if (existing[0].code !== 'admin' || !existing[0].is_active || existing[0].deleted_at) {
      throw new Error('La cuenta semilla existe y no es un administrador activo.');
    }
    return;
  }
  const hash = await bcrypt.hash(password, 12);
  await connection.execute(
    `INSERT INTO usuarios (role_id, email, password_hash, first_name, last_name)
     SELECT id, ?, ?, 'Administrador', 'Inicial' FROM roles WHERE code = 'admin'`,
    [email, hash],
  );
}
