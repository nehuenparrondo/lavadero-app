# Catálogo de componentes Atomic Design

Cada componente tiene una responsabilidad y recibe datos/callbacks tipados. Los ejemplos usan variables del tipo indicado y se componen dentro de una pantalla o componente. Las propiedades nativas heredadas de React Native conservan su contrato original.

## atoms

### Avatar

Foto opcional o iniciales del perfil, sin datos de otros clientes.

[Fuente](../src/components/atoms/Avatar.tsx)

Tipo del parámetro:

```ts
{ name: string; url?: string | null }
```

| Prop | Obligatoria | Tipo             |
| ---- | ----------- | ---------------- |
| name | Sí          | `string`         |
| url  | No          | `string \| null` |

Uso:

```tsx
<Avatar name={name} />
```

### Badge

Etiqueta compacta con tono semántico.

[Fuente](../src/components/atoms/Badge.tsx)

Tipo del parámetro:

```ts
{
  label: string;
  tone?: 'primary' | 'success' | 'danger' | 'warning';
}
```

| Prop  | Obligatoria | Tipo                                              |
| ----- | ----------- | ------------------------------------------------- |
| label | Sí          | `string`                                          |
| tone  | No          | `'primary' \| 'success' \| 'danger' \| 'warning'` |

Uso:

```tsx
<Badge label="Guardar" />
```

### Button

Acción con estado de carga y superficie del tema.

[Fuente](../src/components/atoms/Button.tsx)

Tipo del parámetro:

```ts
ButtonProps;
```

| Prop     | Obligatoria | Tipo                                              |
| -------- | ----------- | ------------------------------------------------- |
| label    | Sí          | `string`                                          |
| onPress  | Sí          | `() => void`                                      |
| disabled | No          | `boolean`                                         |
| loading  | No          | `boolean`                                         |
| variant  | No          | `'primary' \| 'secondary' \| 'danger' \| 'quiet'` |

Uso:

```tsx
<Button label="Guardar" onPress={handleAction} />
```

### Icon

Símbolo decorativo; el control que lo contiene aporta la etiqueta accesible.

[Fuente](../src/components/atoms/Icon.tsx)

Tipo del parámetro:

```ts
{
  symbol: string;
  color?: TextStyle['color'];
  size?: number;
}
```

| Prop   | Obligatoria | Tipo                 |
| ------ | ----------- | -------------------- |
| symbol | Sí          | `string`             |
| color  | No          | `TextStyle['color']` |
| size   | No          | `number`             |

Uso:

```tsx
<Icon symbol={symbol} />
```

### Input

Entrada controlada accesible, con tema y altura táctil suficiente.

[Fuente](../src/components/atoms/Input.tsx)

Tipo del parámetro:

```ts
TextInputProps;
```

Uso:

```tsx
<Input />
```

### Spinner

Indicador de espera con color semántico y descripción accesible.

[Fuente](../src/components/atoms/Spinner.tsx)

Tipo del parámetro:

```ts
{ color?: string; label?: string }
```

| Prop  | Obligatoria | Tipo     |
| ----- | ----------- | -------- |
| color | No          | `string` |
| label | No          | `string` |

Uso:

```tsx
<Spinner />
```

### Text

Texto con color semántico y tamaño consistente.

[Fuente](../src/components/atoms/Text.tsx)

Tipo del parámetro:

```ts
TextProps;
```

Uso:

```tsx
<Text>Texto del lavadero</Text>
```

## molecules

### AvailableSlots

Horarios ya validados por el servidor y estado vacío cuando la fecha está completa.

[Fuente](../src/components/molecules/AvailableSlots.tsx)

Tipo del parámetro:

```ts
{
  quote: Availability;
  value: string;
  onChange: (value: string) => void;
}
```

| Prop     | Obligatoria | Tipo                      |
| -------- | ----------- | ------------------------- |
| quote    | Sí          | `Availability`            |
| value    | Sí          | `string`                  |
| onChange | Sí          | `(value: string) => void` |

Uso:

```tsx
<AvailableSlots quote={quote} value={value} onChange={handleAction} />
```

### Card

Superficie reutilizable de lectura y formularios.

[Fuente](../src/components/molecules/Card.tsx)

Tipo del parámetro:

```ts
PropsWithChildren;
```

Uso:

```tsx
<Card />
```

### ChoiceButton

Opción táctil con estado seleccionado accesible y contraste del tema.

[Fuente](../src/components/molecules/ChoiceButton.tsx)

Tipo del parámetro:

```ts
{
  option: Choice;
  selected: boolean;
  onPress: () => void;
}
```

| Prop     | Obligatoria | Tipo         |
| -------- | ----------- | ------------ |
| option   | Sí          | `Choice`     |
| selected | Sí          | `boolean`    |
| onPress  | Sí          | `() => void` |

Uso:

```tsx
<ChoiceButton option={option} selected={selected} onPress={handleAction} />
```

### ChoiceGroup

Selector simple o múltiple; delega apariencia y transformación en piezas independientes.

[Fuente](../src/components/molecules/ChoiceGroup.tsx)

Tipo del parámetro:

```ts
{
  options: Choice[];
  value: string;
  onChange: (value: string) => void;
  multiple?: boolean;
}
```

