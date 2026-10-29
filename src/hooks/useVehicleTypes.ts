import { useState } from 'react';
import { useRemoteData } from './useRemoteData';
import { useAction } from './useAction';
import { writeResource } from '../api/services/resourceService';
import type { VehicleType } from '../types/entities';
/** ABML de categorías; las bajas conservan vehículos y precios históricos asociados. */
export function useVehicleTypes() {
  const state = useRemoteData<VehicleType[]>('/vehicle-types');
  const action = useAction();
  const [editing, setEditing] = useState<VehicleType | null>(null);
  const [open, setOpen] = useState(false);
  const create = () => {
    setEditing(null);
    setOpen(true);
    action.clear();
  };
  const edit = (type: VehicleType) => {
    setEditing(type);
    setOpen(true);
    action.clear();
  };
  const save = async (v: Record<string, string>) => {
    const code =
      editing?.code ??
      `${v.name
        ?.normalize('NFD')
        .replace(/[\u0300-\u036f]/gu, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/gu, '-')
        .slice(0, 14)}-${Date.now().toString(36)}`;
    const result = await action.run(() =>
      writeResource(
        editing ? 'put' : 'post',
        editing ? `/vehicle-types/${editing.id}` : '/vehicle-types',
        { code, name: v.name, isActive: v.isActive === 'true' },
      ),
    );
    if (result !== undefined) {
      setOpen(false);
      await state.refresh();
    }
  };
  const remove = async (type: VehicleType) => {
    await action.run(async () => {
      await writeResource('delete', `/vehicle-types/${type.id}`);
      await state.refresh();
    }, 'Tipo desactivado.');
  };
  return {
    state,
    action,
    editing,
    open,
    create,
    edit,
    save,
    remove,
    close: () => setOpen(false),
  };
}
