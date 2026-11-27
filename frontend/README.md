# Frontend de Lavadero

App Expo/React Native con TypeScript y Expo Router, en `main/frontend`. Comparte componentes entre Cliente, Empleado y Administrador; cada rol tiene navegación y permisos propios. Consume el backend por HTTP, sin importar su código ni acceder directamente a SQL.

[Web publicada](https://lavadero-app-2558.onrender.com) · [Manual de usuario](../MANUAL-DE-USUARIO.md) · [Repositorio único](https://github.com/nehuenparrondo/lavadero-app)

## Ejecutar

La forma habitual es abrir `main` y seguir su [README](../README.md) para iniciar ambas partes. Para trabajar solo en el frontend, instalar con `npm ci` y usar `npm start` o `npm run web`. Requiere Node 24.15 o superior; las versiones exactas de Expo SDK 58, React y React Native están en `package-lock.json`.

Si falta `.env`, prepararlo desde `.env.example`. `EXPO_PUBLIC_API_URL` es el origen de la API, sin `/api/v1`. En Expo Go apuntar a la API HTTPS publicada: `localhost` en un teléfono identifica al teléfono, no a la computadora. Instalar dependencias nativas con `npx expo install`.

## Estructura y comportamiento

| Capa                          | Responsabilidad                                                    |
| ----------------------------- | ------------------------------------------------------------------ |
| `src/app`, `navigation`       | Rutas y guardas; las rutas delegan en pantallas.                   |
| `src/screens`                 | Composición de una experiencia, sin SQL ni HTTP directo.           |
| `src/components`              | Átomos, moléculas y organismos con propiedades y acciones tipadas. |
| `src/hooks`                   | Consultas, borradores, filtros, comandos, mensajes y revalidación. |
| `src/api`                     | Transporte, servicios REST, renovación y persistencia de sesión.   |
| `src/theme`, `types`, `utils` | Sistema visual, contratos de datos y transformaciones.             |

La sesión persiste en los tres roles. El refresh se conserva en SecureStore en nativo y en almacenamiento local versionado en web; access JWT, perfil y rol permanecen en memoria y se validan con el backend. Las pestañas del mismo sitio comparten cuenta y cierre. El estado transitorio de OAuth usa sessionStorage; no contiene los secretos de los proveedores.

Las consultas conservan los datos del mismo filtro durante una revalidación silenciosa y descartan respuestas viejas. Se actualizan al regresar y, en agendas/tableros, cada 10–15 segundos mientras están visibles. Una mutación fallida muestra el error sin borrar la lista ni dar por guardada la acción.

El cliente elige fecha y hora, pulsa Guardar para preparar Tu reserva y luego Confirmar reserva. Agrega el vehículo después. Administración tiene Auto sin turno, responsables y pendientes de hoy en adelante. El empleado usa Mi agenda para hoy e Historial para otras fechas; con permiso de cobros puede cerrar directamente un trabajo completamente pagado. Ver los recorridos completos en el manual de la raíz.

## Comprobar y distribuir

```powershell
npm run check
npm run export:web
npm run export:android
```

`check` revisa tipos, lint, pruebas y modularidad. La exportación web genera `web-dist`; la de Android genera un bundle, **no un APK instalado**. Para crear una compilación Android propia, usar el perfil de `eas.json` y la [guía de instalación](docs/installation.md). Un APK antiguo debe reconstruirse para incorporar cambios de interfaz.

El retorno OAuth nativo necesita una compilación propia con el esquema configurado; Expo Go sirve para desarrollar pantallas y el acceso local, pero no acredita ese retorno. En web se usa la misma pestaña; el backend conserva las credenciales privadas de Google, Discord y GitHub.

Render publica con raíz `frontend`, HTTPS y retorno de rutas profundas a `index.html`. El backend debe autorizar el origen web en CORS. `EXPO_PUBLIC_*` se incorpora a la aplicación: nunca guardar allí claves SQL, JWT privadas, secretos OAuth o Mailtrap.

## Documentación

[Guía del código](docs/code-guide.md) · [mapa de todos los archivos](docs/source-map.md) · [props y ejemplos de componentes](docs/components.md) · [arquitectura común](../docs/architecture.md) · [mantenimiento](../docs/maintenance.md).

Desde `main`, `npm run docs` regenera los índices y contratos; `npm run docs:check` comprueba que coincidan. La guía operativa vigente es [MANUAL-DE-USUARIO.md](../MANUAL-DE-USUARIO.md); las capturas e informes anteriores pertenecen a sus versiones indicadas.
