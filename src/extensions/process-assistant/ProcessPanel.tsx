import { Heading, Text } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };

const placeholder = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  height: 'full',
  paddingX: 24,
  textAlign: 'center',
});

const badge = style({
  font: 'ui-sm',
  color: 'gray-600',
  backgroundColor: 'gray-100',
  borderRadius: 'full',
  paddingX: 12,
  paddingY: 4,
});

/**
 * Placeholder for the Process Assistant add-on. The real content will be
 * provided later — this just establishes the panel slot and a clear empty
 * state so the shell reads as high-fidelity.
 */
export function ProcessPanel() {
  return (
    <div className={placeholder}>
      <div className={badge}>Process Assistant</div>
      <Heading level={3}>Content to be defined</Heading>
      <Text>
        This add-on’s UI will be designed here. The panel, header and rail
        wiring are ready — drop the real mockup into <code>ProcessPanel</code>.
      </Text>
    </div>
  );
}
