# Instalación, desarrollo y distribución

## Desde cero

Instalar Node 24.15 o superior y Git; clonar `lavadero-app` con el nombre local `main`, entrar en `main/frontend` y ejecutar `npm ci`. Para instalar y abrir ambas aplicaciones juntas, seguir [la guía principal](../../README.md) desde `main`.
Copiar `.env.example` a `.env` y definir:

```dotenv
EXPO_PUBLIC_API_URL=https://lavadero-api-48m4.onrender.com
EXPO_PUBLIC_EAS_PROJECT_ID=a36a1817-4c5e-46a4-9f75-52aadfa5bd1d
```

`npm run check`, `npx expo install --check` y `npm run export:android` verifican el
proyecto. `npm start` abre Metro para desarrollo. El APK preview funciona sin Metro.
Si cambia una variable pública, reiniciar Metro o volver a compilar para incorporarla.

## EAS

Proyecto ya vinculado a `elpepoestangod/lavadero-app`; no ejecutar init para crear otro.
Iniciar sesión con `npx eas-cli@latest login`. Configurar EXPO_PUBLIC_API_URL en los
entornos development/preview/production desde el panel EAS o `eas env:set --help`.
Solo preview y production están configurados en la entrega. Las credenciales SQL,
JWT y OAuth nunca se incluyen en la app.

```powershell
npx eas-cli@latest build --platform android --profile development
npx eas-cli@latest build --platform android --profile preview
```

`eas.json` usa APK para preview/production. EAS administra el keystore de Android en la
cuenta del propietario. Conservarlo para que futuras versiones actualicen la aplicación.
No guardar keystore/contraseñas en Git. Package: `com.nehuenparrondo.lavadero`.

Descargar el APK desde el enlace de entrega, abrirlo en Android y autorizar la instalación
desde esa fuente si Android lo solicita. Para una próxima versión usar el mismo package,
misma firma y aumentar versionCode. EAS informa cuota/cola; verificar el plan antes de
iniciar otra compilación. La entrega no configura EAS Update ni Google Play.

## OAuth y web

Usar APK o development build con scheme `lavadero`, callback `lavadero://oauth`.
Expo Go utiliza otra identidad y no es una prueba válida del retorno nativo.
Los callbacks de proveedores terminan en el backend HTTPS; el backend redirige un
código efímero a la app. No copiar client secrets a EXPO_PUBLIC.

Versión web: https://lavadero-app-2558.onrender.com. Se construye en Render Static Site
con raíz `frontend` y comando `npm ci --include=dev && npm run export:web`, publica `web-dist`, y tiene rewrite
`/*` a `/index.html`. Su origen exacto está permitido en CORS. Los refresh web persisten en localStorage al cerrar y reabrir;
la API valida su vigencia y rota la credencial. OAuth transitorio usa sessionStorage. Para probar desarrollo web contra otra API hay que
permitir ese origen explícitamente en el entorno correspondiente.

## Problemas comunes

- Primera solicitud lenta: abrir /ready y esperar que Render Free despierte.
- 401: sesión vencida/revocada; volver a ingresar. Cambiar rol/contraseña revoca sesiones.
- 409 al reservar: el horario se ocupó; volver a consultar y elegir otro.
- URL inválida: usar origen HTTPS, sin /api/v1 ni credenciales. localhost no es público.
- OAuth deshabilitado: faltan credenciales reales en Render; consultar guía OAuth del API.
