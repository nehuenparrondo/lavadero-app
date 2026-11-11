import { View } from 'react-native';
import { useSearchSelect } from '../../hooks/useSearchSelect';
import type { Choice } from '../../types/form';
import { Button } from '../atoms/Button';
import { ModalPanel } from '../organisms/ModalPanel';
import { SearchBar } from './SearchBar';
import { SearchSelectResults } from './SearchSelectResults';

/** Selecciona una opción en un diálogo buscable sin ocupar toda la agenda.
 * @param props Etiqueta, opciones autorizadas y valor controlado.
 * @returns Campo compacto; elegir una fila cierra el diálogo.
 */
export function SearchSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Choice[];
  value: string;
  onChange: (value: string) => void;
}) {
  const m = useSearchSelect(onChange);
  return (
    <View style={{ gap: 8 }}>
      <Button
        label={`${label}: ${options.find((o) => o.value === value)?.label ?? 'Todos'}`}
        variant="secondary"
        onPress={m.show}
      />
      <ModalPanel
        visible={m.open}
        title={`Filtrar por ${label.toLowerCase()}`}
        onClose={m.close}
      >
        <SearchBar
          label={`Buscar ${label.toLowerCase()}`}
          value={m.search}
          onChange={m.setSearch}
        />
        <SearchSelectResults
          options={options}
          search={m.search}
          value={value}
          onChange={m.choose}
        />
      </ModalPanel>
    </View>
  );
}
