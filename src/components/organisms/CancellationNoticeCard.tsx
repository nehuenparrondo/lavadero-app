import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { CancellationNotice } from '../../types/cancellation';
import { Button } from '../atoms/Button';
import { Card } from '../molecules/Card';
import { CancellationNoticeMessage } from '../molecules/CancellationNoticeMessage';

/** Cancelación del equipo con contexto, motivo completo y dos acciones inequívocas.
 * @param props Aviso propio, estado ocupado y confirmación persistente de lectura.
 * @returns Tarjeta accesible; abrir el detalle no descarta el aviso.
 */
export function CancellationNoticeCard({
  notice,
  busy,
  onRead,
}: {
  notice: CancellationNotice;
  busy: boolean;
  onRead: () => void;
}) {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <Card style={{ borderColor: colors.danger, backgroundColor: colors.dangerSoft }}>
      <CancellationNoticeMessage notice={notice} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        <Button
          label="Ver turno"
          variant="secondary"
          onPress={() => router.push('/appointment/' + notice.id)}
        />
        <Button label="Entendido" disabled={busy} onPress={onRead} />
      </View>
    </Card>
  );
}
