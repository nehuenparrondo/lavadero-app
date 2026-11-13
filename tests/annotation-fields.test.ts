import { test } from 'node:test';
import assert from 'node:assert/strict';
import { appointmentNoteFields, cancellationFields } from '../src/constants/appointmentFields';
import { buildFormSchema } from '../src/utils/buildFormSchema';

test('motivos y observaciones requieren contenido real, conservan el texto y respetan los límites', () => {
  const cancellation = buildFormSchema(cancellationFields);
  const notes = buildFormSchema(appointmentNoteFields);
  assert.equal(cancellation.safeParse({ reason: '   \n ' }).success, false);
  assert.equal(cancellation.safeParse({ reason: 'a'.repeat(501) }).success, false);
  assert.equal(notes.safeParse({ body: '  \n ' }).success, false);
  assert.equal(notes.safeParse({ body: 'a'.repeat(2001) }).success, false);
  const text = "Corte de agua; volver a coordinar. Observación: 'puerta rayada'. 🚗";
  assert.equal(cancellation.parse({ reason: '  ' + text + '  ' }).reason, text);
  assert.equal(notes.parse({ body: text }).body, text);
  const credentials = buildFormSchema([
    { name: 'password', label: 'Contraseña', kind: 'password' },
  ]);
  assert.equal(
    credentials.parse({ password: '  clave con espacios  ' }).password,
    '  clave con espacios  ',
  );
});
