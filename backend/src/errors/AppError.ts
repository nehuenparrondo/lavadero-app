/** Error controlado con estado HTTP y código estable para la app. */
export class AppError extends Error {
  /** Construye un error seguro para mostrar al usuario. */
  /** Crea el error tipado que el manejador central convierte en una respuesta pública. */
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}
