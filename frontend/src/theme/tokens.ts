/** Escala visual compartida. El contenido se adapta al viewport y a la escala de texto. */
export const tokens = {
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
  radius: { sm: 8, md: 16, lg: 24 },
  fontSize: { caption: 12, body: 15, title: 28, display: 44 },
  maxContentWidth: 1180,
  breakpoint: { columns: 720, sidebar: 1100 },
  sidebarWidth: 232,
} as const;
