/** Recarga consultas relacionadas después de una acción o regreso a la pantalla.
 * @param resources Recursos que capturan sus propios errores y descartan respuestas tardías.
 * @returns Promesa que termina cuando todas las consultas se actualizaron.
 */
export async function refreshResources(...resources: { refresh: () => Promise<void> }[]) {
  await Promise.all(resources.map((resource) => resource.refresh()));
}

/** Consulta cambios sin ocultar los datos actuales ni desmontar formularios.
 * @param resources Consultas relacionadas visibles en la pantalla.
 * @returns Promesa de la recarga silenciosa del conjunto.
 */
export async function revalidateResources(
  ...resources: { revalidate: () => Promise<void> }[]
) {
  await Promise.all(resources.map((resource) => resource.revalidate()));
}
