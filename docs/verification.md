# Verificación de versión 1.0

TypeScript estricto, ESLint sin advertencias y tres pruebas frontend aprobados.
Las pruebas verifican el origen HTTPS y el retorno OAuth: state de la misma pestaña,
PKCE, entradas malformadas y límite exacto de vencimiento de diez minutos.
Exportaciones Android/web aprobadas y APK firmado por EAS. Ver delivery.md para build,
source commit, hash y estado real de cada proveedor.

La revisión funcional web cubrió los tres roles, reservas, asignación, atención, notas,
cobro ficticio y comprobante. Las capturas prueban anchos de teléfono y orientación
horizontal en web; no acreditan ejecución del APK en un teléfono físico.
No hubo dispositivo Android conectado ni emulador disponible en esta sesión.
Las advertencias heredadas de herramientas Expo están en dependencies.md.
