import type { ConfigContext, ExpoConfig } from 'expo/config';

/** Define identidad móvil; usa solo variables públicas, nunca secretos OAuth.
 * @param props - Configuración inicial suministrada por Expo.
 * @returns Configuración managed de Lavadero para Android, iOS y web.
 */
export default function createExpoConfig({ config }: ConfigContext): ExpoConfig {
  const projectId =
    process.env.EXPO_PUBLIC_EAS_PROJECT_ID ?? 'a36a1817-4c5e-46a4-9f75-52aadfa5bd1d';
  return {
    ...config,
    name: 'Lavadero',
    slug: 'lavadero-app',
    version: '1.1.1',
    scheme: 'lavadero',
    orientation: 'default',
    userInterfaceStyle: 'automatic',
    icon: './assets/icon.png',
    owner: 'elpepoestangod',
    android: { package: 'com.nehuenparrondo.lavadero', versionCode: 7 },
    ios: { bundleIdentifier: 'com.nehuenparrondo.lavadero', supportsTablet: true },
    web: { bundler: 'metro', output: 'single', favicon: './assets/icon.png' },
    plugins: [
      ['expo-router', { asyncRoutes: { web: false } }],
      'expo-dev-client',
      'expo-secure-store',
      'expo-web-browser',
    ],
    extra: projectId ? { eas: { projectId } } : {},
  };
}
