# Pruebas del frontend

`npm test` ejecuta 42 casos sin acceder a la base publicada. Cubren reserva Guardar/Confirmar, filtros y respuestas tardías, revalidación visible, persistencia y rotación entre pestañas, OAuth/PKCE, manejo de red, recuperación y protecciones web.

`npm run check` añade tipos, lint y auditoría de documentación/modularidad. Desde `main`, `npm run test:tooling` prueba por separado los auditores y generadores comunes. Un bundle exportado no sustituye una prueba instalada en un teléfono. Ver [mantenimiento y alcance](../../docs/maintenance.md) y [revisión actual](../../docs/review.md).
