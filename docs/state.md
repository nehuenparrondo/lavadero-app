# Estado y comunicaciones

AuthContext: usuario y access token en memoria; refresh en SecureStore Android/iOS,
sessionStorage para web. Logout borra la sesión local y solicita revocación al backend.
ThemeContext: system/light/dark en AsyncStorage; sigue al sistema cuando corresponde.

useRemoteData: recurso con carga/error/refresh y cancelación lógica de resultados viejos.
usePagedList: filtros, página y total. useOptions recorre páginas de opciones sin truncarlas.
useAction publica el estado ocupado y el error; los botones bloquean pulsaciones mientras cargan. La reserva tiene además un bloqueo inmediato contra doble envío. useEntityManager separa
errores de listado de errores al guardar. La búsqueda se demora 300 ms.

La app no conserva una copia mutable del catálogo como autoridad de precio. La reserva
muestra cotización del servidor y maneja 409 limpiando el horario elegido. Los cobros
reutilizan su clave de idempotencia al reintentar un envío incierto.

La restauración se separa en `useSessionRestore`/`restoreSession`; `AuthProvider` conecta el contexto. Los editores usan `useEditorState` y `useResourceEditor`; reserva y detalle separan selección, consultas y comandos. La confirmación social comparte `useSocialExchange` entre web y nativo; una contraseña local solo permanece durante su envío TLS.

`useQuery` identifica cada resultado por ruta y filtros: una selección nueva, una consulta deshabilitada o un fallo no muestran datos del filtro anterior. `useRefreshOnReturn` recarga al volver a la pantalla; los hooks coordinan la actualización de recursos relacionados, incluidos los selectores.

`readinessGate` comparte la conexión inicial dentro de un plazo acotado. Solo reintenta GET /ready, nunca escrituras. `ConnectionNotice` explica la espera después de dos segundos; no hay sondeos periódicos mientras la app está inactiva. El tiempo de arranque de Render Free sigue existiendo.

La restauración conserva refresh ante errores de red, 429 y 5xx y ofrece reintentar. Solo 401/403 definitivos invalidan la sesión. `renewRequest` conserva una rotación compartida y comprueba la cuenta de origen. `/loading` guarda un destino interno; `restoreDestination` lo valida según el rol antes de volver al enlace solicitado.