| Prop     | Obligatoria | Tipo                      |
| -------- | ----------- | ------------------------- |
| options  | Sí          | `Choice[]`                |
| value    | Sí          | `string`                  |
| onChange | Sí          | `(value: string) => void` |
| multiple | No          | `boolean`                 |

Uso:

```tsx
<ChoiceGroup options={options} value={value} onChange={handleAction} />
```

### ConnectionStatus

Estado real de red.

[Fuente](../src/components/molecules/ConnectionStatus.tsx)

Tipo del parámetro:

```ts
{
  state: HealthState;
  onRetry: () => void;
}
```

| Prop    | Obligatoria | Tipo          |
| ------- | ----------- | ------------- |
| state   | Sí          | `HealthState` |
| onRetry | Sí          | `() => void`  |

Uso:

```tsx
<ConnectionStatus state={state} onRetry={handleAction} />
```

### ContractServiceLines

Servicios históricos; solo muestra importes que el servidor incluyó en la proyección del rol.

[Fuente](../src/components/molecules/ContractServiceLines.tsx)

Tipo del parámetro:

```ts
{
  items: NonNullable<Appointment['services']>;
  showDuration?: boolean;
}
```

| Prop         | Obligatoria | Tipo                                   |
| ------------ | ----------- | -------------------------------------- |
| items        | Sí          | `NonNullable<Appointment['services']>` |
| showDuration | No          | `boolean`                              |

Uso:

```tsx
<ContractServiceLines items={items} />
```

### ControlledField

Adapta un campo RHF a la molécula de entrada, incluyendo errores y blur.

[Fuente](../src/components/molecules/ControlledField.tsx)

Tipo del parámetro:

```ts
{
  field: FormFieldDefinition;
  control: Control<Record<string, string>>;
}
```

| Prop    | Obligatoria | Tipo                              |
| ------- | ----------- | --------------------------------- |
| field   | Sí          | `FormFieldDefinition`             |
| control | Sí          | `Control<Record<string, string>>` |

Uso:

```tsx
<ControlledField field={field} control={control} />
```

### EmptyState

Lista vacía con una explicación específica del recurso.

[Fuente](../src/components/molecules/EmptyState.tsx)

Tipo del parámetro:

```ts
{ title: string; detail?: string }
```

| Prop   | Obligatoria | Tipo     |
| ------ | ----------- | -------- |
| title  | Sí          | `string` |
| detail | No          | `string` |

Uso:

```tsx
<EmptyState title="Guardar" />
```

### FieldInput

Ajusta teclado y privacidad según el tipo semántico del campo.

[Fuente](../src/components/molecules/FieldInput.tsx)

Tipo del parámetro:

```ts
{
  field: FormFieldDefinition;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (() => void) | undefined;
}
```

| Prop     | Obligatoria | Tipo                        |
| -------- | ----------- | --------------------------- |
| field    | Sí          | `FormFieldDefinition`       |
| value    | Sí          | `string`                    |
| onChange | Sí          | `(value: string) => void`   |
| onBlur   | No          | `(() => void) \| undefined` |

Uso:

```tsx
<FieldInput field={field} value={value} onChange={handleAction} />
```

### FormField

Label, entrada y error, con selectors legibles para campos enumerados.

[Fuente](../src/components/molecules/FormField.tsx)

Tipo del parámetro:

```ts
{
  field: FormFieldDefinition;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string | undefined;
}
```

| Prop     | Obligatoria | Tipo                      |
| -------- | ----------- | ------------------------- |
| field    | Sí          | `FormFieldDefinition`     |
| value    | Sí          | `string`                  |
| onChange | Sí          | `(value: string) => void` |
| onBlur   | No          | `() => void`              |
| error    | No          | `string \| undefined`     |

Uso:

```tsx
<FormField field={field} value={value} onChange={handleAction} />
```

### LoadingState

Estado visible mientras se verifica sesión o se carga una lista.

[Fuente](../src/components/molecules/LoadingState.tsx)

Tipo del parámetro:

```ts
{ label?: string }
```

| Prop  | Obligatoria | Tipo     |
| ----- | ----------- | -------- |
| label | No          | `string` |

Uso:

```tsx
<LoadingState />
```

### Notice

Mensaje de error/éxito anunciado a lectores de pantalla.

[Fuente](../src/components/molecules/Notice.tsx)

Tipo del parámetro:

```ts
{
  error?: string | undefined;
  message?: string | undefined;
  onRetry?: () => void;
}
```

| Prop    | Obligatoria | Tipo                  |
| ------- | ----------- | --------------------- |
| error   | No          | `string \| undefined` |
| message | No          | `string \| undefined` |
| onRetry | No          | `() => void`          |

Uso:

```tsx
<Notice />
```

### OpeningHoursCard

Muestra el horario confirmado y el estado real de conexión.

[Fuente](../src/components/molecules/OpeningHoursCard.tsx)

Tipo del parámetro:

```ts
{
  state: HealthState;
  onRetry: () => void;
}
```

| Prop    | Obligatoria | Tipo          |
| ------- | ----------- | ------------- |
| state   | Sí          | `HealthState` |
| onRetry | Sí          | `() => void`  |

Uso:

```tsx
<OpeningHoursCard state={state} onRetry={handleAction} />
```

### Pagination

Navegación de listas grandes sin perder búsqueda y filtros.

