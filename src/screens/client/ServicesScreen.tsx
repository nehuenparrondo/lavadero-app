import { Screen } from '../../components/organisms/Screen';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { ChoiceGroup } from '../../components/molecules/ChoiceGroup';
import { Button } from '../../components/atoms/Button';
import { CollectionState } from '../../components/organisms/CollectionState';
import { ServiceCard } from '../../components/molecules/ServiceCard';
import { ServiceEditors } from '../../components/organisms/ServiceEditors';
import { Notice } from '../../components/molecules/Notice';
import { useCatalog } from '../../hooks/useCatalog';
/** Catálogo del cliente y ABML administrativo reutilizando componentes. */
export function ServicesScreen({ admin = false }: { admin?: boolean }) {
  const c = useCatalog();
  const typeId = c.typeId || c.types.data?.[0]?.id || '';
  return (
    <Screen
      refreshing={c.list.loading}
      onRefresh={() => {
        void c.list.refresh();
      }}
    >
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
      <CollectionState
        loading={c.list.loading}
        error={c.list.error}
        empty={!c.list.data?.length}
        emptyTitle="Todavía no hay servicios disponibles"
        onRetry={() => {
          void c.list.refresh();
        }}
      >
        {c.list.data?.map((s) => (
          <ServiceCard
            key={s.id}
            service={s}
            typeId={typeId}
            {...(admin
              ? {
                  onEdit: () => c.edit(s),
                  onPrice: () => c.setPricing(s),
                  onDelete: () => c.setDeleting(s),
                }
              : {})}
          />
        ))}
      </CollectionState>
      {admin && <ServiceEditors catalog={c} />}
    </Screen>
  );
}
