import type { z } from 'zod';
import type { Executor } from '../../utils/db.js';
import { rows, execute } from '../../utils/db.js';
import type { walkInSchema } from './walkIn.schema.js';

/** Busca un reintento para no duplicar un ingreso al reenviar la solicitud.
 * @param requestId Clave UUID del formulario.
 * @param connection Transacción con bloqueo de agenda.
 * @returns Turno existente o undefined.
 */
export async function previousArrival(requestId: string, connection: Executor) {
  return (
    await rows(
      'SELECT CAST(appointment_id AS CHAR) id FROM ingresos_sin_turno WHERE request_id=?',
      [requestId],
      connection,
    )
  )[0];
}

/** Resuelve patente registrada sin crear ni modificar el garaje.
 * @param plate Patente normalizada.
 * @param connection Conexión bloqueada de agenda.
 * @returns Identidad del vehículo y titular activo, si existen.
 */
export async function registeredArrival(plate: string, connection: Executor) {
  return (
    await rows(
      `SELECT CAST(v.id AS CHAR) id,CAST(v.vehicle_type_id AS CHAR) typeId,
 CAST(u.id AS CHAR) clientId FROM vehiculos v LEFT JOIN usuarios u ON u.id=v.owner_id
 AND u.deleted_at IS NULL AND u.is_active=TRUE AND u.role_id=(SELECT id FROM roles WHERE code='client')
 WHERE v.plate=? AND v.deleted_at IS NULL`,
      [plate],
      connection,
    )
  )[0];
}

/** Evita registrar dos veces un auto que ya espera atención o está siendo lavado.
 * @param plate Patente observada en el local.
 * @param connection Conexión con bloqueo de agenda.
 * @returns Si existe un turno activo del mismo auto para hoy o en proceso.
 */
export async function hasActiveArrival(
  plate: string,
  from: string,
  to: string,
  connection: Executor,
) {
  const active = await rows(
    `SELECT a.id FROM turnos a JOIN estados_turno s ON s.id=a.status_id
 LEFT JOIN vehiculos v ON v.id=a.vehicle_id LEFT JOIN ingresos_sin_turno w ON w.appointment_id=a.id
 WHERE COALESCE(v.plate,w.plate)=? AND (s.code IN ('in_progress','awaiting_review') OR
 (s.code IN ('pending','confirmed') AND a.starts_at>=? AND a.starts_at<?)) LIMIT 1`,
    [plate, from, to],
    connection,
  );
  return active.length > 0;
}

/** Persiste datos presenciales y observaciones junto al turno, conservando autoría.
 * @param id Turno recién insertado.
 * @param input Datos validados sin cuenta ni garaje obligatorios.
 * @param actorId Administrador que observó el ingreso.
 * @param connection Transacción de la reserva.
 * @returns Promesa resuelta al guardar todos los datos.
 */
export async function saveArrival(
  id: string,
  input: z.infer<typeof walkInSchema>,
  actorId: string,
  connection: Executor,
) {
  await execute(
    `INSERT INTO ingresos_sin_turno(appointment_id,request_id,plate,brand,model,color,customer_name,customer_phone)
 VALUES(?,?,?,?,?,?,?,?)`,
    [
      id,
      input.requestId,
      input.plate,
      input.brand,
      input.model,
      input.color,
      input.customerName,
      input.customerPhone || null,
    ],
    connection,
  );
  if (input.notes)
    await execute(
      'INSERT INTO notas_turno(appointment_id,author_id,body) VALUES(?,?,?)',
      [id, actorId, input.notes],
      connection,
    );
}
