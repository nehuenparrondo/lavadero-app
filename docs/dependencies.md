# Dependencias — revisión 29/10/2026

`npm audit` informa **8 entradas (3 high, 5 low)** heredadas de la cadena de herramientas
de Expo 58. Son avisos propagados desde dos dependencias, no ocho fallos distintos del código propio:

- `@expo/cli → zod@3.25.76`: [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5),
  consumo de memoria al validar colecciones enormes; el aviso indica parche en Zod 4.6.6.
- `@expo/config → deepmerge@4.3.1`: [GHSA-gcqx-w48m-w2h4](https://github.com/advisories/GHSA-gcqx-w48m-w2h4),
  alteración de prototipos del resultado al combinar entradas maliciosas; sin parche publicado indicado.

Se observaron en CLI/configuración de compilación. El alcance sobre el producto deberá revisarse
al incorporar nuevas funciones; esto no demuestra por sí solo un exploit en la app instalada.
La API, auditada por separado, no tiene avisos reportados en esta fecha.

La solución propuesta por `npm audit fix --force` es Expo 51.0.39: incumple usar el SDK estable
vigente y rompe compatibilidad. No se aplicó. Tampoco se forzó Zod 4 sobre la API de Zod 3 de la CLI.
Usar únicamente configuración de build confiable y no exponer Metro como servidor público de producción.
Revisar actualizaciones compatibles de Expo y repetir audit, doctor, tipos y exportación antes del APK.

`npx expo-doctor`: **20/20 verificaciones aprobadas**. Esto valida configuración/compatibilidad,
no sustituye la auditoría de seguridad ni las pruebas en dispositivos.
