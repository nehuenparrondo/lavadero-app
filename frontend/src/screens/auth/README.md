# src/screens/auth

<!-- Generado por npm run docs. -->

Acceso y registro público. No se acepta un rol solicitado por el formulario.

## Archivos y responsabilidades

| Archivo                                              | Responsabilidad                                                                            |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [ForgotPasswordScreen.tsx](ForgotPasswordScreen.tsx) | Recuperación guiada; informa explícitamente el destino Sandbox de esta demostración.       |
| [ResetPasswordScreen.tsx](ResetPasswordScreen.tsx)   | El token se consume solo al confirmar la nueva contraseña; abrir el correo no lo consume.  |
| [SignInScreen.tsx](SignInScreen.tsx)                 | Acceso común a los tres roles; el servidor determina la experiencia después de autenticar. |
| [SignUpScreen.tsx](SignUpScreen.tsx)                 | Registro de clientes con validación por campo.                                             |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