[Fuente](../src/components/molecules/Pagination.tsx)

Tipo del parámetro:

```ts
{
  page: number;
  total: number;
  limit: number;
  onChange: (page: number) => void;
}
```

| Prop     | Obligatoria | Tipo                     |
| -------- | ----------- | ------------------------ |
| page     | Sí          | `number`                 |
| total    | Sí          | `number`                 |
| limit    | Sí          | `number`                 |
| onChange | Sí          | `(page: number) => void` |

Uso:

```tsx
<Pagination page={page} total={total} limit={limit} onChange={handleAction} />
```

### QuotedTotal

Total y duración estimados exactamente como los devuelve la cotización del servidor.

[Fuente](../src/components/molecules/QuotedTotal.tsx)

Tipo del parámetro:

```ts
{
  quote: Availability;
}
```

| Prop  | Obligatoria | Tipo           |
| ----- | ----------- | -------------- |
| quote | Sí          | `Availability` |

Uso:

```tsx
<QuotedTotal quote={quote} />
```

### SearchBar

Búsqueda controlada, con etiqueta accesible y teclado de búsqueda.

[Fuente](../src/components/molecules/SearchBar.tsx)

Tipo del parámetro:

```ts
{
  label: string;
  value: string;
  onChange: (value: string) => void;
}
```

| Prop     | Obligatoria | Tipo                      |
| -------- | ----------- | ------------------------- |
| label    | Sí          | `string`                  |
| value    | Sí          | `string`                  |
| onChange | Sí          | `(value: string) => void` |

Uso:

```tsx
<SearchBar label="Guardar" value={value} onChange={handleAction} />
```

### SectionHeader

Título y descripción de una sección con jerarquía tipográfica.

[Fuente](../src/components/molecules/SectionHeader.tsx)

Tipo del parámetro:

```ts
{ title: string; subtitle?: string }
```

| Prop     | Obligatoria | Tipo     |
| -------- | ----------- | -------- |
| title    | Sí          | `string` |
| subtitle | No          | `string` |

Uso:

```tsx
<SectionHeader title="Guardar" />
```

### ServiceCard

Servicio con descripción, duración y tarifa del tipo seleccionado.

[Fuente](../src/components/molecules/ServiceCard.tsx)

Tipo del parámetro:

```ts
{
  service: Service;
  typeId: string;
  onEdit?: () => void;
  onPrice?: () => void;
  onDelete?: () => void;
}
```

| Prop     | Obligatoria | Tipo         |
| -------- | ----------- | ------------ |
| service  | Sí          | `Service`    |
| typeId   | Sí          | `string`     |
| onEdit   | No          | `() => void` |
| onPrice  | No          | `() => void` |
| onDelete | No          | `() => void` |

Uso:

```tsx
<ServiceCard service={service} typeId={typeId} />
```

### StatusBadge

Estado de turno con color y texto, sin depender solamente del color.

[Fuente](../src/components/molecules/StatusBadge.tsx)

Tipo del parámetro:

```ts
{
  status: AppointmentStatus;
}
```

| Prop   | Obligatoria | Tipo                |
| ------ | ----------- | ------------------- |
| status | Sí          | `AppointmentStatus` |

Uso:

```tsx
<StatusBadge status={status} />
```

### VehicleTypeItem

Categoría y acciones del catálogo; una baja lógica conserva el nombre visible en el historial.

[Fuente](../src/components/molecules/VehicleTypeItem.tsx)

Tipo del parámetro:

```ts
{
  type: VehicleType;
  onEdit: () => void;
  onDeactivate: () => void;
}
```

| Prop         | Obligatoria | Tipo          |
| ------------ | ----------- | ------------- |
| type         | Sí          | `VehicleType` |
| onEdit       | Sí          | `() => void`  |
| onDeactivate | Sí          | `() => void`  |

Uso:

```tsx
<VehicleTypeItem type={type} onEdit={handleAction} onDeactivate={handleAction} />
```

## organisms

### AdminMenu

Menú de administración; cierra el diálogo antes de cambiar de sección.

[Fuente](../src/components/organisms/AdminMenu.tsx)

Tipo del parámetro:

```ts
{ open: boolean; onClose: () => void }
```

| Prop    | Obligatoria | Tipo         |
| ------- | ----------- | ------------ |
| open    | Sí          | `boolean`    |
| onClose | Sí          | `() => void` |

Uso:

```tsx
<AdminMenu open={open} onClose={handleAction} />
```

### AppointmentActions

Acciones del rol visible; el servidor vuelve a validarlas con propiedad/asignación.

[Fuente](../src/components/organisms/AppointmentActions.tsx)

Tipo del parámetro:

```ts
{
  manager: ReturnType<typeof useAppointmentDetail>;
}
```

| Prop    | Obligatoria | Tipo                                      |
| ------- | ----------- | ----------------------------------------- |
| manager | Sí          | `ReturnType<typeof useAppointmentDetail>` |

Uso:

```tsx
<AppointmentActions manager={manager} />
```

### AppointmentAssignment

Presenta appointment assignment con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/AppointmentAssignment.tsx)

Tipo del parámetro:

```ts
{
  m: ReturnType<typeof useAppointmentDetail>;
}
```

