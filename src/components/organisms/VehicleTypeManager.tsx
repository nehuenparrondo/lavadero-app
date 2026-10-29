import { View } from 'react-native';
import { Card } from '../molecules/Card';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { Notice } from '../molecules/Notice';
import { ModalPanel } from './ModalPanel';
import { EntityForm } from './EntityForm';
import { useVehicleTypes } from '../../hooks/useVehicleTypes';
/** Categorías registradas y formularios administrativos sin exponer SQL ni identificadores técnicos. */
export function VehicleTypeManager() {
  const m = useVehicleTypes();
  return (
    <>
      <Card>
        <Text style={{ fontSize: 20, fontWeight: '800' }}>Tipos de vehículo</Text>
        <Button label="+ Agregar tipo" variant="secondary" onPress={m.create} />
        <Notice error={m.state.error || m.action.error} message={m.action.message} />
        {m.state.data?.map((type) => (
          <View key={type.id} style={{ gap: 8 }}>
            <Text>
              {type.name}
              {type.isActive ? '' : ' · Inactivo'}
            </Text>
            <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
              <Button label="Editar" variant="quiet" onPress={() => m.edit(type)} />
              {type.isActive && (
                <Button
                  label="Desactivar"
                  variant="quiet"
                  onPress={() => {
                    void m.remove(type);
                  }}
                />
              )}
            </View>
          </View>
        ))}
      </Card>
      <ModalPanel
        visible={m.open}
        title={m.editing ? 'Editar tipo' : 'Nuevo tipo'}
        onClose={m.close}
      >
        <Notice error={m.action.error} />
        <EntityForm
          key={m.editing?.id ?? 'new'}
          fields={[
            { name: 'name', label: 'Nombre', maxLength: 80 },
            {
              name: 'isActive',
              label: 'Disponibilidad',
              kind: 'choice',
              options: [
                { value: 'true', label: 'Activo' },
                { value: 'false', label: 'Inactivo' },
              ],
            },
          ]}
          initialValues={{
            name: m.editing?.name ?? '',
            isActive: String(m.editing?.isActive ?? true),
          }}
          onSubmit={m.save}
          busy={m.action.busy}
        />
      </ModalPanel>
    </>
  );
}
