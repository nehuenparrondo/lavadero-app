import { ModalPanel } from './ModalPanel';
import { EntityForm } from './EntityForm';
import { Notice } from '../molecules/Notice';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import type { useCatalog } from '../../hooks/useCatalog';
/** Edición de servicio, tarifa por tipo y confirmación de baja lógica. */
export function ServiceEditors({ catalog: c }: { catalog: ReturnType<typeof useCatalog> }) {
  return (
    <>
      <ModalPanel
        visible={c.open}
        title={c.editing ? 'Editar servicio' : 'Nuevo servicio'}
        onClose={c.close}
      >
        <Notice error={c.action.error} />
        <EntityForm
          key={c.editing?.id ?? 'new'}
          fields={c.fields}
          initialValues={c.initialValues}
          onSubmit={c.save}
          busy={c.action.busy}
        />
      </ModalPanel>
      <ModalPanel
        visible={Boolean(c.pricing)}
        title={`Precios · ${c.pricing?.name ?? ''}`}
        onClose={() => c.setPricing(null)}
      >
        <Notice error={c.action.error} />
        <EntityForm
          key={c.pricing?.id ?? 'price'}
          fields={[
            {
              name: 'vehicleTypeId',
              label: 'Tipo de vehículo',
              kind: 'choice',
              options: (c.types.data ?? []).map((t) => ({ value: t.id, label: t.name })),
            },
            {
              name: 'price',
              label: 'Precio en pesos argentinos',
              kind: 'money',
              placeholder: '9000',
            },
          ]}
          onSubmit={c.savePrice}
          busy={c.action.busy}
        />
      </ModalPanel>
      <ModalPanel
        visible={Boolean(c.deleting)}
        title="Eliminar servicio"
        onClose={() => c.setDeleting(null)}
      >
        <Text>
          ¿Querés eliminar {c.deleting?.name}? Los turnos anteriores conservarán sus precios y
          descripción.
        </Text>
        <Notice error={c.action.error} />
        <Button
          label="Eliminar servicio"
          variant="danger"
          loading={c.action.busy}
          onPress={() => {
            void c.remove();
          }}
        />
      </ModalPanel>
    </>
  );
}
