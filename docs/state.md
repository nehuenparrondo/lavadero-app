# Estado y comunicaciones

AuthContext: usuario y access token en memoria; refresh en SecureStore Android/iOS,
sessionStorage para web. Logout borra la sesión local y solicita revocación al backend.
ThemeContext: system/light/dark en AsyncStorage; sigue al sistema cuando corresponde.

useRemoteData: recurso con carga/error/refresh y cancelación lógica de resultados viejos.
usePagedList: filtros, página y total. useOptions recorre páginas de opciones sin truncarlas.
useAction evita doble envío y expone error de la operación. useEntityManager separa
errores de listado de errores al guardar. La búsqueda se demora 300 ms.

La app no conserva una copia mutable del catálogo como autoridad de precio. La reserva
muestra cotización del servidor y maneja 409 limpiando el horario elegido. Los cobros
reutilizan su clave de idempotencia al reintentar un envío incierto.
