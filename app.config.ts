import type { ConfigContext, ExpoConfig } from 'expo/config';

/** Define identidad móvil; usa solo variables públicas, nunca secretos OAuth. */
export default function createExpoConfig({ config }: ConfigContext): ExpoConfig {
  const projectId = process.env.EXPO_PUBLIC_EAS_PROJECT_ID;
  return {
    ...config,
    name: 'Lavadero',
    slug: 'lavadero-app',
    version: '0.1.0',
    scheme: 'lavadero',
    orientation: 'default',
    userInterfaceStyle: 'automatic',
    icon: './assets/icon.png',
    android: { package: 'com.lavadero.app' },
    ios: { bundleIdentifier: 'com.lavadero.app', supportsTablet: true },
    plugins: ['expo-dev-client'],
    extra: projectId ? { eas: { projectId } } : {},
  };
}
