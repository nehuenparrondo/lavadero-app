import { z } from 'zod';
const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/u);
/** Configuración tipada de agenda de una única sucursal. */
export const settingsSchema = z
  .object({
    timeZone: z.string().refine((v) => {
      try {
        new Intl.DateTimeFormat('es', { timeZone: v });
        return true;
      } catch {
        return false;
      }
    }),
    cancellationNoticeMinutes: z.number().int().min(0).max(10080),
    simultaneousCapacity: z.number().int().min(1).max(20),
    slotStepMinutes: z.number().int().min(5).max(60),
    hours: z
      .array(
        z
          .object({ weekday: z.number().int().min(1).max(7), opensAt: time, closesAt: time })
          .strict()
          .refine(
            (v) => v.closesAt > v.opensAt,
            'El cierre debe ser posterior a la apertura.',
          ),
      )
      .max(7)
      .refine((v) => new Set(v.map((h) => h.weekday)).size === v.length, 'No repitas días.'),
  })
  .strict();
