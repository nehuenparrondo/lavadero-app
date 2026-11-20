import { Tabs } from 'expo-router';
import { AppIcon } from '../components/atoms/AppIcon';
import { useTheme } from '../hooks/useTheme';
import { useWorkspaceLayout } from '../hooks/useWorkspaceLayout';
import type { IconName } from '../types/icon';
import { tabOptions } from '../utils/navigationOptions';
/** Destino de la barra móvil. El nombre coincide con un archivo de ruta del grupo. */
export interface TabItem {
  name: string;
  label: string;
  icon: IconName;
}
/** Destinos táctiles en teléfono; escritorio usa la barra lateral del mismo rol.
 * @param props Rutas visibles dentro del grupo protegido.
 * @returns Tabs de Expo Router con íconos vectoriales y sin cabecera duplicada.
 */
export function RoleTabs({ items }: { items: TabItem[] }) {
  const { colors } = useTheme();
  const { wide } = useWorkspaceLayout();
  const options = tabOptions(colors);
  return (
    <Tabs
      screenOptions={{
        ...options,
        headerShown: false,
        tabBarStyle: wide ? { display: 'none' } : options.tabBarStyle,
      }}
    >
      {items.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.label,
            tabBarIcon: ({ focused }) => (
              <AppIcon name={item.icon} color={focused ? colors.primary : colors.muted} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
