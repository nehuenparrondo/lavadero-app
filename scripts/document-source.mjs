import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import console from 'node:console';
import ts from 'typescript';
const base = path.dirname(process.cwd());
const purpose = {
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
};
function walk(folder) {
  return fs
    .readdirSync(folder, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory()
        ? walk(path.join(folder, e.name))
        : /\.tsx?$/.test(e.name)
          ? [path.join(folder, e.name)]
          : [],
    );
}
function summary(node) {
  return (
    node.jsDoc
      ?.map((d) => (typeof d.comment === 'string' ? d.comment : ''))
      .filter(Boolean)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim() || ''
  );
}
function exportsOf(source) {
  return source.statements.flatMap((s) => {
    if (ts.isExportDeclaration(s))
      return (
        s.exportClause?.elements?.map((e) => ({ name: e.name.text, detail: summary(s) })) || []
      );
    if (!s.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) return [];
    if (ts.isVariableStatement(s))
      return s.declarationList.declarations.map((d) => ({
        name: d.name.getText(source),
        detail: summary(s),
      }));
    return s.name ? [{ name: s.name.text, detail: summary(s) }] : [];
  });
}
const esc = (s) => s.replaceAll('|', '\\|');
for (const project of [path.basename(process.cwd())]) {
  const root = path.join(base, project),
    src = path.join(root, 'src'),
    folders = new Map();
  const output = [
    '# Mapa del código fuente',
    '',
    'Guía de navegación de todos los archivos TypeScript de producción. Los contratos detallados de parámetros, retorno e invariantes se conservan junto a las funciones; los flujos completos se explican en [code-guide.md](code-guide.md).',
    '',
    'Este mapa no ejecuta módulos ni lee variables de entorno. Revisión: 01/11/2026.',
    '',
  ];
  let total = 0;
  for (const file of walk(src).sort()) {
    const rel = path.relative(root, file).replaceAll('\\', '/'),
      folder = path.relative(src, path.dirname(file)).replaceAll('\\', '/');
    const source = ts.createSourceFile(
      file,
      fs.readFileSync(file, 'utf8'),
      ts.ScriptTarget.Latest,
      true,
    );
    const exports = exportsOf(source),
      first =
        exports.find((e) => e.detail)?.detail ||
        summary(source.statements.find((s) => s.jsDoc?.length) || {}) ||
        'Composición interna del módulo; consultar sus contratos de tipos.';
    const item = { name: path.basename(file), rel, first, exports };
    if (!folders.has(folder)) folders.set(folder, []);
    folders.get(folder).push(item);
    total++;
    output.push('## ' + rel, '', first, '', '[Abrir fuente](../' + rel + ')', '');
    if (exports.length) {
      output.push('| Exportación | Responsabilidad |', '| --- | --- |');
      exports.forEach((e) =>
        output.push(
          '| ' +
            esc(e.name) +
            ' | ' +
            esc(e.detail || 'Contrato tipado declarado en la fuente.') +
            ' |',
        ),
      );
      output.push('');
    }
  }
  for (const [folder, items] of folders) {
    const target = path.join(src, folder, 'README.md');
    const parent = folder.startsWith('app/') ? 'app' : folder;
    const intro =
      purpose[parent] ||
      purpose[folder.split('/')[0]] ||
      'Composición y contratos del módulo.';
    const lines = [
      '# ' + (folder || 'src'),
      '',
      intro,
      '',
      '## Archivos y responsabilidades',
      '',
      '| Archivo | Responsabilidad |',
      '| --- | --- |',
    ];
    items.forEach((item) =>
      lines.push(
        '| [' + item.name + '](' + encodeURI(item.name) + ') | ' + esc(item.first) + ' |',
      ),
    );
    lines.push(
      '',
      '## Mantenimiento',
      '',
      'Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.',
      '',
    );
    fs.writeFileSync(target, lines.join('\n'));
  }
  fs.writeFileSync(path.join(root, 'docs/source-map.md'), output.join('\n'));
  console.log(
    project + ': ' + total + ' archivos y ' + folders.size + ' carpetas documentados.',
  );
}
