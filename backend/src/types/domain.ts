import { ROLES } from '../constants/business.js';
/** Roles persistidos y emitidos en JWT; el backend verifica siempre su vigencia. */
export type Role = (typeof ROLES)[number];
/** Actor de la solicitud después de verificar token y usuario activo. */
export interface Actor {
  id: string;
  role: Role;
  /** Versión de permisos; invalida JWT antiguos al cambiar credenciales o privilegios. */
  authVersion: number;
  /** Permiso adicional del empleado; no se obtiene del formulario público. */
  canRecordPayments: boolean;
}
/** Perfil público; nunca incluye el hash de contraseña. */
export interface User extends Actor {
  /** Indica si corresponde ofrecer cambio o confirmación de contraseña local. */
  hasPassword: boolean;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  avatarUrl: string | null;
  isActive: boolean;
}
/** Resultado paginado con tamaño limitado por el servidor. */
export interface Page<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
}
