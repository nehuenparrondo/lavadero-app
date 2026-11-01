# Catálogo de componentes Atomic Design

Cada componente tiene una responsabilidad y recibe datos/callbacks tipados. Los ejemplos usan variables del tipo indicado y se componen dentro de una pantalla o componente. Las propiedades nativas heredadas de React Native conservan su contrato original.

## atoms

### AppIcon

Ícono vectorial decorativo; la acción contenedora debe aportar su nombre accesible.

[Fuente](../src/components/atoms/AppIcon.tsx)

Tipo del parámetro:

```ts
{
  name: IconName;
  size?: number;
  color?: string;
}
```

| Prop  | Obligatoria | Tipo       |
| ----- | ----------- | ---------- |
| name  | Sí          | `IconName` |
| size  | No          | `number`   |
| color | No          | `string`   |

Uso:

```tsx
<AppIcon name={name} />
```

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

Acción de 48 puntos con texto, ícono opcional y estado ocupado accesible.

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
| icon     | No          | `IconName`                                        |

Uso:

```tsx
<Button label="Guardar" onPress={handleAction} />
```

### ButtonContent

Contenido visual del botón, independiente de Pressable y de su política de interacción.

[Fuente](../src/components/atoms/ButtonContent.tsx)

Tipo del parámetro:

```ts
{
  label: string;
  color: string;
  icon?: IconName | undefined;
  loading: boolean;
}
```

| Prop    | Obligatoria | Tipo                    |
| ------- | ----------- | ----------------------- |
| label   | Sí          | `string`                |
| color   | Sí          | `string`                |
| icon    | No          | `IconName \| undefined` |
| loading | Sí          | `boolean`               |

Uso:

```tsx
<ButtonContent label="Guardar" color={color} loading={loading} />
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

### AppointmentCardFooter

La ausencia de importe significa falta de permiso, nunca un total cero.

[Fuente](../src/components/molecules/AppointmentCardFooter.tsx)

Tipo del parámetro:

```ts
{
  appointment: Appointment;
}
```

| Prop        | Obligatoria | Tipo          |
| ----------- | ----------- | ------------- |
| appointment | Sí          | `Appointment` |

Uso:

```tsx
<AppointmentCardFooter appointment={appointment} />
```

### AppointmentVehicle

Datos operativos presentes en la proyección de todos los roles.

[Fuente](../src/components/molecules/AppointmentVehicle.tsx)

Tipo del parámetro:

```ts
{
  appointment: Appointment;
}
```

| Prop        | Obligatoria | Tipo          |
| ----------- | ----------- | ------------- |
| appointment | Sí          | `Appointment` |

Uso:

```tsx
<AppointmentVehicle appointment={appointment} />
```

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

### BrandLockup

Firma de marca compacta para acceso, menú y cabecera.

[Fuente](../src/components/molecules/BrandLockup.tsx)

Tipo del parámetro:

```ts
{ inverse?: boolean }
```

| Prop    | Obligatoria | Tipo      |
| ------- | ----------- | --------- |
| inverse | No          | `boolean` |

Uso:

```tsx
<BrandLockup />
```

### Card

Superficie neutra para agrupar información; el estilo permite componer grids sin duplicarla.

[Fuente](../src/components/molecules/Card.tsx)

Tipo del parámetro:

```ts
PropsWithChildren<{ style?: StyleProp<ViewStyle> }>;
```

| Prop  | Obligatoria | Tipo                   |
| ----- | ----------- | ---------------------- |
| style | No          | `StyleProp<ViewStyle>` |

Uso:

```tsx
<Card />
```

### CareGuide

Ayuda basada en funciones existentes, sin prometer servicios ni tiempos fijos.

[Fuente](../src/components/molecules/CareGuide.tsx)

No recibe propiedades.

Uso:

```tsx
<CareGuide />
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

Explica una colección vacía sin confundirla con carga o error de red.

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

### MetricTile

Indicador de solo lectura; recibe valores reales o un guion mientras no hay respuesta.

[Fuente](../src/components/molecules/MetricTile.tsx)

Tipo del parámetro:

```ts
{
  label: string;
  value: string;
  detail: string;
  icon: IconName;
}
```

| Prop   | Obligatoria | Tipo       |
| ------ | ----------- | ---------- |
| label  | Sí          | `string`   |
| value  | Sí          | `string`   |
| detail | Sí          | `string`   |
| icon   | Sí          | `IconName` |

