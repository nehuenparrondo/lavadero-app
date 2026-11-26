# Lavadero

El proyecto completo está en esta carpeta `main`, con un repositorio de GitHub y dos aplicaciones independientes:

```text
main/
├── backend/       API Express, autenticación, reglas, MariaDB y migraciones
├── frontend/      Expo, interfaz web e iPhone/Android, vistas de los tres roles
├── scripts/       Instalación, arranque conjunto y verificación
├── package.json   Comandos comunes
└── render.yaml    Publicación de ambos servicios desde este repositorio
```

Repositorio único: [nehuenparrondo/lavadero-app](https://github.com/nehuenparrondo/lavadero-app).
La carpeta local se llama `main`; la rama de Git también es `main`.
El antiguo repositorio `lavadero-api` conserva el historial anterior; el código activo del backend está en `backend/` del repositorio único.

## Abrir y ejecutar en esta computadora

Requiere Node 24.15 o superior. Abrí esta carpeta `main` en el editor.

```powershell
npm run install:all
npm run dev
```

Abrí **http://localhost:8081**. El comando inicia frontend y backend; Ctrl+C detiene ambos.
El backend local usa la base escolar configurada en `backend/.env`. El arranque rechaza una base que no termine en `_dev`, para evitar trabajar por accidente sobre producción.
Los puertos se comprueban antes de iniciar. Para cambiarlos, definí `LAVADERO_API_PORT` y `LAVADERO_WEB_PORT` en esa terminal antes de ejecutar el comando.

En esta computadora se conservaron las configuraciones privadas existentes. No hace falta volver a cargar las contraseñas.
En otra computadora, copiá `backend/.env.example` a `backend/.env`, completá tu conexión escolar y una clave JWT privada de al menos 32 caracteres. Ejecutá `npm run db:migrate` si la base todavía no tiene las migraciones aplicadas.

## Verificar y compilar

```powershell
npm run check
npm run build
```

`check` ejecuta tipos, lint, pruebas y auditoría de modularidad de ambas aplicaciones. `build` compila la API y exporta la web con sus protecciones de navegador. Para probar localmente las funciones usá `npm run dev`; la exportación de producción se publica en Render, con su origen HTTPS autorizado.
La configuración pública de la exportación está en `frontend/.env`: copiá `frontend/.env.example` si falta. Nunca poner claves SQL, OAuth privadas o de Mailtrap en el frontend.

`npm run export:android` exporta el bundle móvil. No construye ni instala un APK.
Para Expo Go, ejecutá `npm start` dentro de `frontend/` con `EXPO_PUBLIC_API_URL` apuntando a la API HTTPS publicada. El backend HTTP local de `npm run dev` está limitado a esta computadora.

## Desarrollo y página publicada

| Entorno          | Frontend                               | API / base                                                     |
| ---------------- | -------------------------------------- | -------------------------------------------------------------- |
| Desarrollo local | http://localhost:8081                  | http://127.0.0.1:3000 / base escolar `_dev`                    |
| Web publicada    | https://lavadero-app-2558.onrender.com | https://lavadero-api-48m4.onrender.com / `nehuenlavadero_prod` |

El ingreso con correo funciona en desarrollo local. Google, Discord y GitHub necesitan sus retornos HTTPS autorizados y se comprueban en la versión publicada; el arranque local los deshabilita para evitar mezclar estados de autenticación con producción. Mailtrap requiere sus variables privadas en el backend del entorno correspondiente; el sitio publicado usa la bandeja Sandbox, sin entrega a casillas reales.

Cada aplicación conserva sus dependencias y su `package-lock.json`: no se mezclan paquetes móviles con los del servidor.
La API no importa código del frontend y la interfaz se comunica con la API mediante HTTP.

## Render

Los dos servicios toman la rama `main` del repositorio único. La raíz del servicio API es `backend`; la raíz del sitio estático es `frontend`. Los comandos se ejecutan dentro de su raíz, por lo que las rutas de compilación son relativas a cada carpeta.
`render.yaml` reúne esta configuración. Los secretos se completan en Render y se conservan en los servicios existentes, junto con las direcciones públicas y los datos publicados.

## Documentación

Empezar por la [guía común del código](docs/README.md), con [arquitectura](docs/architecture.md), [configuración](docs/configuration.md) y [mantenimiento/pruebas](docs/maintenance.md). Para regenerar mapas, índices y contratos de componentes: `npm run docs`. `npm run docs:check` detecta documentación generada desactualizada sin escribir archivos.

- [Backend y contrato](backend/README.md), [OpenAPI](backend/docs/openapi.json).
- [Frontend e interfaz](frontend/README.md).
- [Seguridad y recuperación](backend/docs/security-recovery.md).
- [Funcionamiento](backend/docs/functional-guide.md).
- [Gestor web de la base escolar](tools/database-admin/USO.md) y [configuración de Adminer](tools/database-admin/README.md).

No subir `.env`, `node_modules`, bases exportadas ni archivos privados a GitHub. El ZIP público de esta estructura excluye esos archivos.
