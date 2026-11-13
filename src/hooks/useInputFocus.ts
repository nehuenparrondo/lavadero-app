import { useState } from 'react';
import type { TextInputProps } from 'react-native';

/** Mejora el foco sin reemplazar los eventos de React Hook Form ni del control nativo.
 * @param props Eventos originales del campo controlado.
 * @returns Estado visual y eventos que conservan la validación al abandonar el campo.
 */
export function useInputFocus(props: TextInputProps) {
  const [focused, setFocused] = useState(false);
  const onFocus: TextInputProps['onFocus'] = (event) => {
    setFocused(true);
    props.onFocus?.(event);
  };
  const onBlur: TextInputProps['onBlur'] = (event) => {
    setFocused(false);
    props.onBlur?.(event);
  };
  return { focused, onFocus, onBlur };
}
