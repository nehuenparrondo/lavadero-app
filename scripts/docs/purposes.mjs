const purposes = {
  app: 'Composición de rutas de Expo Router. Cada archivo delega su contenido y el layout raíz aplica guardas; no guardar aquí lógica de negocio.',
  api: 'Transporte, memoria de sesión e interceptores. Solo los servicios conocen cómo enviar solicitudes; la UI consume hooks.',
  'api/services':
    'Frontera HTTP: serialización de entradas y extracción del contrato REST. No contiene componentes ni decide permisos por su cuenta.',
  hooks:
    'Coordinación de consultas, filtros, selección y mutaciones. Separa el error de lectura del de escritura y descarta respuestas obsoletas.',
  components:
    'Atomic Design: las capas pequeñas se combinan para formar recorridos sin duplicar validaciones de negocio.',
  'components/atoms':
    'Primitivas visuales con tema y accesibilidad. No hacen consultas ni conocen las reglas del lavadero.',
  'components/molecules':
    'Composiciones reutilizables: tarjetas, campos, indicadores y distribución adaptable. Reciben datos y callbacks.',
  'components/organisms':
    'Bloques de una tarea completa. Componen moléculas y conectan acciones recibidas de hooks; no usan HTTP directamente.',
  screens:
    'Composición de cada recorrido. Coordina organismos con su hook y deja a las rutas la navegación protegida.',
  'screens/client':
    'Experiencia del cliente y pantallas de recursos compartidos con administración. Cada componente sigue el alcance del hook recibido.',
  'screens/employee':
    'Experiencia operativa propia del empleado: jornada, resumen por fecha e historial. No reutiliza la portada del cliente.',
  'screens/admin':
    'Tablero, usuarios, reportes y configuración. Solo se montan dentro del grupo administrativo protegido.',
  'screens/auth':
    'Acceso y registro público. No se acepta un rol solicitado por el formulario.',
  context:
    'Proveedores compartidos de sesión y tema. No duplicar los tokens en estados de pantallas.',
  navigation:
    'Composición de stacks/tabs y guardas. El catálogo de destinos por rol vive en constants/roleNavigation.',
  theme:
    'Tokens, paletas semánticas y estilos compartidos. Mantener contraste en ambos temas; no copiar colores de marca en cada pantalla.',
  types:
    'DTOs del contrato y vocabulario visual. Son propios del frontend y no importan código backend.',
  utils:
    'Transformaciones puras o infraestructura puntual. Mantener unidades explícitas: centavos, minutos y UTC.',
  constants:
    'Catálogos de solo lectura y definiciones declarativas. No contienen secretos ni estado mutable de sesión.',
  config:
    'Lectura y validación de entorno, pool TLS y configuración OAuth. No imprimir ni versionar valores secretos.',
  middlewares:
    'Frontera HTTP: autenticación, autorización, validación, CORS y manejo central de errores.',
  errors:
    'Errores de dominio y su proyección pública. Nunca serializar SQL, stack traces, contraseñas o tokens.',
  modules: 'Casos de uso separados por dominio; routes → controller → service → repository.',
  'modules/auth':
    'Acceso local/social, sesiones y PKCE. Persistir hashes de tokens y confirmar revocaciones/contadores antes de emitir errores.',
  'modules/appointments':
    'Agenda y contratos históricos. Compartir el lock de settings para reservar/asignar/cambiar estado; no confiar en precios del cliente.',
  'modules/payments':
    'Registro contable de cobros, no ejecución de transferencias. Bloquear turno, respetar saldo y conservar la clave al reintentar.',
  'modules/reports':
    'Períodos de calendario del negocio y agregación de lavados/cobros. No mezclar fecha del lavado con fecha del cobro.',
  'modules/users':
    'Perfiles, roles y administración de cuentas. Conservar al último admin y revocar sesiones al cambiar permisos.',
  'modules/vehicles':
    'Vehículos y ownership. La baja es lógica y no se permite transferir el titular de un registro histórico.',
  'modules/vehicleTypes':
    'Categorías activas de vehículo que determinan las tarifas; conservar referencias históricas al desactivar.',
  'modules/services':
    'Descripción/duración de servicios y precios por categoría. Los contratos ya reservados no se recalculan al editar catálogo.',
  'modules/settings':
    'Configuración operativa compartida. Los cambios se serializan con reservas y no reprograman turnos existentes.',
  'modules/health':
    'Liveness, readiness e información pública del sistema; no mostrar credenciales ni mensajes del driver.',
  'modules/attendance':
    'Asistencia con el reloj y horario del negocio. El administrador registra la llegada observada; no se permite fichar otra fecha ni duplicar el primer fichaje.',
  'modules/customerMessages':
    'Reclamos y devoluciones persistentes. El cliente ve los propios; Administración responde una vez. La devolución queda vinculada al parte y su autor.',
};

/** Describe las fronteras de una carpeta sin mezclar reglas del negocio con presentación.
 * @param {string} folder Carpeta relativa, comenzando en src/.
 * @returns {string} Responsabilidad de la capa para su guía local.
 */
export function purposeOf(folder) {
  const name = folder.replace(/^src\/?/u, '');
  const key = name.startsWith('app/') ? 'app' : name;
  return (
    purposes[key] ??
    purposes[key.split('/')[0]] ??
    'Composición del punto de entrada y montaje de sus capas.'
  );
}
