import { Pressable, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { Choice } from '../../types/form';
import { Text } from '../atoms/Text';

/** Busca en todas las opciones, limitando las filas dibujadas para mantener fluidez.
 * @param props Opciones autorizadas, búsqueda y valor controlado.
 * @returns Resultados y estados vacíos del diálogo de selección.
 */
export function SearchSelectResults({
  options,
  search,
  value,
  onChange,
}: {
  options: Choice[];
  search: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const normalize = (text: string) =>
    text
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase();
  const results = options.filter((o) => normalize(o.label).includes(normalize(search)));
  return (
    <View style={{ gap: 6 }}>
      {results.slice(0, 50).map((option) => (
        <SelectOption
          key={option.value}
          option={option}
          selected={value === option.value}
          onPress={() => onChange(option.value)}
        />
      ))}
      {!results.length && <Text>No hay coincidencias.</Text>}
      {results.length > 50 && <Text>Escribí un nombre para acotar los resultados.</Text>}
    </View>
  );
}

/** Fila táctil uniforme con selección accesible. */
function SelectOption({
  option,
  selected,
  onPress,
}: {
  option: Choice;
  selected: boolean;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={{
        padding: 16,
        minHeight: 48,
        borderRadius: 10,
        backgroundColor: selected ? colors.soft : colors.background,
      }}
    >
      <Text style={{ color: selected ? colors.primary : colors.text }}>{option.label}</Text>
    </Pressable>
  );
}
