# screens/auth

Acceso y registro público. No se acepta un rol solicitado por el formulario.

## Archivos y responsabilidades

| Archivo                                              | Responsabilidad                                                                            |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [ForgotPasswordScreen.tsx](ForgotPasswordScreen.tsx) | Recuperación guiada; informa explícitamente el destino Sandbox de esta demostración.       |
| [ResetPasswordScreen.tsx](ResetPasswordScreen.tsx)   | El token se consume solo al confirmar la nueva contraseña; abrir el correo no lo consume.  |
| [SignInScreen.tsx](SignInScreen.tsx)                 | Acceso común a los tres roles; el servidor determina la experiencia después de autenticar. |
| [SignUpScreen.tsx](SignUpScreen.tsx)                 | Registro de clientes con validación por campo.                                             |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
