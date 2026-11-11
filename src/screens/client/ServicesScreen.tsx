import { Button } from '../../components/atoms/Button';
import { ChoiceGroup } from '../../components/molecules/ChoiceGroup';
import { Notice } from '../../components/molecules/Notice';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { Screen } from '../../components/organisms/Screen';
import { ServiceCollection } from '../../components/organisms/ServiceCollection';
import { ServiceEditors } from '../../components/organisms/ServiceEditors';
import { useCatalog } from '../../hooks/useCatalog';
/** Catálogo del cliente y ABML administrativo reutilizando componentes.
 * @param props - Propiedades tipadas: admin.
 * @returns Vista de ServicesScreen con el contrato de propiedades declarado.
 */
export function ServicesScreen({ admin = false }: { admin?: boolean }) {
  const c = useCatalog();
  const typeId = c.typeId || c.types.data?.[0]?.id || '';
  return (
    <Screen refreshing={c.list.loading} onRefresh={c.refresh} onRevalidate={c.revalidate}>
      <SectionHeader
        title={admin ? 'Servicios y precios' : 'Elegí cómo cuidarlo'}
        subtitle="Precios en pesos argentinos, según tu vehículo."
      />
      {admin && <Button label="+ Crear servicio" onPress={c.create} />}
      <ChoiceGroup
        value={typeId}
        onChange={c.setTypeId}
        options={(c.types.data ?? []).map((t) => ({ value: t.id, label: t.name }))}
      />
      <Notice error={c.types.error} message={c.action.message} />
      <ServiceCollection c={c} admin={admin} typeId={typeId} />
      {admin && <ServiceEditors catalog={c} />}
    </Screen>
  );
}
