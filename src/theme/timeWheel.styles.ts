import { Platform, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { WHEEL_ROW_HEIGHT as height } from '../constants/timeWheel';

/** El navegador usa snap CSS; iOS/Android usan snapToInterval en el mismo control. */
export const timeWheelStyles = StyleSheet.create({
  frame: {
    height: height * 5,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 20,
    borderWidth: 1,
  },
  scroll: {
    height: height * 5,
    ...(Platform.OS === 'web'
      ? ({ scrollSnapType: 'y mandatory', overscrollBehavior: 'contain' } as ViewStyle)
      : {}),
  },
  content: { paddingVertical: height * 2 },
  row: {
    height,
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'web' ? ({ scrollSnapAlign: 'center' } as ViewStyle) : {}),
  },
  highlight: {
    position: 'absolute',
    top: height * 2,
    left: 12,
    right: 12,
    height,
    borderRadius: 12,
  },
});
