import type { CSSProperties } from 'react';
import { Button, ProgressCircle } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import CheckmarkCircle from '@react-spectrum/s2/icons/CheckmarkCircle';
import ExportTo from '@react-spectrum/s2/icons/ExportTo';
import type { ActionState, Substep } from './types.ts';

const row = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  paddingX: 12,
  paddingY: 12,
  borderRadius: 'lg',
  backgroundColor: 'layer-1',
});

const head = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  minWidth: 0,
});

const headText = style({ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0, flexGrow: 1 });
const label = style({ font: 'ui', color: 'gray-900' });
const labelMuted = style({ font: 'ui', color: 'gray-500' });
const status = style({ font: 'ui-sm', color: 'gray-600' });

const actionRow = style({ display: 'flex', alignItems: 'center', gap: 8 });

const link = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  font: 'ui-sm',
  color: 'accent-900',
  textDecoration: 'none',
});

const mutedIcon = { '--iconPrimary': '#6c6c6c' } as CSSProperties;
const dimIcon = { '--iconPrimary': '#959595' } as CSSProperties;
const greenIcon = { '--iconPrimary': '#2d9d78' } as CSSProperties;
const accentIcon = { '--iconPrimary': 'currentColor' } as CSSProperties;

interface SubstepRowProps {
  substep: Substep;
  state: ActionState;
  /** When true the action is gated by an earlier substep that isn't done yet. */
  disabled: boolean;
  onRun: () => void;
}

/** One sequential medical-legal substep: idle button → spinner → done + link. */
export function SubstepRow({ substep, state, disabled, onRun }: SubstepRowProps) {
  const { Icon } = substep;
  const idleLocked = state === 'idle' && disabled;

  return (
    <div className={row}>
      <div className={head}>
        <Icon UNSAFE_style={idleLocked ? dimIcon : mutedIcon} />
        <span className={headText}>
          <span className={idleLocked ? labelMuted : label}>{substep.label}</span>
          {state === 'running' ? (
            <span className={status}>{substep.runningLabel}</span>
          ) : state === 'idle' && disabled ? (
            <span className={status}>Waiting for the previous step</span>
          ) : null}
        </span>
        {state === 'done' ? <CheckmarkCircle UNSAFE_style={greenIcon} /> : null}
      </div>

      {state === 'running' ? (
        <div className={actionRow}>
          <ProgressCircle isIndeterminate size="S" aria-label={substep.runningLabel} />
        </div>
      ) : state === 'done' ? (
        <a className={link} href={substep.href} target="_blank" rel="noreferrer">
          <ExportTo UNSAFE_style={accentIcon} />
          {substep.linkLabel}
        </a>
      ) : (
        <div className={actionRow}>
          <Button variant="accent" size="S" isDisabled={disabled} onPress={onRun}>
            {substep.actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
