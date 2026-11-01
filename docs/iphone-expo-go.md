# Probar desde iPhone y diferencia con Expo Go

El propietario informó que dispone de iPhone y estaba usando Expo Go. El entregable
instalable pedido por la consigna es un APK Android, que no se instala en iOS.
No se ejecutó ni firmó una compilación iOS durante esta entrega.

## Recorrido disponible ahora

1. Abrir Safari en el iPhone y entrar a https://lavadero-app-2558.onrender.com.
2. Esperar el arranque de la API Free. Si un acceso falla por demora, usar Reintentar.
3. Ingresar con una cuenta del archivo privado o con Google/Discord/GitHub.
4. Probar perfil, vehículos, reserva y detalle. Girar el teléfono para revisar la adaptación.
5. Para revisar Empleado/Admin, cerrar sesión y usar la cuenta del rol correspondiente.

Este recorrido usa la app web y el mismo backend productivo. No equivale a instalar una
app nativa ni demuestra comportamiento de SecureStore o retorno nativo de AuthSession.

## Expo Go

Expo Go no permite personalizar el scheme de la app, por lo que no sirve para validar
este flujo OAuth. Lavadero usa `lavadero://oauth` en sus builds propios y el callback HTTPS
de Render como intermediario. No se incluyen secretos de proveedores en el cliente.

La fuente usa Expo SDK 58. Para ejecutar código en Expo Go, comprobar primero qué SDK
admite la versión instalada; durante una transición puede diferir del SDK estable.
No se degradó el proyecto para acomodar Expo Go, porque la consigna exige el SDK estable.
La prueba nativa completa requiere un development build o una compilación distribuida
para el dispositivo, con las credenciales de firma correspondientes.

Fuentes oficiales: [OAuth y límite de Expo Go](https://docs.expo.dev/guides/authentication/),
[SDK 58 AuthSession](https://docs.expo.dev/versions/v58.0.0/sdk/auth-session/),
[Expo Router y transición de SDK](https://docs.expo.dev/router/introduction/).
