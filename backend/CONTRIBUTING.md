# Contribuir

Código, tipos y nombres en inglés; interfaz y documentación explicativa en español.
Una responsabilidad por archivo. Referencia: menos de 150 líneas por archivo y 30 por función.
Documentar funciones y componentes públicos con TSDoc y explicar decisiones no obvias.

Ramas: `feat/nombre`, `fix/nombre`, `docs/nombre`. Commits: `feat:`, `fix:`, `docs:`,
`refactor:`, `test:`, `chore:`. Trabajar dentro de este repositorio independiente.

Antes de integrar: `npm run check` y `npm run format:check`. Actualizar README,
CHANGELOG y los documentos que afecte el cambio. API: actualizar OpenAPI y Postman.
Nunca versionar `.env`, contraseñas, tokens, certificados privados ni claves de firma.

Los commits iniciales se crean con autor local Codex (codex@local.invalid), sin atribuirlos a
una identidad personal. Antes de tus commits, configurar user.name y user.email dentro de cada repo.
