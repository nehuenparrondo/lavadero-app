import { View } from 'react-native';
import type { useHome } from '../../hooks/useHome';
import { CompactIconButton } from '../atoms/CompactIconButton';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { Notice } from '../molecules/Notice';
import { SectionHeader } from '../molecules/SectionHeader';
import { ModalPanel } from './ModalPanel';

/** Limpieza confirmada del inicio propio sin cancelar las visitas del cliente.
 * @param props Recurso y acción persistente de la pantalla principal.
 * @returns Título con tacho pequeño y explicación de la confirmación.
 */
export function ClientVisitHeader({ home: h }: { home: ReturnType<typeof useHome> }) {
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <SectionHeader
            title="Tus turnos activos"
            subtitle="Horarios, servicios y estado de tus próximas visitas."
          />
        </View>
        <CompactIconButton
          icon="trash"
          label="Limpiar turnos del inicio"
          disabled={!h.upcoming.length || h.cleanup.action.busy}
          onPress={() => h.cleanup.setOpen(true)}
        />
      </View>
      <ClearVisitsDialog home={h} />
    </>
  );
}

/** La confirmación explica la diferencia entre ocultar tarjetas y cancelar una reserva. */
function ClearVisitsDialog({ home: h }: { home: ReturnType<typeof useHome> }) {
  return (
    <ModalPanel
      visible={h.cleanup.open}
      title="¿Limpiar tus turnos del inicio?"
      onClose={() => h.cleanup.setOpen(false)}
    >
      <Text>
        Se ocultarán las tarjetas de este inicio. Tus reservas seguirán vigentes y podrás
        verlas en Mis turnos. No se cancelará ningún lavado.
      </Text>
      <Notice error={h.cleanup.action.error} />
      <Button
        label="Confirmar limpieza"
        loading={h.cleanup.action.busy}
        onPress={() => {
          void h.cleanup.clear();
        }}
      />
      <Button
        label="Conservar mis turnos"
        variant="quiet"
        onPress={() => h.cleanup.setOpen(false)}
      />
    </ModalPanel>
  );
}