Uso:

```tsx
<MetricTile label="Guardar" value={value} detail={detail} icon={icon} />
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

### OverviewColumns

Composición 2:1 apilada cuando no hay espacio suficiente para dos columnas.

[Fuente](../src/components/molecules/OverviewColumns.tsx)

Tipo del parámetro:

```ts
{
  primary: ReactNode;
  secondary: ReactNode;
}
```

| Prop      | Obligatoria | Tipo        |
| --------- | ----------- | ----------- |
| primary   | Sí          | `ReactNode` |
| secondary | Sí          | `ReactNode` |

Uso:

```tsx
<OverviewColumns primary={primary} secondary={secondary} />
```

### PageHeading

Portada con contexto y una acción principal, adaptable al ancho y a la escala de texto.

[Fuente](../src/components/molecules/PageHeading.tsx)

Tipo del parámetro:

```ts
{
  eyebrow: string;
  title: string;
  detail: string;
  action?: ReactNode;
}
```

| Prop    | Obligatoria | Tipo        |
| ------- | ----------- | ----------- |
| eyebrow | Sí          | `string`    |
| title   | Sí          | `string`    |
| detail  | Sí          | `string`    |
| action  | No          | `ReactNode` |

Uso:

```tsx
<PageHeading eyebrow={eyebrow} title="Guardar" detail={detail} />
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

### QuickAction

Acceso a un recorrido existente; toda la tarjeta mantiene un único objetivo táctil.

[Fuente](../src/components/molecules/QuickAction.tsx)

Tipo del parámetro:

```ts
{
  title: string;
  detail: string;
  icon: IconName;
  onPress: () => void;
}
```

| Prop    | Obligatoria | Tipo         |
| ------- | ----------- | ------------ |
| title   | Sí          | `string`     |
| detail  | Sí          | `string`     |
| icon    | Sí          | `IconName`   |
| onPress | Sí          | `() => void` |

Uso:

```tsx
<QuickAction title="Guardar" detail={detail} icon={icon} onPress={handleAction} />
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

### ResponsiveGrid

Cuadrícula de dos columnas que conserva las claves y el orden de los elementos.

[Fuente](../src/components/molecules/ResponsiveGrid.tsx)

Tipo del parámetro:

```ts
PropsWithChildren;
```

Uso:

```tsx
<ResponsiveGrid />
```

### RevenueBar

Barra con cifra explícita para no depender de color o longitud.

[Fuente](../src/components/molecules/RevenueBar.tsx)

Tipo del parámetro:

```ts
{
  date: string;
  cents: number;
  max: number;
}
```

| Prop  | Obligatoria | Tipo     |
| ----- | ----------- | -------- |
| date  | Sí          | `string` |
| cents | Sí          | `number` |
| max   | Sí          | `number` |

Uso:

```tsx
<RevenueBar date={date} cents={cents} max={max} />
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

Jerarquía de sección, separada de la portada principal de cada experiencia.

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

### SidebarLink

Destino lateral con selección persistente y respuesta de hover/teclado del Pressable.

[Fuente](../src/components/molecules/SidebarLink.tsx)

Tipo del parámetro:

```ts
{
  item: NavigationItem;
  active: boolean;
}
```

| Prop   | Obligatoria | Tipo             |
| ------ | ----------- | ---------------- |
| item   | Sí          | `NavigationItem` |
| active | Sí          | `boolean`        |

Uso:

```tsx
<SidebarLink item={item} active={active} />
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

### WashIllustration

Ilustración vectorial decorativa del servicio; no representa un vehículo del cliente.

[Fuente](../src/components/molecules/WashIllustration.tsx)

No recibe propiedades.

Uso:

```tsx
<WashIllustration />
```

### WorkdayGuide

Ayuda operacional; las acciones reales siguen en el detalle del turno.

[Fuente](../src/components/molecules/WorkdayGuide.tsx)

No recibe propiedades.

Uso:

```tsx
<WorkdayGuide />
```

### WorkspaceUser

Identidad de la sesión actual; no consulta ni copia información de otros usuarios.

[Fuente](../src/components/molecules/WorkspaceUser.tsx)

Tipo del parámetro:

```ts
{ inverse?: boolean }
```

| Prop    | Obligatoria | Tipo      |
| ------- | ----------- | --------- |
| inverse | No          | `boolean` |

Uso:

```tsx
<WorkspaceUser />
```

## organisms

### AdminMenu

Menú administrativo móvil basado en el mismo catálogo que la barra lateral.

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

### AdminQuickActions

Accesos operativos que complementan la navegación administrativa.

[Fuente](../src/components/organisms/AdminQuickActions.tsx)

No recibe propiedades.

Uso:

```tsx
<AdminQuickActions />
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