| Prop | Obligatoria | Tipo                                      |
| ---- | ----------- | ----------------------------------------- |
| m    | Sí          | `ReturnType<typeof useAppointmentDetail>` |

Uso:

```tsx
<AppointmentAssignment m={manager} />
```

### AppointmentCancellationDialog

Presenta appointment cancellation dialog con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/AppointmentCancellationDialog.tsx)

Tipo del parámetro:

```ts
{
  m: ReturnType<typeof useAppointmentDetail>;
}
```

| Prop | Obligatoria | Tipo                                      |
| ---- | ----------- | ----------------------------------------- |
| m    | Sí          | `ReturnType<typeof useAppointmentDetail>` |

Uso:

```tsx
<AppointmentCancellationDialog m={manager} />
```

### AppointmentCard

Resumen operativo de reserva; la API controla qué importes/datos recibe cada rol.

[Fuente](../src/components/organisms/AppointmentCard.tsx)

Tipo del parámetro:

```ts
{
  appointment: Appointment;
  onPress: () => void;
}
```

| Prop        | Obligatoria | Tipo          |
| ----------- | ----------- | ------------- |
| appointment | Sí          | `Appointment` |
| onPress     | Sí          | `() => void`  |

Uso:

```tsx
<AppointmentCard appointment={appointment} onPress={handleAction} />
```

### AppointmentClientFilter

Presenta appointment client filter con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/AppointmentClientFilter.tsx)

Tipo del parámetro:

```ts
{
  m: ReturnType<typeof useAppointments>;
}
```

| Prop | Obligatoria | Tipo                                 |
| ---- | ----------- | ------------------------------------ |
| m    | Sí          | `ReturnType<typeof useAppointments>` |

Uso:

```tsx
<AppointmentClientFilter m={manager} />
```

### AppointmentDialogs

Confirmaciones, cobro y comprobante histórico sin exponer datos de otros turnos.

[Fuente](../src/components/organisms/AppointmentDialogs.tsx)

Tipo del parámetro:

```ts
{
  manager: ReturnType<typeof useAppointmentDetail>;
}
```

| Prop    | Obligatoria | Tipo                                      |
| ------- | ----------- | ----------------------------------------- |
| manager | Sí          | `ReturnType<typeof useAppointmentDetail>` |

Uso:

```tsx
<AppointmentDialogs manager={manager} />
```

### AppointmentEmployeeFilter

Presenta appointment employee filter con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/AppointmentEmployeeFilter.tsx)

Tipo del parámetro:

```ts
{
  m: ReturnType<typeof useAppointments>;
}
```

| Prop | Obligatoria | Tipo                                 |
| ---- | ----------- | ------------------------------------ |
| m    | Sí          | `ReturnType<typeof useAppointments>` |

Uso:

```tsx
<AppointmentEmployeeFilter m={manager} />
```

### AppointmentFilters

Filtros por experiencia; cliente no puede seleccionar titulares ajenos.

[Fuente](../src/components/organisms/AppointmentFilters.tsx)

Tipo del parámetro:

```ts
{
  manager: ReturnType<typeof useAppointments>;
}
```

| Prop    | Obligatoria | Tipo                                 |
| ------- | ----------- | ------------------------------------ |
| manager | Sí          | `ReturnType<typeof useAppointments>` |

Uso:

```tsx
<AppointmentFilters manager={manager} />
```

### AppointmentInformation

Presenta appointment information con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/AppointmentInformation.tsx)

Tipo del parámetro:

```ts
{
  m: ReturnType<typeof useAppointmentDetail>;
}
```

| Prop | Obligatoria | Tipo                                      |
| ---- | ----------- | ----------------------------------------- |
| m    | Sí          | `ReturnType<typeof useAppointmentDetail>` |

Uso:

```tsx
<AppointmentInformation m={manager} />
```

### AppointmentList

Presenta appointment list con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/AppointmentList.tsx)

Tipo del parámetro:

```ts
{
  m: ReturnType<typeof useAppointments>;
}
```

| Prop | Obligatoria | Tipo                                 |
| ---- | ----------- | ------------------------------------ |
| m    | Sí          | `ReturnType<typeof useAppointments>` |

Uso:

```tsx
<AppointmentList m={manager} />
```

### AppointmentNotes

Presenta appointment notes con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/AppointmentNotes.tsx)

Tipo del parámetro:

```ts
{
  m: ReturnType<typeof useAppointmentDetail>;
}
```

| Prop | Obligatoria | Tipo                                      |
| ---- | ----------- | ----------------------------------------- |
| m    | Sí          | `ReturnType<typeof useAppointmentDetail>` |

Uso:

```tsx
<AppointmentNotes m={manager} />
```

### AppointmentPaymentAction

Presenta appointment payment action con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/AppointmentPaymentAction.tsx)

Tipo del parámetro:

```ts
{
  m: ReturnType<typeof useAppointmentDetail>;
}
```

| Prop | Obligatoria | Tipo                                      |
| ---- | ----------- | ----------------------------------------- |
| m    | Sí          | `ReturnType<typeof useAppointmentDetail>` |

Uso:

```tsx
<AppointmentPaymentAction m={manager} />
```

### AppointmentPaymentDialog

Presenta appointment payment dialog con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/AppointmentPaymentDialog.tsx)

Tipo del parámetro:

```ts
{
  m: ReturnType<typeof useAppointmentDetail>;
}
```

