import { useVehicleTypes } from '../../hooks/useVehicleTypes';
import { vehicleTypeFields } from '../../utils/catalogFields';
import { Notice } from '../molecules/Notice';
import { LoadingState } from '../molecules/LoadingState';
import { EntityForm } from './EntityForm';
import { ModalPanel } from './ModalPanel';
/** Formulario administrativo de categorías utilizadas por las tarifas.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de VehicleTypeDialog con el contrato de propiedades declarado.
 */
export function VehicleTypeDialog({ m }: { m: ReturnType<typeof useVehicleTypes> }) {
  return (
    <ModalPanel
      visible={m.open}
      title={m.editing ? 'Editar tipo' : 'Nuevo tipo'}
      onClose={m.close}
    >
      <Notice error={m.action.error} />
      <Notice error={m.catalog.error} onRetry={m.catalog.refresh} />
      {m.catalog.loading && <LoadingState label="Cargando los servicios…" />}
      {!m.catalog.loading && !m.catalog.error && (
        <EntityForm
          key={m.editing?.id ?? 'new'}
          fields={[...vehicleTypeFields, ...m.prices.fields]}
          initialValues={{
            name: m.editing?.name ?? '',
            isActive: String(m.editing?.isActive ?? true),
            ...m.prices.values,
          }}
          onSubmit={m.save}
          busy={m.action.busy}
        />
      )}
    </ModalPanel>
  );
}
