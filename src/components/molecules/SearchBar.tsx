import { Input } from '../atoms/Input';
/** Búsqueda controlada, con etiqueta accesible y teclado de búsqueda.
 * @param props - Propiedades tipadas: label, value, onChange. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function SearchBar({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Input
      accessibilityLabel={label}
      placeholder={label}
      value={value}
      onChangeText={onChange}
      returnKeyType="search"
    />
  );
}