| Prop | Obligatoria | Tipo                                      |
| ---- | ----------- | ----------------------------------------- |
| m    | Sí          | `ReturnType<typeof useAppointmentDetail>` |

Uso:

```tsx
<AppointmentPaymentDialog m={manager} />
```

### AppointmentPayments

Presenta appointment payments con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/AppointmentPayments.tsx)

Tipo del parámetro:

```ts
{
  m: ReturnType<typeof useAppointmentDetail>;
}
```

| Prop | Obligatoria | Tipo                                      |
| ---- | ----------- | ----------------------------------------- |
| m    | Sí          | `ReturnType<typeof useAppointmentDetail>` |

Uso:

```tsx
<AppointmentPayments m={manager} />
```

### AppointmentReceiptDialog

Presenta appointment receipt dialog con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/AppointmentReceiptDialog.tsx)

Tipo del parámetro:

```ts
{
  m: ReturnType<typeof useAppointmentDetail>;
}
```

| Prop | Obligatoria | Tipo                                      |
| ---- | ----------- | ----------------------------------------- |
| m    | Sí          | `ReturnType<typeof useAppointmentDetail>` |

Uso:

```tsx
<AppointmentReceiptDialog m={manager} />
```

### AppointmentStatusEditor

Presenta appointment status editor con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/AppointmentStatusEditor.tsx)

Tipo del parámetro:

```ts
{
  m: ReturnType<typeof useAppointmentDetail>;
}
```

| Prop | Obligatoria | Tipo                                      |
| ---- | ----------- | ----------------------------------------- |
| m    | Sí          | `ReturnType<typeof useAppointmentDetail>` |

Uso:

```tsx
<AppointmentStatusEditor m={manager} />
```

### AppointmentStatusFilter

Presenta appointment status filter con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/AppointmentStatusFilter.tsx)

Tipo del parámetro:

```ts
{
  m: ReturnType<typeof useAppointments>;
}
```

| Prop | Obligatoria | Tipo                                 |
| ---- | ----------- | ------------------------------------ |
| m    | Sí          | `ReturnType<typeof useAppointments>` |

Uso:

```tsx
<AppointmentStatusFilter m={manager} />
```

### BookingClientField

Presenta booking client field con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/BookingClientField.tsx)

Tipo del parámetro:

```ts
{
  b: ReturnType<typeof useBooking>;
}
```

| Prop | Obligatoria | Tipo                            |
| ---- | ----------- | ------------------------------- |
| b    | Sí          | `ReturnType<typeof useBooking>` |

Uso:

```tsx
<BookingClientField b={b} />
```

### BookingInvitation

Presenta booking invitation con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/BookingInvitation.tsx)

No recibe propiedades.

Uso:

```tsx
<BookingInvitation />
```

### BookingServicesField

Presenta booking services field con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/BookingServicesField.tsx)

Tipo del parámetro:

```ts
{
  b: ReturnType<typeof useBooking>;
}
```

| Prop | Obligatoria | Tipo                            |
| ---- | ----------- | ------------------------------- |
| b    | Sí          | `ReturnType<typeof useBooking>` |

Uso:

```tsx
<BookingServicesField b={b} />
```

### BookingVehicleField

Presenta booking vehicle field con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/BookingVehicleField.tsx)

Tipo del parámetro:

```ts
{
  b: ReturnType<typeof useBooking>;
}
```

| Prop | Obligatoria | Tipo                            |
| ---- | ----------- | ------------------------------- |
| b    | Sí          | `ReturnType<typeof useBooking>` |

Uso:

```tsx
<BookingVehicleField b={b} />
```

### CollectionState

Estados consistentes de lista: carga inicial, error recuperable y vacío.

[Fuente](../src/components/organisms/CollectionState.tsx)

Tipo del parámetro:

```ts
PropsWithChildren<{
  loading: boolean;
  error: string;
  empty: boolean;
  emptyTitle: string;
  onRetry: () => void;
}>;
```

| Prop       | Obligatoria | Tipo         |
| ---------- | ----------- | ------------ |
| loading    | Sí          | `boolean`    |
| error      | Sí          | `string`     |
| empty      | Sí          | `boolean`    |
| emptyTitle | Sí          | `string`     |
| onRetry    | Sí          | `() => void` |

Uso:

```tsx
<CollectionState
  loading={loading}
  error={error}
  empty={empty}
  emptyTitle={emptyTitle}
  onRetry={handleAction}
/>
```

### DashboardIndicators

Presenta dashboard indicators con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/DashboardIndicators.tsx)

Tipo del parámetro:

```ts
{
  report: ReturnType < typeof useDashboard > ['report'];
  pending: ReturnType < typeof useDashboard > ['pending'];
}
```

| Prop    | Obligatoria | Tipo                                         |
| ------- | ----------- | -------------------------------------------- |
| report  | Sí          | `ReturnType<typeof useDashboard>['report']`  |
| pending | Sí          | `ReturnType<typeof useDashboard>['pending']` |

Uso:

```tsx
<DashboardIndicators report={report} pending={pending} />
```

### EmployeePerformance

Presenta employee performance con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/EmployeePerformance.tsx)

Tipo del parámetro:

```ts
{
  report: Report;
}
```

