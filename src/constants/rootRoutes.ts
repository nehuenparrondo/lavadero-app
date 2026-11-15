/** Acceso necesario para cada pantalla; el backend valida además cada recurso. */
export type RouteAccess =
  'public' | 'guest' | 'authenticated' | 'client' | 'employee' | 'admin' | 'booking';
/** Catálogo de rutas del stack raíz, independiente del estado de sesión. */
export const rootRoutes = [
  { name: 'loading', access: 'public', options: { headerShown: false } },
  { name: 'sign-in', access: 'guest', options: { headerShown: false } },
  { name: 'forgot-password', access: 'public', options: { title: 'Recuperar acceso' } },
  { name: 'reset-password', access: 'public', options: { title: 'Nueva contraseña' } },
  { name: 'sign-up', access: 'guest', options: { title: 'Crear cuenta' } },
  { name: 'index', access: 'authenticated', options: { headerShown: false } },
  {
    name: 'appointment/[id]',
    access: 'authenticated',
    options: { title: 'Detalle del turno' },
  },
  { name: 'oauth', access: 'public', options: { headerShown: false } },
  { name: 'support', access: 'client', options: { title: 'Atención al cliente' } },
  { name: '(client)', access: 'client', options: { headerShown: false } },
  { name: '(employee)', access: 'employee', options: { headerShown: false } },
  { name: '(admin)', access: 'admin', options: { headerShown: false } },
  {
    name: 'booking',
    access: 'booking',
    options: { title: 'Reservar turno', presentation: 'modal' },
  },
] as const;
