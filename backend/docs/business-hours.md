# Jornada de 09:30 a 21:30

El horario vigente se guarda en `horarios_atencion`, en la zona `America/Argentina/Buenos_Aires`. Los días abiertos conservan su configuración; la jornada actual de lunes a sábado es de **09:30 a 21:30**. La migración `019_extended_business_hours.sql` actualiza únicamente las horas de los días existentes, bajo el bloqueo de configuración compartido por las operaciones. No cambia reservas, tarifas, capacidad ni días de apertura. En instalaciones nuevas, `seedSchema.ts` y `.env.example` usan el mismo cierre.

Todas las validaciones operativas leen esa configuración:

- `availability.service.ts` ofrece solo inicios cuya duración completa cabe antes del cierre o termina exactamente a las 21:30.
- `assertWorkingTime` en `schedule.ts` vuelve a comprobar apertura, cierre, fecha futura y grilla al reservar. Un lavado de 40 minutos tiene como último inicio las 20:50; uno de 30 minutos, las 21:00. Los extras adelantan el último inicio según su duración.
- `assertCompletionTime` protege los cierres directos, los partes y las revisiones. Se puede finalizar desde las 09:30 incluidas hasta antes de las 21:30. A partir de las 21:30, y en días cerrados, la jornada ya terminó.
- `attendanceWindow` aplica la misma ventana de apertura incluida y cierre excluido al fichaje, usando el reloj y la zona del servidor.
- `walkIn.slot.ts` exige que el ingreso presencial y la duración del trabajo entren en la jornada; no permite registrar un lavado completo a las 21:25.

El frontend recibe los horarios del backend para el calendario, las horas disponibles y las acciones laborales. No calcula una disponibilidad alternativa. Cambiar el reloj del teléfono no altera las validaciones del servidor. Las referencias iniciales y los ejemplos de la API también usan 21:30.

## Comprobación

`tests/schedule.test.ts` y `tests/admin-rules.test.ts` cubren los límites, la noche y el cambio de fecha UTC con zona argentina. `tests/business-hours.integration.ts` prueba sobre MariaDB real: últimos inicios por duración y extras, reservas concurrentes, días cerrados, finalización pagada, fichaje y autos sin turno. Ejecutar `npm run test:hours` con `NODE_ENV=test` y una base QA migrada y sembrada; nunca sobre producción.