| Prop   | Obligatoria | Tipo     |
| ------ | ----------- | -------- |
| report | Sí          | `Report` |

Uso:

```tsx
<EmployeePerformance report={report} />
```

### EmployeeWorkAction

Presenta employee work action con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/EmployeeWorkAction.tsx)

Tipo del parámetro:

```ts
{
  m: ReturnType<typeof useAppointmentDetail>;
}
```

| Prop | Obligatoria | Tipo                                      |
| ---- | ----------- | ----------------------------------------- |
| m    | Sí          | `ReturnType<typeof useAppointmentDetail>` |

Uso:

```tsx
<EmployeeWorkAction m={manager} />
```

### EntityForm

Formulario RHF + Zod con errores por campo y callback sin HTTP propio.

[Fuente](../src/components/organisms/EntityForm.tsx)

Tipo del parámetro:

```ts
{
  fields: FormFieldDefinition[];
  initialValues?: Record<string, string>;
  onSubmit: (values: Record<string, string>) => Promise<void>;
  busy?: boolean;
  submitLabel?: string;
}
```

| Prop          | Obligatoria | Tipo                                                |
| ------------- | ----------- | --------------------------------------------------- |
| fields        | Sí          | `FormFieldDefinition[]`                             |
| initialValues | No          | `Record<string, string>`                            |
| onSubmit      | Sí          | `(values: Record<string, string>) => Promise<void>` |
| busy          | No          | `boolean`                                           |
| submitLabel   | No          | `string`                                            |

Uso:

```tsx
<EntityForm fields={fields} onSubmit={handleAction} />
```

### ModalPanel

Panel accesible para formularios y confirmaciones sin ventanas nativas bloqueantes.

[Fuente](../src/components/organisms/ModalPanel.tsx)

Tipo del parámetro:

```ts
PropsWithChildren<{ visible: boolean; title: string; onClose: () => void }>;
```

| Prop    | Obligatoria | Tipo         |
| ------- | ----------- | ------------ |
| visible | Sí          | `boolean`    |
| title   | Sí          | `string`     |
| onClose | Sí          | `() => void` |

Uso:

```tsx
<ModalPanel visible={true} title="Guardar" onClose={handleAction} />
```

### OAuthLinkForm

Confirma la contraseña local una sola vez antes de unir ambas formas de ingreso.

[Fuente](../src/components/organisms/OAuthLinkForm.tsx)

Tipo del parámetro:

```ts
{
  onSubmit: (v: Record<string, string>) => Promise<void>;
  busy: boolean;
  error: string;
}
```

| Prop     | Obligatoria | Tipo                                           |
| -------- | ----------- | ---------------------------------------------- |
| onSubmit | Sí          | `(v: Record<string, string>) => Promise<void>` |
| busy     | Sí          | `boolean`                                      |
| error    | Sí          | `string`                                       |

Uso:

```tsx
<OAuthLinkForm onSubmit={handleAction} busy={busy} error={error} />
```

### PendingAppointments

Solicitudes pendientes del tablero y acceso a la gestión completa.

[Fuente](../src/components/organisms/PendingAppointments.tsx)

Tipo del parámetro:

```ts
{
  items: Appointment[];
  loading: boolean;
}
```

| Prop    | Obligatoria | Tipo            |
| ------- | ----------- | --------------- |
| items   | Sí          | `Appointment[]` |
| loading | Sí          | `boolean`       |

Uso:

```tsx
<PendingAppointments items={items} loading={loading} />
```

### PopularServices

Presenta popular services con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/PopularServices.tsx)

Tipo del parámetro:

```ts
{
  report: Report;
}
```

| Prop   | Obligatoria | Tipo     |
| ------ | ----------- | -------- |
| report | Sí          | `Report` |

Uso:

```tsx
<PopularServices report={report} />
```

### ProfileIdentity

Presenta profile identity con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/ProfileIdentity.tsx)

Tipo del parámetro:

```ts
{
  p: ReturnType<typeof useProfile>;
}
```

| Prop | Obligatoria | Tipo                            |
| ---- | ----------- | ------------------------------- |
| p    | Sí          | `ReturnType<typeof useProfile>` |

Uso:

```tsx
<ProfileIdentity p={p} />
```

### ProfilePasswordForm

Presenta profile password form con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/ProfilePasswordForm.tsx)

Tipo del parámetro:

```ts
{
  p: ReturnType<typeof useProfile>;
}
```

| Prop | Obligatoria | Tipo                            |
| ---- | ----------- | ------------------------------- |
| p    | Sí          | `ReturnType<typeof useProfile>` |

Uso:

```tsx
<ProfilePasswordForm p={p} />
```

### ReportSummary

Indicadores y barras de ingresos diarios a partir de datos reales.

[Fuente](../src/components/organisms/ReportSummary.tsx)

Tipo del parámetro:

```ts
{
  report: Report;
}
```

| Prop   | Obligatoria | Tipo     |
| ------ | ----------- | -------- |
| report | Sí          | `Report` |

Uso:

```tsx
<ReportSummary report={report} />
```

### RevenueByDay

Presenta revenue by day con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/RevenueByDay.tsx)

Tipo del parámetro:

```ts
{
  report: Report;
}
```

| Prop   | Obligatoria | Tipo     |
| ------ | ----------- | -------- |
| report | Sí          | `Report` |

