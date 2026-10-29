# Instalación y APK — App

## Etapa 1

1. Instalar Node 24 LTS y Git. Abrir solo el repositorio lavadero-app.
2. `npm ci`, copiar `.env.example` a `.env` y configurar origen HTTPS Render cuando exista.
3. `npm run check`, `npx expo install --check` y `npm run export:android`.
4. `npm start`; abrir en development build o emulador. En Windows no se compila iOS localmente.
5. Ver pantalla inicial, girar el dispositivo y cambiar el tema del sistema. Sin URL se informa
   conexión pendiente. Con backend público, probar conexión y reintento ante red desconectada.

## Development build y APK — etapas 6–10

```powershell
npx eas-cli@latest login
npx eas-cli@latest init
```

Guardar ID asignado como EXPO_PUBLIC_EAS_PROJECT_ID y configurar EXPO_PUBLIC_API_URL en EAS
para los entornos development, preview y production (comando `eas env:create` o panel).
Es una URL pública que queda en el bundle, no un lugar para secretos. Leer `eas env:create --help`
al ejecutar para confirmar parámetros vigentes. No commitear una URL ficticia como producción.

```powershell
npx eas-cli@latest build --platform android --profile development
npx eas-cli@latest build --platform android --profile preview
```

`eas.json` define APK en preview/production. EAS solicita proyecto y firma: conservar control
del keystore en la cuenta propia. Verificar costo/cuota de Build antes de iniciarlo.
El APK final se prueba instalado, con backend HTTPS y todos los roles, antes de distribuirlo
por enlace EAS o GitHub Releases. El bundle `expo export` **no es un APK firmado**.

Autenticación social no se prueba con Expo Go: usar development build o APK con scheme lavadero.
Si se cambia scheme/package, reconstruir. Google, Discord y GitHub usan callbacks registrados
por entorno, con secretos y canje del código solo en la API independiente.

EAS Update es opcional y se configura al final; no está activado en esta etapa.
[Build APK](https://docs.expo.dev/build-reference/apk/) ·
[Variables EAS](https://docs.expo.dev/eas/environment-variables/) ·
[OAuth](https://docs.expo.dev/guides/authentication/).
