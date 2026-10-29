import { Tabs } from 'expo-router';
import { Text } from '../components/atoms/Text';
import { useTheme } from '../hooks/useTheme';
/** Entrada de navegación de un rol. */
export interface TabItem {
  name: string;
  label: string;
  icon: string;
}
/** Barra inferior cómoda, con pantallas declaradas por rol. */
export function RoleTabs({ items }: { items: TabItem[] }) {
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          minHeight: 66,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      {items.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.label,
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 24, color }}>{item.icon}</Text>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
