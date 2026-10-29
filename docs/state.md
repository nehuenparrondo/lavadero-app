# Estado

## Implementado

ThemeContext mantiene modo system/light/dark en memoria y resuelve la paleta con useColorScheme.
useTheme es la única interfaz de consumo. La pantalla sigue al sistema por defecto.
useApiHealth administra conexión y reintento local, aborta la solicitud al desmontar y evita
actualizar estado después del aborto. Solo healthService envía HTTP mediante el cliente Axios.

## Etapas siguientes

AuthContext contendrá usuario, sesión y rol. Refresh token en expo-secure-store, access token
en memoria; nunca AsyncStorage para secretos. Restablecer sesión con carga y verificación de API.
Interceptor Axios con una promesa de refresh compartida, cola para 401 concurrentes y un único reintento.
Ante refresh revocado se limpia sesión. Logout revoca familia en backend y borra almacenamiento local.
La preferencia de tema se persistirá en etapa 9 mediante almacenamiento no sensible.
Los datos de negocio se encapsulan en hooks por recurso; no se duplica información derivable globalmente.
