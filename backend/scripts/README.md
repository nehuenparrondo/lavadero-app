# Scripts de desarrollo y revisión

`auditSource.ts` comprueba tamaños de fuente (149 líneas por archivo y 30 por cuerpo de función), contratos TSDoc públicos, dependencias sin ciclos e independencia HTTP de las pantallas. Se ejecuta con `npm run audit:source` y forma parte de `npm run check`. Los comentarios, parámetros y tipos no integran el conteo del cuerpo de una función. No inspecciona SQL, documentos ni artefactos generados.
