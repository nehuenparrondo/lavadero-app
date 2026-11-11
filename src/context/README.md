# context

Proveedores compartidos de sesión y tema. No duplicar los tokens en estados de pantallas.

## Archivos y responsabilidades

| Archivo | Responsabilidad |
| --- | --- |
| [AuthContext.tsx](AuthContext.tsx) | Contexto de sesión compartido por las experiencias de los tres roles. |
| [ThemeContext.tsx](ThemeContext.tsx) | Preferencia manual o seguimiento del sistema. |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
