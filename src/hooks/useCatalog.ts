import { useState } from 'react';
import { useRemoteData } from './useRemoteData';
import { useAction } from './useAction';
import { writeResource } from '../api/services/resourceService';
import type { Service, VehicleType } from '../types/entities';
import type { FormFieldDefinition } from '../types/form';
import { pesosToCents } from '../utils/pesosToCents';
/** Catálogo y edición administrativa de duración/precios por tipo. */
export function useCatalog() {
  const list = useRemoteData<Service[]>('/services');
  const types = useRemoteData<VehicleType[]>('/vehicle-types');
  const action = useAction();
  const [typeId, setTypeId] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [deleting, setDeleting] = useState<Service | null>(null);
  const [pricing, setPricing] = useState<Service | null>(null);
  const fields: FormFieldDefinition[] = [
    { name: 'name', label: 'Nombre del servicio', maxLength: 100 },
    { name: 'description', label: 'Descripción', maxLength: 3000 },
    { name: 'durationMinutes', label: 'Duración estimada (minutos)', kind: 'number' },
    {
      name: 'isActive',
      label: 'Disponibilidad',
      kind: 'choice',
      options: [
        { value: 'true', label: 'Activo' },
        { value: 'false', label: 'Inactivo' },
      ],
    },
  ];
  const initialValues = editing
    ? {
        name: editing.name,
        description: editing.description,
        durationMinutes: String(editing.durationMinutes),
        isActive: String(editing.isActive),
      }
    : { isActive: 'true' };
  const create = () => {
    action.clear();
    setEditing(null);
    setOpen(true);
  };
  const edit = (v: Service) => {
    action.clear();
    setEditing(v);
    setOpen(true);
  };
  const save = async (v: Record<string, string>) => {
    const code =
      editing?.code ??
      `${v.name
        ?.normalize('NFD')
        .replace(/[\u0300-\u036f]/gu, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/gu, '-')
        .slice(0, 24)}-${Date.now().toString(36)}`;
    const result = await action.run(() =>
      writeResource(
        editing ? 'patch' : 'post',
        editing ? `/services/${editing.id}` : '/services',
        {
          code,
          name: v.name,
          description: v.description,
          durationMinutes: Number(v.durationMinutes),
          isActive: v.isActive === 'true',
        },
      ),
    );
    if (result !== undefined) {
      setOpen(false);
      await list.refresh();
    }
  };
  const remove = async () => {
    if (!deleting) return;
    const result = await action.run(
      () => writeResource('delete', `/services/${deleting.id}`),
      'Servicio eliminado.',
    );
    if (result !== undefined) {
      setDeleting(null);
      await list.refresh();
    }
  };
  const savePrice = async (v: Record<string, string>) => {
    if (!pricing) return;
    const result = await action.run(() =>
      writeResource('put', `/services/${pricing.id}/prices/${v.vehicleTypeId}`, {
        priceCents: pesosToCents(v.price ?? ''),
      }),
    );
    if (result !== undefined) {
      setPricing(null);
      await list.refresh();
    }
  };
  return {
    list,
    types,
    action,
    typeId,
    setTypeId,
    open,
    editing,
    initialValues,
    fields,
    create,
    edit,
    save,
    close: () => setOpen(false),
    deleting,
    setDeleting,
    remove,
    pricing,
    setPricing,
    savePrice,
  };
}