Uso:

```tsx
<RevenueByDay report={report} />
```

### ScheduleSelector

Horarios y total provienen del backend; no calcula precios en el cliente.

[Fuente](../src/components/organisms/ScheduleSelector.tsx)

Tipo del parámetro:

```ts
{
  booking: ReturnType<typeof useBooking>;
}
```

| Prop    | Obligatoria | Tipo                            |
| ------- | ----------- | ------------------------------- |
| booking | Sí          | `ReturnType<typeof useBooking>` |

Uso:

```tsx
<ScheduleSelector booking={booking} />
```

### Screen

Layout móvil desplazable, ancho legible en tablet y pull-to-refresh opcional.

[Fuente](../src/components/organisms/Screen.tsx)

Tipo del parámetro:

```ts
{
  children: PropsWithChildren['children'];
  refreshing?: boolean;
  onRefresh?: () => void;
}
```

| Prop       | Obligatoria | Tipo                            |
| ---------- | ----------- | ------------------------------- |
| children   | Sí          | `PropsWithChildren['children']` |
| refreshing | No          | `boolean`                       |
| onRefresh  | No          | `() => void`                    |

Uso:

```tsx
<Screen />
```

### ServiceCollection

Presenta service collection con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/ServiceCollection.tsx)

Tipo del parámetro:

```ts
{
  c: ReturnType<typeof useCatalog>;
  admin: boolean;
  typeId: string;
}
```

| Prop   | Obligatoria | Tipo                            |
| ------ | ----------- | ------------------------------- |
| c      | Sí          | `ReturnType<typeof useCatalog>` |
| admin  | Sí          | `boolean`                       |
| typeId | Sí          | `string`                        |

Uso:

```tsx
<ServiceCollection c={c} admin={admin} typeId={typeId} />
```

### ServiceDeleteDialog

Presenta service delete dialog con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/ServiceDeleteDialog.tsx)

Tipo del parámetro:

```ts
{
  c: ReturnType<typeof useCatalog>;
}
```

| Prop | Obligatoria | Tipo                            |
| ---- | ----------- | ------------------------------- |
| c    | Sí          | `ReturnType<typeof useCatalog>` |

Uso:

```tsx
<ServiceDeleteDialog c={c} />
```

### ServiceEditDialog

Presenta service edit dialog con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/ServiceEditDialog.tsx)

Tipo del parámetro:

```ts
{
  c: ReturnType<typeof useCatalog>;
}
```

| Prop | Obligatoria | Tipo                            |
| ---- | ----------- | ------------------------------- |
| c    | Sí          | `ReturnType<typeof useCatalog>` |

Uso:

```tsx
<ServiceEditDialog c={c} />
```

### ServiceEditors

Edición de servicio, tarifa por tipo y confirmación de baja lógica.

[Fuente](../src/components/organisms/ServiceEditors.tsx)

Tipo del parámetro:

```ts
{
  catalog: ReturnType<typeof useCatalog>;
}
```

| Prop    | Obligatoria | Tipo                            |
| ------- | ----------- | ------------------------------- |
| catalog | Sí          | `ReturnType<typeof useCatalog>` |

Uso:

```tsx
<ServiceEditors catalog={manager} />
```

### ServicePriceDialog

Presenta service price dialog con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/ServicePriceDialog.tsx)

Tipo del parámetro:

```ts
{
  c: ReturnType<typeof useCatalog>;
}
```

| Prop | Obligatoria | Tipo                            |
| ---- | ----------- | ------------------------------- |
| c    | Sí          | `ReturnType<typeof useCatalog>` |

Uso:

```tsx
<ServicePriceDialog c={c} />
```

### SignInForm

Presenta sign in form con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/SignInForm.tsx)

Tipo del parámetro:

```ts
{
  login: ReturnType<typeof useSignIn>;
}
```

| Prop  | Obligatoria | Tipo                           |
| ----- | ----------- | ------------------------------ |
| login | Sí          | `ReturnType<typeof useSignIn>` |

Uso:

```tsx
<SignInForm login={login} />
```

### SocialLoginButton

Botón OAuth de un proveedor configurado, con su propia solicitud PKCE.

[Fuente](../src/components/organisms/SocialLoginButton.tsx)

Tipo del parámetro:

```ts
{ provider: keyof typeof labels }
```

| Prop     | Obligatoria | Tipo                  |
| -------- | ----------- | --------------------- |
| provider | Sí          | `keyof typeof labels` |

Uso:

```tsx
<SocialLoginButton provider={provider} />
```

### SocialLogins

Muestra proveedores y deshabilita los que el negocio todavía no configuró.

[Fuente](../src/components/organisms/SocialLogins.tsx)

No recibe propiedades.

Uso:

```tsx
<SocialLogins />
```

### ThemeSelector

Presenta theme selector con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/ThemeSelector.tsx)

Tipo del parámetro:

```ts
{
  theme: ReturnType<typeof useTheme>;
}
```

| Prop  | Obligatoria | Tipo                          |
| ----- | ----------- | ----------------------------- |
| theme | Sí          | `ReturnType<typeof useTheme>` |

Uso:

```tsx
<ThemeSelector theme={theme} />
```

### UserCollection

Presenta user collection con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/UserCollection.tsx)

Tipo del parámetro:

