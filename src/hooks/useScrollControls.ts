import { useRef, useState } from 'react';
import type { ComponentRef } from 'react';
import { ScrollView } from 'react-native';
import type { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { shouldOfferScrollTop } from '../utils/scrollVisibility';
/** Vincula los botones a su propia región; no desplaza la ventana ni otros diálogos.
 * @returns Ref, visibilidad y manejadores de medidas/desplazamiento para ScrollView.
 */
export function useScrollControls() {
  const ref = useRef<ComponentRef<typeof ScrollView>>(null);
  const metrics = useRef({ offset: 0, viewport: 0, content: 0 });
  const [showTop, setShowTop] = useState(false);
  const update = () => setShowTop(shouldOfferScrollTop(metrics.current));
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    metrics.current.offset = event.nativeEvent.contentOffset.y;
    update();
  };
  const onLayout = (event: LayoutChangeEvent) => {
    metrics.current.viewport = event.nativeEvent.layout.height;
    update();
  };
  const onContentSizeChange = (_width: number, height: number) => {
    metrics.current.content = height;
    update();
  };
  return {
    ref,
    showTop,
    onScroll,
    onLayout,
    onContentSizeChange,
    toTop: () => ref.current?.scrollTo({ y: 0, animated: true }),
  };
}
