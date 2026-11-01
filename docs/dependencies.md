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

## Revisión del rediseño — 01/11/2026

La auditoría del lockfile actual informa 22 entradas (2 high, 19 moderate y 1 low), sin critical. Incluye avisos propagados en herramientas Expo/ESLint; los high se reportan en @expo/cli y su Zod transitivo. react-native-svg 15.16.0, incorporado con expo install para el SDK 58, no figura entre las entradas vulnerables de esta auditoría. La Zod directa de formularios es 4.6.7 o compatible, distinta de la Zod transitiva de herramientas.

El contador de octubre anterior es una evidencia histórica, no el estado actual. No se aplicó audit fix --force: el reporte ofrece degradar Expo a 51.0.39 y ESLint a 4.0.0, lo cual rompe las versiones requeridas. Las exportaciones y los controles actuales se registran en verification.md; no equivalen a declarar ausencia de vulnerabilidades en dependencias.

## Estado final tras alinear Expo

Expo 58.0.22, expo-dev-client 58.0.18 y expo-router 58.0.29 superaron las 20/20 comprobaciones de expo-doctor. El lockfile final informa 21 avisos moderate, sin high ni critical. Los contadores anteriores se conservan como revisión histórica. No se aplicaron degradaciones ni audit fix --force.
