import { useEffect, useRef } from 'react';
import type { ComponentRef } from 'react';
import { ScrollView } from 'react-native';
import { slotTime } from '../utils/format';

import { WHEEL_ROW_HEIGHT } from '../constants/timeWheel';

/** Sincroniza arrastre, rueda del mouse y botones sin inventar horas libres.
 * @param slots Horarios ofrecidos por la última cotización del servidor.
 * @param value Horario elegido; vacío conserva el pedido de selección explícita.
 * @param onChange Publica únicamente una opción todavía disponible.
 * @returns Filas, referencia del scroll y controles accesibles.
 */
export function useTimeWheel(
  slots: string[],
  value: string,
  onChange: (value: string) => void,
) {
  const ref = useRef<ComponentRef<typeof ScrollView>>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const rows = ['', ...slots];
  const index = Math.max(0, rows.indexOf(value));
  const choose = (position: number) =>
    onChange(rows[Math.max(0, Math.min(rows.length - 1, position))] ?? '');
  const settle = (offset: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => choose(Math.round(offset / WHEEL_ROW_HEIGHT)), 160);
  };
  useEffect(() => {
    clearTimeout(timer.current);
    ref.current?.scrollTo({ y: index * WHEEL_ROW_HEIGHT, animated: false });
    return () => clearTimeout(timer.current);
  }, [index, slots.join(',')]);
  return {
    ref,
    rows,
    index,
    settle,
    choose,
    label: value && slots.includes(value) ? slotTime(value) : 'Elegí un horario',
  };
}
