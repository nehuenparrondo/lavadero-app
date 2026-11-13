import { APPOINTMENT_STATUS, ROLES } from '../constants/business';
/** Roles enviados y verificados por la API, sin código importado desde el backend. */
export type Role = (typeof ROLES)[number];
/** Perfil público y permisos vigentes. */
export interface User {
  id: string;
  role: Role;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  avatarUrl: string | null;
  isActive: boolean;
  /** Permiso adicional del empleado; no se obtiene del formulario público. */
  canRecordPayments: boolean;
  /** Indica si corresponde ofrecer cambio o confirmación de contraseña local. */
  hasPassword: boolean;
}
/** Sesión propia del backend; refresh se persiste solo en almacenamiento seguro nativo. */
export interface Session {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
/** Paginación REST. */
export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
/** Vehículo registrado. */
export interface Vehicle {
  id: string;
  /** Titular del vehículo; el backend verifica la propiedad en cada operación. */
  ownerId: string;
  vehicleTypeId: string;
  plate: string;
  brand: string;
  model: string;
  color: string;
  typeName: string;
}
/** Categoría de tarifas. */
export interface VehicleType {
  id: string;
  code: string;
  name: string;
  isActive: boolean;
}
/** Servicio y precios por tipo de vehículo, siempre en centavos ARS. */
export interface Service {
  id: string;
  code: string;
  name: string;
  description: string;
  /** Tiempo estimado completo del servicio, en minutos. */
  durationMinutes: number;
  isActive: boolean;
  prices: { vehicleTypeId: string; priceCents: number }[];
}
/** Estados reales de una reserva. */
export type AppointmentStatus = (typeof APPOINTMENT_STATUS)[number];
/** Proyección de una reserva según el rol. Importes pueden faltar para empleados sin cobros. */
export interface Appointment {
  id: string;
  clientId?: string;
  employeeId?: string | null;
  vehicleId?: string | null;
  vehicleTypeId?: string;
  status: AppointmentStatus;
  startsAt: string;
  endsAt: string;
  plate: string | null;
  brand: string | null;
  model: string | null;
  color: string | null;
  clientName: string;
  clientPhone: string | null;
  employeeName?: string | null;
  canWork?: boolean;
  canReassign?: boolean;
  vehicleType?: string;
  vehiclePending?: boolean;
  vehicleDescription?: string | null;
  cancellationReason?: string | null;
  cancelledByName?: string | null;
  wash?: import('./operations').WashSubmission | null;
  /** Total histórico del contrato, expresado en centavos ARS. */
  totalCents?: number;
  /** Suma registrada de cobros en centavos; no ejecuta transferencias. */
  paidCents?: number;
  currencyCode?: string;
  version: number;
  services?: {
    serviceId: string;
    name: string;
    priceCents?: number;
    durationMinutes: number;
  }[];
  serviceSummary?: string;
  notes?: { id: string; body: string; authorName: string; createdAt: string }[];
}
/** Cotización y opciones calculadas en backend. */
export interface Availability {
  slots: string[];
  unavailableReason?: 'closed' | 'past' | 'duration' | 'full' | null;
  /** Total histórico del contrato, expresado en centavos ARS. */
  totalCents: number;
  /** Tiempo estimado completo del servicio, en minutos. */
  durationMinutes: number;
  currencyCode: string;
}
/** Configuración de operación. */
export interface Settings {
  currencyCode: string;
  /** Zona IANA del negocio para horarios de atención y fechas de reportes. */
  timeZone: string;
  cancellationNoticeMinutes: number;
  simultaneousCapacity: number;
  slotStepMinutes: number;
  hours: { weekday: number; opensAt: string; closesAt: string }[];
}
/** Cobro asociado. */
export interface Payment {
  id: string;
  amountCents: number;
  method: 'cash' | 'transfer';
  reference: string | null;
  paidAt: string;
}
/** Reporte administrativo. */
export interface Report {
  period: string;
  from: string;
  to: string;
  currencyCode: string;
  totalWashes: number;
  revenueCents: number;
  days: { date: string; washes: number; revenueCents: number }[];
  services: { name: string; count: number }[];
  employees: { id: string; name: string; completed: number }[];
}
