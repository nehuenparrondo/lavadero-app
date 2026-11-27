# Revisión de documentación y modularidad — 27/11/2026

## Alcance

La estructura vigente es `main/backend`, `main/frontend` y un único repositorio. La raíz incorpora [MANUAL-DE-USUARIO.md](../MANUAL-DE-USUARIO.md), con recorridos didácticos de Administración y Empleado, ejemplos y ayuda. Los antiguos manuales enlazan a ese documento en lugar de mantener copias contradictorias.

Se revisaron las guías y los módulos de identidad/sesión, reservas y vehículo posterior, agenda por rol, asignación, estados, pagos, cierre, mensajes y asistencia. Se precisaron comentarios sobre entradas, unidades, permisos, bloqueos, idempotencia y resultados. Se eliminaron referencias vigentes al cierre de 16:30, sesión web solo por pestaña, fecha seleccionable en Mi agenda y obligación universal de revisión administrativa. Las guías conservan el circuito real alternativo para empleados sin habilitación de cobro.

Las reglas actuales incluyen jornada 09:30–21:30, Guardar antes de Confirmar, datos del vehículo cargados por el cliente, ingreso sin garaje, seis tarifas compartidas de la migración 020, guardado idempotente del responsable y pendientes administrativos desde hoy. Los contratos anteriores y sus importes no cambian.

## Documentación y separación de responsabilidades

| Alcance de la auditoría                                                  | Backend | Frontend |
| ------------------------------------------------------------------------ | ------: | -------: |
| Archivos TypeScript de aplicación/soporte SQL                            |     174 |      391 |
| Funciones y callbacks analizados                                         |     500 |      900 |
| Contratos públicos con parámetros y resultado documentados               |     311 |      390 |
| Archivos propios incluidos en el mapa, con pruebas/scripts/configuración |     205 |      410 |

El catálogo describe 166 componentes con props y ejemplos. Los comentarios explican intención e invariantes; los tipos describen la forma de los datos. Los callbacks sencillos no repiten cada instrucción. Los mapas y README de carpetas se generan desde AST y normalizan saltos LF/CRLF para coincidir en Windows y Linux.

No se detectaron ciclos de dependencias ni cruces de capa prohibidos. Las rutas delegan en pantallas; las pantallas componen componentes/hooks; el transporte encapsula HTTP. En backend, controllers adaptan solicitudes, servicios validan y coordinan transacciones, y repositorios usan SQL parametrizado. No hizo falta fragmentar más estos módulos para esta revisión. Los límites de 149 líneas por archivo de producción y 30 por cuerpo de función son controles auxiliares, no una prueba absoluta de calidad.

## Comprobación de esta revisión

`npm run check` desde main verifica herramientas comunes, documentación generada y ambas aplicaciones: 28 pruebas backend, 42 frontend y 10 de herramientas, además de tipos, lint, compilación backend y auditoría. El formato comprende también el manual de la raíz. Se comprueban los enlaces locales de las guías modificadas.

Los cambios de fuente son comentarios; se conserva el código ejecutable y el esquema. La revisión no necesita migraciones ni datos de prueba productivos. La aceptación anterior de tarifas, tres responsables, conflictos y fechas aprobó cuatro escenarios MariaDB en la corrección incorporada en `0be8f67`; no se presenta como una nueva ejecución de esta revisión documental.

CI vuelve a comprobar las exportaciones web/Android al publicar. Una exportación no es una instalación en teléfono y este trabajo no reconstruye un APK. Las capturas e informes antiguos se conservan como evidencia de sus versiones; las instrucciones actuales comienzan en el README y manual de main.

Resultado local: **80 pruebas aprobadas, cero fallos**, con tipos, lint, compilación backend, formato y documentación generada correctos. Se validaron 1.161 enlaces locales, incluidos 12 enlaces a secciones, sin destinos rotos. Los 14 archivos TypeScript anotados producen el mismo JavaScript al retirar comentarios que la base `684c9af`; no se modificó el comportamiento para realizar esta revisión.
