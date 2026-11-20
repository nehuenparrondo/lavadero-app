> Estructura actual: `main/frontend` dentro del repositorio único `nehuenparrondo/lavadero-app`. Para iniciar frontend y backend juntos, ver [la guía principal](../README.md).

# Lavadero App 1.0

Aplicación Expo/React Native con TypeScript estricto y Expo Router. Tiene flujos reales
para Cliente, Empleado y Administrador, temas claro/oscuro/sistema y diseño adaptable.
Consume la API HTTPS publicada; el modo de desarrollo admite además el backend de esta computadora. Las dependencias permanecen separadas del backend.

Repositorio privado: https://github.com/nehuenparrondo/lavadero-app.
Proyecto EAS: https://expo.dev/accounts/elpepoestangod/projects/lavadero-app.

## Ejecutar

Node 24 LTS, Expo SDK 58, React 19.3 y React Native 0.88. Las versiones exactas están
fijadas en `package-lock.json`. Instalar paquetes nativos con `npx expo install`.

```powershell
npm ci
Copy-Item .env.example .env
# EXPO_PUBLIC_API_URL=https://lavadero-api-48m4.onrender.com
npm run check
npm start
```

La URL es solo el origen, sin `/api/v1`. Nunca poner secretos OAuth o credenciales
MySQL en variables EXPO_PUBLIC. En móvil, localhost identifica al teléfono.

## Funciones

- Cliente: cuenta, perfil, vehículos, tarifas, cotización, reserva, historial,
  cancelación según anticipación y comprobante del trabajo finalizado.
- Empleado: agenda e historial propios, detalle del vehículo/cliente, observaciones,
  búsqueda por patente, inicio y envío a verificación del responsable, y cobro cuando un administrador lo habilita.
- Administrador: usuarios/roles, catálogo/tarifas/tipos, agenda/asignación, horarios,
  capacidad, políticas y reportes por día/semana/mes.
- Formularios React Hook Form + Zod, listas paginadas, búsqueda, estados de carga,
  errores, vacíos, actualización y confirmaciones de acciones.

## Compilar y distribuir

```powershell
npm run export:android
npx eas-cli@latest build --platform android --profile preview
```

La exportación verifica el bundle; el segundo comando genera el APK firmado en EAS.
El perfil preview usa distribución interna y NO necesita el servidor Metro para funcionar.
Para desarrollar OAuth usar un development build o el APK: Expo Go no representa
correctamente el scheme propio. El backend conserva los secretos del proveedor.

`npm run export:web` genera `web-dist`; en Render Static Site se añade rewrite
`/*` → `/index.html`. El origen HTTPS web debe incluirse en CORS del backend.

[Instalación](docs/installation.md), [arquitectura](docs/architecture.md),
[componentes](docs/components.md), [navegación](docs/navigation.md),
[estado](docs/state.md), [manual por rol](docs/user-manual.md),
[verificación](docs/verification.md), [entrega](docs/delivery.md).

En Android el refresh se guarda con SecureStore. En la vista web se usa sessionStorage
de la pestaña; cerrar la pestaña elimina esa persistencia. El access token queda en memoria.

## Revisión de la consigna

[Matriz de requisitos y evidencia](docs/requirements-review.md) · [Prueba desde iPhone/Expo Go](docs/iphone-expo-go.md).

## Lectura y mantenimiento del código

- [Guía de código e invariantes](docs/code-guide.md)
- [Mapa de todos los módulos](docs/source-map.md)
- [Sistema visual](docs/design-system.md)

## Correcciones de acceso y reservas

Ver [comportamiento, módulos y pruebas de la versión 1.1.1](docs/reliability.md).

La agenda compartida, la asignación, la verificación del trabajo, los reclamos y el fichaje se explican en el [manual de uso](docs/user-manual.md).

Ver [cancelaciones, observaciones y mejora de interfaz](docs/interface-polish.md).

[Panel administrativo: ingreso presencial, usuarios, servicios, asistencia y semanas](docs/admin-panel.md).

[Cliente y empleado: calendario, agenda, limpieza, cobro y reclamos](docs/client-employee-flow.md).

## Seguridad y acceso actual

Ingreso con Google o correo y contraseña. Discord y GitHub fueron retirados. Perfil sin fotos. Recuperación mediante Mailtrap Sandbox, sin entrega a casillas reales. Ver [seguridad y recuperación](docs/security-recovery.md) para configuración, pruebas y límites.
