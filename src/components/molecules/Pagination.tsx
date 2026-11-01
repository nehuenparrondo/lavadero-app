import { View } from 'react-native';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
/** Navegación de listas grandes sin perder búsqueda y filtros.
 * @param props - Propiedades tipadas: page, total, limit, onChange. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function Pagination({
  page,
  total,
  limit,
  onChange,
}: {
  page: number;
  total: number;
  limit: number;
  onChange: (page: number) => void;
}) {
  if (total <= limit) return null;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
      }}
    >
      <Button
        label="Anterior"
        variant="secondary"
        disabled={page === 1}
        onPress={() => onChange(page - 1)}
      />
      <Text>
        {page} / {Math.ceil(total / limit)}
      </Text>
      <Button
        label="Siguiente"
        variant="secondary"
        disabled={page * limit >= total}
        onPress={() => onChange(page + 1)}
      />
    </View>
  );
}
