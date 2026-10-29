# Catálogo Atomic Design

## Implementado en etapa 1

| Componente       | Capa     | Props                     | Uso                                              |
| ---------------- | -------- | ------------------------- | ------------------------------------------------ |
| Text             | atom     | TextProps React Native    | Texto con paleta semántica y escala              |
| Button           | atom     | label, onPress, disabled? | Acción accesible de 48 dp mínimos                |
| ConnectionStatus | molecule | state, onRetry            | Estado real unconfigured/checking/online/offline |
| OpeningHoursCard | molecule | state, onRetry            | Horario del negocio y conectividad               |
| WelcomePanel     | organism | state, onRetry            | Bienvenida y horario confirmado                  |

```tsx
<Button label="Volver a intentar" onPress={retry} disabled={state === 'checking'} />
<ConnectionStatus state={state} onRetry={retry} />
```

Cada componente público tiene TSDoc, tema centralizado y una responsabilidad. Pantallas conectan hooks.
Pendientes según necesidad: Input, Icon, Badge, Spinner, Avatar; FormField, ListItem, StatusBadge,
SearchBar, ServiceCard; AppointmentCard, VehicleForm, AppointmentList, UserTable, ScheduleSelector.
No se exportan componentes vacíos para aparentar funcionalidad.
