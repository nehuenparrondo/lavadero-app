# Verificación de Lavadero 1.1

Revisión: 01/11/2026. Detalles visuales y capturas en redesign-review.md.

Se repitieron 18 pruebas: 15 unitarias/HTTP de API y 3 frontend. Pasaron TypeScript
estricto, ESLint y auditoría de fuente en ambos repositorios. La lógica ejecutable
del backend resultó idéntica al comparar JavaScript emitido antes/después de documentar.
Las 17 pruebas de aceptación MySQL de la entrega anterior no se reejecutaron aquí.

Fuente: 111 archivos / 314 funciones-callbacks en API y 259 / 473 en app.
La auditoría verifica hasta 149 líneas por archivo de src, 30 por cuerpo,
TSDoc público, ausencia de ciclos y ausencia de HTTP directo en UI.

Exportaciones Android y web aprobadas. Las tres sesiones locales se probaron en la
web publicada. Se revisaron escritorio 1280 × 720 y teléfono 390 × 844, navegación,
temas, vehículo/formulario de reserva, historial asignado y filtro administrativo.
No se crearon nuevos turnos ni cobros en esta revisión.

El estado y origen del APK se registran en delivery.md y apk-info.json. No se
ejecutó un APK en teléfono ni emulador y no se generó un binario iOS.
Las capturas de ancho móvil son web, no de un dispositivo físico.
El dueño dispone de iPhone: ver iphone-expo-go.md.

Los avisos de dependencias y su alcance se describen en dependencies.md.

Compatibilidad final: Expo 58.0.22 / dev-client 58.0.18 / Router 58.0.29; expo-doctor 20/20 aprobado.
