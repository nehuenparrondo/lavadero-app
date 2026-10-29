# lavadero-app

Aplicación móvil Expo managed + TypeScript strict. **Etapa 1:** estructura Atomic Design,
pantalla inicial, temas base y prueba de conexión al backend público. Sin login ni CRUD todavía.
Se puede instalar sin tener el repositorio de la API.

## Versiones

Expo SDK **58**, React **19.3**, React Native **0.88**, desde la plantilla oficial estable
verificada el 29/10/2026. Las versiones exactas quedan fijadas en `package-lock.json`.
Requisitos: Node 24 LTS (mínimo 22.13), npm, dispositivo Android o emulador/development build.

## Instalación

```powershell
npm ci
Copy-Item .env.example .env
```

Completar `EXPO_PUBLIC_API_URL` con el **origen HTTPS público de Render**, sin `/api/v1`.
Si aún no existe, dejarla vacía: la pantalla informa que la conexión está pendiente.
Nunca se usa `localhost` como alternativa y no se simula una conexión exitosa.

```powershell
npm run check
npx expo install --check
npm start
```

La plantilla usa SDK 58. Verificar compatibilidad exacta de Expo Go antes de escanear;
OAuth requiere development build. [Instalación y EAS](docs/installation.md).

## Scripts

| Script                               | Uso                                              |
| ------------------------------------ | ------------------------------------------------ |
| `start`, `android`, `ios`            | Servidor Expo y apertura en dispositivo/emulador |
| `typecheck`, `lint`, `test`, `check` | Verificación del proyecto independiente          |
| `format`, `format:check`             | Formato de código y documentos                   |
| `export:android`                     | Compila el bundle Android; **no genera un APK**  |

## Estructura

```text
src/
  api/client.ts, api/services/
  components/atoms/, molecules/, organisms/
  context/, hooks/, navigation/
  screens/auth/, client/, employee/, admin/
  theme/, types/, constants/, utils/
docs/
App.tsx, index.ts, app.config.ts, eas.json
```

Los módulos futuros tienen README explicativos, no pantallas simuladas.
No se importa código de `lavadero-api`. El contrato REST versionado define la integración.

## Documentación

[Plan](docs/plan.md) · [Arquitectura](docs/architecture.md) · [Navegación](docs/navigation.md) ·
[Componentes](docs/components.md) · [Estado](docs/state.md) · [Instalación](docs/installation.md) ·
[Verificación](docs/verification.md) · [Manual](docs/user-manual.md) · [Entrega](docs/delivery.md).

La identidad `com.lavadero.app` es inicial; confirmar unicidad antes del primer APK publicado.

La revisión de dependencias y sus avisos heredados está en [dependencies.md](docs/dependencies.md).
