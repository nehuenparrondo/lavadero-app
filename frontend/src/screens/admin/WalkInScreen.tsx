import { Notice } from '../../components/molecules/Notice';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { Screen } from '../../components/organisms/Screen';
import { WalkInVehicle } from '../../components/organisms/WalkInVehicle';
import { WalkInServices } from '../../components/organisms/WalkInServices';
import { WalkInConfirmation } from '../../components/organisms/WalkInConfirmation';
import { useWalkIn } from '../../hooks/useWalkIn';

/** Registro rápido para autos presentes, sin alta previa en cuentas ni garaje.
 * @returns Formulario administrativo y confirmación persistida.
 */
export function WalkInScreen() {
  const m = useWalkIn();
  return (
    <Screen onRefresh={m.refresh} onRevalidate={m.revalidate}>
      <SectionHeader
        title="Auto sin turno"
        subtitle="Anotá la llegada en pocos pasos. No hace falta que el vehículo esté en el garaje."
      />
      <Notice error={m.action.error || m.error} />
      {!m.result && (
        <>
          <WalkInVehicle m={m} />
          <WalkInServices m={m} />
        </>
      )}
      <WalkInConfirmation m={m} />
    </Screen>
  );
}
