import { DateTime } from 'luxon';
import type { z } from 'zod';
import { AppError } from '../../errors/AppError.js';
import type { Actor } from '../../types/domain.js';
import { readHours, readSettings } from '../settings/settings.repository.js';
import { overlapping } from './appointments.repository.js';
import type { availabilitySchema } from './appointments.schema.js';
import { unavailableReason } from './availability.reason.js';
import { quote } from './bookingQuote.service.js';
import { canBookSlot } from './bookingSlot.service.js';
import { bookingIntervals } from './intervals.js';
import { businessWindow, sqlTime } from './schedule.js';

/** Genera opciones de inicio respetando duración completa, capacidad y vehículo.
 * @param current - Identidad o entidad actual usada para conservar sus invariantes.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @returns `Promise<{ items: import("./appointments.types.js").QuoteItem[]; totalCents: number; durationMinutes: number; slots: string[]; currencyCode: string; }>`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function availability(current: Actor, input: z.infer<typeof availabilitySchema>) {
  const settings = await readSettings();
  if (!settings)
    throw new AppError(503, 'SETTINGS_MISSING', 'El negocio requiere configuración.');
  const quoted = await quote(current, input);
  const hours = await readHours();
  const window = businessWindow(input.date, settings, hours);
  const booked = window
    ? await overlapping(sqlTime(window.open), sqlTime(window.close), undefined)
    : [];
  const intervals = bookingIntervals(booked);
  const slots = availableStarts(
    window,
    quoted.durationMinutes,
    settings,
    intervals,
    quoted.vehicle?.id ?? null,
  );
  return {
    items: quoted.items,
    totalCents: quoted.totalCents,
    durationMinutes: quoted.durationMinutes,
    slots,
    unavailableReason: unavailableReason(window, quoted.durationMinutes, slots),
    currencyCode: settings.currencyCode,
  };
}

/** Recorre la grilla sin confundir el paso de inicios con la duración del lavado. */
function availableStarts(
  window: ReturnType<typeof businessWindow>,
  durationMinutes: number,
  settings: NonNullable<Awaited<ReturnType<typeof readSettings>>>,
  intervals: ReturnType<typeof bookingIntervals>,
  vehicleId: string | null,
) {
  if (!window) return [];
  const slots: string[] = [];
  const duration = durationMinutes * 60000;
  for (
    let start = window.open;
    start + duration <= window.close;
    start += settings.slotStepMinutes * 60000
  ) {
    if (
      start > Date.now() &&
      canBookSlot(start, start + duration, settings.simultaneousCapacity, intervals, vehicleId)
    )
      slots.push(DateTime.fromMillis(start, { zone: 'utc' }).toISO()!);
  }
  return slots;
}
