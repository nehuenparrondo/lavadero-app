/** Medidas de la región desplazable; los valores se mantienen fuera del estado visual. */
export interface ScrollMetrics {
  offset: number;
  viewport: number;
  content: number;
}
/** Evita ofrecer volver arriba en páginas cortas, al inicio o tras reducir contenido.
 * @param metrics Desplazamiento y tamaños medidos en la misma región.
 * @returns true solo después de recorrer una parte significativa de una página larga.
 */
export function shouldOfferScrollTop({ offset, viewport, content }: ScrollMetrics) {
  return viewport > 0 && content > viewport + 80 && offset > Math.min(320, viewport * 0.5);
}
