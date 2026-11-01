import { Tabs } from 'expo-router';
import { Icon } from '../components/atoms/Icon';
import { useTheme } from '../hooks/useTheme';
import { tabOptions } from '../utils/navigationOptions';
/** Entrada de navegación de un rol. */
export interface TabItem {
  name: string;
  label: string;
  icon: string;
}
/** Barra inferior cómoda, con pantallas declaradas por rol.
 * @param props - Propiedades tipadas: items. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function RoleTabs({ items }: { items: TabItem[] }) {
  const { colors } = useTheme();
  return (
    <Tabs screenOptions={tabOptions(colors)}>
      {items.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.label,
            tabBarIcon: ({ color }) => <Icon symbol={item.icon} color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
}
