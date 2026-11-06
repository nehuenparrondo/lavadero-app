/** Parte del responsable; los datos de revisión interna solo llegan al equipo. */
export interface WashSubmission {
  id: string;
  employeeName: string;
  description: string;
  submittedAt: string;
  decision: 'approved' | 'returned' | null;
  reviewNote?: string | null;
  reviewedAt: string | null;
  reviewerName?: string | null;
  feedbackId?: string | null;
}

/** Reclamo o devolución, con respuesta administrativa cuando se resuelve. */
export interface CustomerMessage {
  id: string;
  kind: 'complaint' | 'feedback';
  body: string;
  clientName: string;
  createdAt: string;
  resolvedAt: string | null;
  reply: string | null;
  appointmentId: string | null;
  plate: string | null;
  employeeName: string | null;
  workDescription: string | null;
}

/** Fichaje de llegada observado y guardado por Administración. */
export interface Attendance {
  date: string;
  today: string;
  items: Arrival[];
}

/** Fila del plantel de hoy o un fichaje histórico. */
export interface Arrival {
  employeeId: string;
  employeeName: string;
  arrivedAt: string | null;
  recordedByName: string | null;
}