```ts
{
  m: ReturnType<typeof useUsers>;
}
```

| Prop | Obligatoria | Tipo                          |
| ---- | ----------- | ----------------------------- |
| m    | Sí          | `ReturnType<typeof useUsers>` |

Uso:

```tsx
<UserCollection m={manager} />
```

### UserDeleteDialog

Presenta user delete dialog con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/UserDeleteDialog.tsx)

Tipo del parámetro:

```ts
{
  m: ReturnType<typeof useUsers>;
}
```

| Prop | Obligatoria | Tipo                          |
| ---- | ----------- | ----------------------------- |
| m    | Sí          | `ReturnType<typeof useUsers>` |

Uso:

```tsx
<UserDeleteDialog m={manager} />
```

### UserEditDialog

Presenta user edit dialog con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/UserEditDialog.tsx)

Tipo del parámetro:

```ts
{
  m: ReturnType<typeof useUsers>;
}
```

| Prop | Obligatoria | Tipo                          |
| ---- | ----------- | ----------------------------- |
| m    | Sí          | `ReturnType<typeof useUsers>` |

Uso:

```tsx
<UserEditDialog m={manager} />
```

### UserRoleFilter

Presenta user role filter con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/UserRoleFilter.tsx)

Tipo del parámetro:

```ts
{
  m: ReturnType<typeof useUsers>;
}
```

| Prop | Obligatoria | Tipo                          |
| ---- | ----------- | ----------------------------- |
| m    | Sí          | `ReturnType<typeof useUsers>` |

Uso:

```tsx
<UserRoleFilter m={manager} />
```

### UserTable

Usuarios como filas adaptables a tarjetas en teléfono.

[Fuente](../src/components/organisms/UserTable.tsx)

Tipo del parámetro:

```ts
{
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}
```

| Prop     | Obligatoria | Tipo                   |
| -------- | ----------- | ---------------------- |
| users    | Sí          | `User[]`               |
| onEdit   | Sí          | `(user: User) => void` |
| onDelete | Sí          | `(user: User) => void` |

Uso:

```tsx
<UserTable users={users} onEdit={handleAction} onDelete={handleAction} />
```

### VehicleCollection

Presenta vehicle collection con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/VehicleCollection.tsx)

Tipo del parámetro:

```ts
{
  m: ReturnType<typeof useVehicles>;
}
```

| Prop | Obligatoria | Tipo                             |
| ---- | ----------- | -------------------------------- |
| m    | Sí          | `ReturnType<typeof useVehicles>` |

Uso:

```tsx
<VehicleCollection m={manager} />
```

### VehicleDeleteDialog

Presenta vehicle delete dialog con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/VehicleDeleteDialog.tsx)

Tipo del parámetro:

```ts
{
  manager: ReturnType<typeof useVehicles>;
}
```

| Prop    | Obligatoria | Tipo                             |
| ------- | ----------- | -------------------------------- |
| manager | Sí          | `ReturnType<typeof useVehicles>` |

Uso:

```tsx
<VehicleDeleteDialog manager={manager} />
```

### VehicleEditDialog

Presenta vehicle edit dialog con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/VehicleEditDialog.tsx)

Tipo del parámetro:

```ts
{
  manager: ReturnType<typeof useVehicles>;
}
```

| Prop    | Obligatoria | Tipo                             |
| ------- | ----------- | -------------------------------- |
| manager | Sí          | `ReturnType<typeof useVehicles>` |

Uso:

```tsx
<VehicleEditDialog manager={manager} />
```

### VehicleEditor

Formularios y confirmación de baja con datos del vehículo seleccionado.

[Fuente](../src/components/organisms/VehicleEditor.tsx)

Tipo del parámetro:

```ts
{
  manager: ReturnType<typeof useVehicles>;
}
```

| Prop    | Obligatoria | Tipo                             |
| ------- | ----------- | -------------------------------- |
| manager | Sí          | `ReturnType<typeof useVehicles>` |

Uso:

```tsx
<VehicleEditor manager={manager} />
```

### VehicleTypeDialog

Presenta vehicle type dialog con datos y acciones recibidos de su hook.

[Fuente](../src/components/organisms/VehicleTypeDialog.tsx)

Tipo del parámetro:

```ts
{
  m: ReturnType<typeof useVehicleTypes>;
}
```

| Prop | Obligatoria | Tipo                                 |
| ---- | ----------- | ------------------------------------ |
| m    | Sí          | `ReturnType<typeof useVehicleTypes>` |

Uso:

```tsx
<VehicleTypeDialog m={manager} />
```

### VehicleTypeManager

Categorías registradas y formularios administrativos sin exponer SQL ni identificadores técnicos.

[Fuente](../src/components/organisms/VehicleTypeManager.tsx)

No recibe propiedades.

Uso:

```tsx
<VehicleTypeManager />
```

### WelcomePanel

Presentación inicial del producto.

[Fuente](../src/components/organisms/WelcomePanel.tsx)

Tipo del parámetro:

```ts
{ state: HealthState; onRetry: () => void }
```

| Prop    | Obligatoria | Tipo          |
| ------- | ----------- | ------------- |
| state   | Sí          | `HealthState` |
| onRetry | Sí          | `() => void`  |

Uso:

```tsx
<WelcomePanel state={state} onRetry={handleAction} />
```
