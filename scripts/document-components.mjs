import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import console from 'node:console';
import ts from 'typescript';
const root = process.cwd();
const config = ts.readConfigFile(path.join(root, 'tsconfig.json'), ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root),
  program = ts.createProgram(parsed.fileNames, parsed.options),
  checker = program.getTypeChecker();
const output = [
  '# Catálogo de componentes Atomic Design',
  '',
  'Cada componente tiene una responsabilidad y recibe datos/callbacks tipados. Los ejemplos usan variables del tipo indicado y se componen dentro de una pantalla o componente. Las propiedades nativas heredadas de React Native conservan su contrato original.',
  '',
];
let count = 0;
for (const layer of ['atoms', 'molecules', 'organisms']) {
  output.push('## ' + layer, '');
  const folder = path.join(root, 'src/components', layer);
  for (const filename of fs
    .readdirSync(folder)
    .filter((n) => n.endsWith('.tsx'))
    .sort()) {
    const file = path.join(folder, filename),
      sf = program.getSourceFile(file);
    if (!sf) continue;
    const component = sf.statements.find(
      (n) =>
        ts.isFunctionDeclaration(n) &&
        n.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword),
    );
    if (!component) continue;
    const name = component.name.text;
    count++;
    const description = (component.jsDoc?.[0]?.comment || '').toString().replaceAll('\n', ' ');
    output.push(
      '### ' + name,
      '',
      description,
      '',
      `[Fuente](../src/components/${layer}/${filename})`,
      '',
    );
    const parameter = component.parameters[0];
    let props = [];
    if (parameter) {
      output.push(
        'Tipo del parámetro:',
        '',
        '```ts',
        parameter.type?.getText(sf) || 'Sin propiedades propias',
        '```',
        '',
      );
      const type = checker.getTypeAtLocation(parameter);
      props = checker
        .getPropertiesOfType(type)
        .filter((p) =>
          p.declarations?.some(
            (d) =>
              d
                .getSourceFile()
                .fileName.replaceAll('\\', '/')
                .startsWith(root.replaceAll('\\', '/')) &&
              !d.getSourceFile().fileName.includes('node_modules'),
          ),
        );
      if (props.length) {
        output.push('| Prop | Obligatoria | Tipo |', '|---|---|---|');
        for (const prop of props) {
          const d = prop.valueDeclaration || prop.declarations[0];
          const type =
            d.type?.getText(d.getSourceFile()).replace(/\s+/g, ' ') ||
            checker.typeToString(checker.getTypeOfSymbolAtLocation(prop, component));
          output.push(
            `| ${prop.name} | ${prop.flags & ts.SymbolFlags.Optional ? 'No' : 'Sí'} | \`${type.replaceAll('|', '\\|')}\` |`,
          );
        }
        output.push('');
      }
    } else output.push('No recibe propiedades.', '');
    const required = props.filter(
      (p) => !(p.flags & ts.SymbolFlags.Optional) && p.name !== 'children',
    );
    const example = required
      .map((p) =>
        p.name === 'label' || p.name === 'title'
          ? `${p.name}="Guardar"`
          : p.name === 'visible'
            ? `${p.name}={true}`
            : p.name.startsWith('on')
              ? `${p.name}={handleAction}`
              : `${p.name}={${['m', 'manager', 'catalog'].includes(p.name) ? 'manager' : p.name}}`,
      )
      .join(' ');
    output.push(
      'Uso:',
      '',
      '```tsx',
      name === 'Text'
        ? '<Text>Texto del lavadero</Text>'
        : `<${name}${example ? ' ' + example : ''} />`,
      '```',
      '',
    );
  }
}
fs.writeFileSync(path.join(root, 'docs/components.md'), output.join('\n'));
console.log('Catálogo completo:', count, 'componentes con props y ejemplo.');
