# Rutas y permisos

| Grupo | Pantallas |
|---|---|
| Público | sign-in, sign-up, oauth, loading |
| Cliente | inicio, turnos, vehículos, servicios, perfil |
| Empleado | agenda, historial, perfil |
| Admin | tablero, turnos, usuarios, servicios, vehículos, reportes, configuración, perfil |
| Compartido autenticado | appointment/[id] |
| Cliente/Admin | booking |

La raíz dirige al grupo del rol actual. RootNavigation usa Stack.Protected y destinos
explícitos para sesión ausente/restaurándose. Las pestañas del empleado no incluyen
ingresos ni usuarios. Admin navega desde el menú de cabecera.
Una ruta escrita manualmente nunca evita las comprobaciones del backend.

El scheme Android/iOS es `lavadero`; el callback social nativo es `lavadero://oauth`.
El callback web debe ser el origen HTTPS desplegado más `/oauth`, incluido expresamente
en la allowlist del backend. Expo Go no utiliza la misma identidad que el APK.
