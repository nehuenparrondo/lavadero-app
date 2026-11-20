import Svg, { Path } from 'react-native-svg';
import { iconPaths } from '../../constants/iconPaths';
import { useTheme } from '../../hooks/useTheme';
import type { IconName } from '../../types/icon';
import { decorativeSvgProps } from '../../utils/decorativeSvgProps';
/** Ícono vectorial decorativo; la acción contenedora debe aportar su nombre accesible.
 * @param props Nombre del catálogo local, tamaño en puntos y color opcional del tema.
 * @returns SVG escalable sin descargas ni carga de fuentes.
 */
export function AppIcon({
  name,
  size = 20,
  color,
}: {
  name: IconName;
  size?: number;
  color?: string;
}) {
  const { colors } = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...decorativeSvgProps()}>
      <Path
        d={iconPaths[name]}
        stroke={color ?? colors.text}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