Asigna un empleado activo sin mezclar esa acción con confirmar el turno.

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

Solicita motivo y confirma la cancelación mediante el comando del turno.

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

Resumen compartido por los tres roles; no amplía los datos recibidos de la API.

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

Selector administrativo de titular; no se ofrece a otros roles.

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

Selector administrativo de empleado para restringir la consulta de turnos.

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

Presenta el contrato del lavado sin modificar la reserva.

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

Compone la página actual y distingue carga, error y ausencia de turnos.

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

Lista observaciones de trabajo y conecta la carga de una nueva nota.

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

### AppointmentPagination

Adapta la paginación del recurso sin repetirla entre experiencias.

[Fuente](../src/components/organisms/AppointmentPagination.tsx)

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
<AppointmentPagination manager={manager} />
```

### AppointmentPaymentAction

Ofrece registrar cobro solo con las capacidades vigentes.

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

Recoge importe, medio y referencia para registrar un cobro idempotente.

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

Muestra cobros registrados y saldo de la proyección autorizada.

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

Presenta el comprobante histórico; no constituye factura fiscal.

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

Expone las transiciones administrativas que el servidor vuelve a validar.

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

Filtra la consulta por estado sin cambiar ningún turno.

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

Selecciona titular para una reserva asistida por administración.

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

Composición de la acción principal del cliente, sin información comercial fija.

[Fuente](../src/components/organisms/BookingInvitation.tsx)

No recibe propiedades.

Uso:

```tsx
<BookingInvitation />
```

### BookingInvitationCopy

Contenido editorial de la portada de reserva, independiente de navegación e ilustración.

[Fuente](../src/components/organisms/BookingInvitationCopy.tsx)

No recibe propiedades.

Uso:

```tsx
<BookingInvitationCopy />
```

### BookingServicesField

Ofrece servicios activos con tarifa para el vehículo elegido.

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

Selecciona un vehículo del titular y orienta cuando aún no tiene ninguno.

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

### ClientQuickActions

Tareas de preparación antes de reservar; no duplica consultas del catálogo.

[Fuente](../src/components/organisms/ClientQuickActions.tsx)

No recibe propiedades.

Uso:

```tsx
<ClientQuickActions />
```

### ClientVisitList

Visitas autorizadas, con carga/error separados del estado vacío.

[Fuente](../src/components/organisms/ClientVisitList.tsx)

Tipo del parámetro:

```ts
{
  home: ReturnType<typeof useHome>;
}
```

| Prop | Obligatoria | Tipo                         |
| ---- | ----------- | ---------------------------- |
| home | Sí          | `ReturnType<typeof useHome>` |

Uso:

```tsx
<ClientVisitList home={home} />
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

### DashboardHeading

Presentación del tablero y su acción prioritaria de reserva asistida.

[Fuente](../src/components/organisms/DashboardHeading.tsx)

No recibe propiedades.

Uso:

```tsx
<DashboardHeading />
```

### DashboardIndicators

Métricas diarias y pendientes globales; un recurso no disponible muestra un guion.

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

### DashboardPending

Solicitudes pendientes del negocio; un fallo de consulta no se anuncia como lista vacía.

[Fuente](../src/components/organisms/DashboardPending.tsx)

Tipo del parámetro:

```ts
{
  resource: ReturnType < typeof useDashboard > ['pending'];
}
```

| Prop     | Obligatoria | Tipo                                         |
| -------- | ----------- | -------------------------------------------- |
| resource | Sí          | `ReturnType<typeof useDashboard>['pending']` |

Uso:

```tsx
<DashboardPending resource={resource} />
```

### EmployeeAppointmentResults

Filtros y resultados compartidos por agenda e historial del equipo.

