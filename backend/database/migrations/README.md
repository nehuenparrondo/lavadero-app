# Migraciones

Archivos SQL ordenados por prefijo y separados internamente por `-- statement-breakpoint`.
Usar un bloque por sentencia; el punto y coma puede aparecer dentro de cadenas sin dividirlas.
Después de desplegar una migración, nunca editarla: crear la siguiente. Se verifica SHA-256.
MySQL DDL hace commit implícito; tomar backup y aplicar cambios compatibles con la versión anterior.
El runner obtiene lock MySQL por base, mantiene la sesión en UTC y registra versiones aplicadas.
