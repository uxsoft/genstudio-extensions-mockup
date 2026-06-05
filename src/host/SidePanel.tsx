import type { ReactNode } from 'react';
import { ActionButton, Heading, Text } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import CloseIcon from '@react-spectrum/s2/icons/Close';

const panel = style({
  display: 'flex',
  flexDirection: 'column',
  width: 360,
  height: 'full',
  backgroundColor: 'base',
  borderStartWidth: 1,
  borderColor: 'gray-200',
  borderStyle: 'solid',
});

const header = style({
  display: 'flex',
  alignItems: 'start',
  gap: 8,
  paddingX: 16,
  paddingY: 12,
  borderBottomWidth: 1,
  borderColor: 'gray-200',
  borderStyle: 'solid',
});

const headerText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  flexGrow: 1,
  minWidth: 0,
});

const body = style({
  flexGrow: 1,
  overflow: 'auto',
});

interface SidePanelProps {
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
}

/**
 * The expandable right side panel that hosts the active add-on. Mirrors the
 * GenStudio add-on panel: a header with title/description + close, and a
 * scrollable body for the extension's UI.
 */
export function SidePanel({ title, description, onClose, children }: SidePanelProps) {
  return (
    <div className={panel}>
      <div className={header}>
        <div className={headerText}>
          <Heading level={2} styles={style({ font: 'heading-sm', margin: 0 })}>
            {title}
          </Heading>
          {description ? (
            <Text styles={style({ font: 'ui-sm', color: 'gray-600' })}>
              {description}
            </Text>
          ) : null}
        </div>
        <ActionButton isQuiet aria-label="Close panel" onPress={onClose}>
          <CloseIcon />
        </ActionButton>
      </div>
      <div className={body}>{children}</div>
    </div>
  );
}
