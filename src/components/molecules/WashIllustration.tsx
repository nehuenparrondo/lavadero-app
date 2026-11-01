import Svg, { Circle, Path } from 'react-native-svg';
/** Ilustración vectorial decorativa del servicio; no representa un vehículo del cliente.
 * @returns Silueta original de auto y reflejos, sin imagen externa.
 */
export function WashIllustration() {
  return (
    <Svg width={240} height={160} viewBox="0 0 300 200" fill="none" accessible={false}>
      <Circle cx={155} cy={100} r={80} fill="#FFFFFF08" stroke="#FFFFFF12" />
      <Circle cx={155} cy={100} r={60} stroke="#FFFFFF12" strokeDasharray="4 7" />
      <Path
        d="m51 125 17-37q3-8 13-8h133q10 0 14 8l18 37v29H51Zm5-1h184M85 84l-8 37m129-37 13 37M72 139h24m105 0h24M69 156v12h20v-12m119 0v12h20v-12"
        stroke="#FFFFFF"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="m241 36 4 12 12 4-12 4-4 12-4-12-12-4 12-4ZM51 56l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z"
        fill="#E1EDAB"
      />
      <Path d="M42 182h217" stroke="#FFFFFF30" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