[Fuente](../src/components/organisms/EmployeeAppointmentResults.tsx)

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
<EmployeeAppointmentResults manager={manager} />
```

### EmployeeDaySummary

Resumen de la fecha consultada, limitado por la API al empleado actual.

[Fuente](../src/components/organisms/EmployeeDaySummary.tsx)

Tipo del parámetro:

```ts
{
  summary: ReturnType < typeof useAppointments > ['summary'];
}
```

| Prop    | Obligatoria | Tipo                                            |
| ------- | ----------- | ----------------------------------------------- |
| summary | Sí          | `ReturnType<typeof useAppointments>['summary']` |

Uso:

```tsx
<EmployeeDaySummary summary={summary} />
```

### EmployeePerformance

Presenta trabajos completados por empleado en el período.

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

Ofrece iniciar o finalizar el lavado según el estado del turno.

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

Presenta frecuencias reales de servicios en el período consultado.

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

Identifica la sesión propia con nombre, email y avatar opcional.

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

Confirma la contraseña actual y solicita la nueva al servidor.

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

Compone indicadores, ingresos, servicios y rendimiento desde un único reporte.

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

Visualiza ingresos reales por día con las mismas barras accesibles del tablero.

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

Superficie de pantalla con una única región desplazable y actualización opcional.

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

Cuadrícula de catálogo con acciones administrativas cuando están habilitadas.

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

Confirma la baja lógica del servicio preservando contratos anteriores.

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

Edita descripción y duración del servicio, separadas de sus precios.

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

Edita una tarifa para la pareja servicio/tipo de vehículo.

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

### SidebarNavigation

Selección de destinos basada en rol y ruta, sin estado de navegación duplicado.

[Fuente](../src/components/organisms/SidebarNavigation.tsx)

No recibe propiedades.

Uso:

```tsx
<SidebarNavigation />
```

### SignInForm

Valida email y contraseña y delega el acceso en useSignIn.

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

### SignInPresentation

Presentación de acceso que comparte la identidad del resto de la aplicación.

[Fuente](../src/components/organisms/SignInPresentation.tsx)

No recibe propiedades.

Uso:

```tsx
<SignInPresentation />
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

Edita la preferencia local de apariencia sin cambiar datos del negocio.

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

Presenta la página autorizada de usuarios y los estados de consulta.

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

Confirma la baja lógica de una cuenta conservando su historial.

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

Comparte campos de creación y edición de cuentas administradas.

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

Filtra cuentas por rol sin modificar sus permisos.

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

Cuadrícula de vehículos autorizados con edición y baja confirmada.

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

Confirma la baja lógica; el servidor rechaza trabajos pendientes.

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

Formulario del vehículo con titular controlado por rol y servidor.

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

Formulario administrativo de categorías utilizadas por las tarifas.

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

### WeeklyActivity

Serie semanal real; no rellena actividad ni fabrica tendencias para decorar el tablero.

[Fuente](../src/components/organisms/WeeklyActivity.tsx)

Tipo del parámetro:

```ts
{
  resource: ReturnType < typeof useDashboard > ['week'];
}
```

| Prop     | Obligatoria | Tipo                                      |
| -------- | ----------- | ----------------------------------------- |
| resource | Sí          | `ReturnType<typeof useDashboard>['week']` |

Uso:

```tsx
<WeeklyActivity resource={resource} />
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

### WorkspaceFrame

Estructura común independiente del contenido y de las consultas de cada pantalla.

[Fuente](../src/components/organisms/WorkspaceFrame.tsx)

Tipo del parámetro:

```ts
PropsWithChildren;
```

Uso:

```tsx
<WorkspaceFrame />
```

### WorkspaceHeader

Cabecera visual común; su área interactiva conserva su propio estado de menú.

[Fuente](../src/components/organisms/WorkspaceHeader.tsx)

Tipo del parámetro:

```ts
{
  wide: boolean;
}
```

| Prop | Obligatoria | Tipo      |
| ---- | ----------- | --------- |
| wide | Sí          | `boolean` |

Uso:

```tsx
<WorkspaceHeader wide={wide} />
```

### WorkspaceHeaderActions

Área de interacción de cabecera, separada del posicionamiento visual.

[Fuente](../src/components/organisms/WorkspaceHeaderActions.tsx)

Tipo del parámetro:

```ts
{
  wide: boolean;
}
```

| Prop | Obligatoria | Tipo      |
| ---- | ----------- | --------- |
| wide | Sí          | `boolean` |

Uso:

```tsx
<WorkspaceHeaderActions wide={wide} />
```

### WorkspaceSidebar

Estructura lateral independiente del catálogo de destinos y de su selección.

[Fuente](../src/components/organisms/WorkspaceSidebar.tsx)

No recibe propiedades.

Uso:

```tsx
<WorkspaceSidebar />
```
