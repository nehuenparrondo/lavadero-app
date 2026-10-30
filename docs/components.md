# Catálogo Atomic Design

| Pieza                                      | Capa      | Props/uso principal                                       |
| ------------------------------------------ | --------- | --------------------------------------------------------- |
| Text                                       | Átomo     | TextProps; tipografía/paleta semántica                    |
| Button                                     | Átomo     | label, onPress, variant, loading, disabled                |
| Input                                      | Átomo     | label, error y TextInputProps; entrada accesible          |
| Avatar / Badge                             | Átomo     | Identidad abreviada / etiqueta de estado                  |
| Card / SectionHeader                       | Molécula  | children / title, subtitle, action                        |
| FormField                                  | Molécula  | field, value, onChange, error; texto/fecha/opciones       |
| ChoiceGroup                                | Molécula  | options, value, onChange, multiple                        |
| Notice / LoadingState / EmptyState         | Molécula  | Mensaje, reintento y estado de recurso                    |
| StatusBadge                                | Molécula  | Traduce estado del contrato a etiqueta visual             |
| ServiceCard                                | Molécula  | Servicio, tipo, tarifa y acciones administrativas         |
| Pagination                                 | Molécula  | page, total, limit, onChange                              |
| Screen                                     | Organismo | children, onRefresh, refreshing; ancho adaptable y scroll |
| ModalPanel                                 | Organismo | visible, title, onClose, children; diálogo reutilizable   |
| EntityForm                                 | Organismo | fields, schema, initialValues, onSubmit; RHF/Zod          |
| AppointmentCard                            | Organismo | Turno y onPress; horario/vehículo/estado                  |
| AppointmentFilters                         | Organismo | Fecha, estado y actualización del listado                 |
| AppointmentActions / AppointmentDialogs    | Organismo | Acciones/diálogos según rol y permiso                     |
| ScheduleSelector                           | Organismo | Cotización y horarios devueltos por backend               |
| VehicleEditor / ServiceEditors / UserTable | Organismo | Gestión de entidades                                      |
| VehicleTypeManager / ReportSummary         | Organismo | Tipos y resumen administrativo                            |

```tsx
<Button label="Guardar" loading={busy} onPress={save} />
<Notice error={error} onRetry={refresh} />
```

Los componentes reciben datos/callbacks; los hooks ejecutan acciones y los servicios
realizan HTTP. Los README de carpetas y TSDoc describen las responsabilidades locales.
