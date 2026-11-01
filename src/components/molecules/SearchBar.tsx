import { Input } from '../atoms/Input';
/** Búsqueda controlada, con etiqueta accesible y teclado de búsqueda.
 * @param props - Propiedades tipadas: label, value, onChange.
 * @returns Vista de SearchBar con el contrato de propiedades declarado.
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
