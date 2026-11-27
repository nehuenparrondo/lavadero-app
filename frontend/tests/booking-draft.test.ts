import assert from 'node:assert/strict';
import { test } from 'node:test';
import { bookingDraft, initialBooking } from '../src/utils/bookingDraft';
import { canBook } from '../src/utils/bookingAvailability';

const first = new Date(Date.now() + 86400000).toISOString();
const second = new Date(Date.now() + 90000000).toISOString();
const quote = {
  slots: [first, second],
  totalCents: 2800000,
  durationMinutes: 35,
  currencyCode: 'ARS',
};

test('elegir una hora no habilita reservar hasta guardarla explícitamente', () => {
  const chosen = bookingDraft(initialBooking('client'), {
    type: 'choose',
    field: 'draftSlot',
    value: first,
  });
  assert.equal(chosen.draftSlot, first);
  assert.equal(canBook(quote, chosen.slot, false, ''), false);
  const saved = bookingDraft(chosen, { type: 'save', slot: first });
  assert.equal(saved.slot, first);
  assert.equal(canBook(quote, saved.slot, false, ''), true);
});

test('cambiar de hora exige guardar otra vez, pero el ajuste de la rueda a la misma hora conserva el resumen', () => {
  const chosen = bookingDraft(initialBooking('client'), {
    type: 'choose',
    field: 'draftSlot',
    value: first,
  });
  const saved = bookingDraft(chosen, { type: 'save', slot: first });
  assert.equal(
    bookingDraft(saved, { type: 'choose', field: 'draftSlot', value: first }),
    saved,
  );
  const changed = bookingDraft(saved, { type: 'choose', field: 'draftSlot', value: second });
  assert.equal(changed.slot, '');
  assert.equal(changed.draftSlot, second);
  assert.equal(canBook(quote, changed.slot, false, ''), false);
});

test('otra fecha, servicio, categoría o titular invalida ambas horas y los guardados tardíos', () => {
  const saved = {
    ...initialBooking('client'),
    date: '2026-12-01',
    baseId: 'wash',
    extraIds: 'wax',
    vehicleTypeId: 'car',
    slot: first,
    draftSlot: first,
  };
  for (const field of ['date', 'baseId', 'extraIds', 'vehicleTypeId', 'clientId'] as const) {
    const changed = bookingDraft(saved, { type: 'choose', field, value: 'changed' });
    assert.equal(changed.slot, '');
    assert.equal(changed.draftSlot, '');
    assert.equal(bookingDraft(changed, { type: 'save', slot: first }), changed);
  }
  assert.equal(
    bookingDraft(saved, { type: 'choose', field: 'vehicleTypeId', value: 'suv' }).baseId,
    '',
  );
});

test('un turno guardado sigue sujeto a disponibilidad, errores y vencimiento', () => {
  assert.equal(canBook({ ...quote, slots: [second] }, first, false, ''), false);
  assert.equal(canBook(quote, first, true, ''), false);
  assert.equal(canBook(quote, first, false, 'sin conexión'), false);
  const past = new Date(Date.now() - 1000).toISOString();
  assert.equal(canBook({ ...quote, slots: [past] }, past, false, ''), false);
});

test('el rechazo de una reserva anterior conserva la nueva selección y limpia la rechazada si sigue vigente', () => {
  const saved = { ...initialBooking('client'), slot: second, draftSlot: second };
  assert.equal(bookingDraft(saved, { type: 'reject', slot: first }), saved);
  const rejected = bookingDraft(saved, { type: 'reject', slot: second });
  assert.equal(rejected.slot, '');
  assert.equal(rejected.draftSlot, '');
});
