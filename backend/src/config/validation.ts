import { z } from 'zod';

// Los mensajes de validación por campo también deben ser comprensibles en español.
z.config(z.locales.es());
