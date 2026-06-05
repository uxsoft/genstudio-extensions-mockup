import type { CSSProperties } from 'react';
import { ProgressBar, ProgressCircle, Text } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import CheckmarkCircle from '@react-spectrum/s2/icons/CheckmarkCircle';

const wrap = style({ display: 'flex', flexDirection: 'column', gap: 16 });

const steps = style({ display: 'flex', flexDirection: 'column', gap: 4 });

const step = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  paddingX: 12,
  paddingY: 8,
  borderRadius: 'lg',
  backgroundColor: 'layer-1',
});

const stepText = style({ font: 'ui-sm', color: 'gray-800', flexGrow: 1, minWidth: 0 });
const stepDone = style({ font: 'ui-sm', color: 'gray-500', flexGrow: 1, minWidth: 0 });

const greenIcon = { '--iconPrimary': '#2d9d78' } as CSSProperties;

/** Steps shown while the (simulated) scan runs; `activeStep` advances over time. */
const SCAN_STEPS = [
  'Reading content & assets',
  'Checking brand guidelines',
  'Validating claims library',
  'Verifying safety information',
  'Recommending review tier',
];

export function ScanningView({ activeStep }: { activeStep: number }) {
  return (
    <div className={wrap}>
      <ProgressBar
        isIndeterminate
        size="L"
        label="Reviewing content…"
        styles={style({ width: 'full' })}
      />
      <div className={steps}>
        {SCAN_STEPS.map((labelText, i) => {
          const done = i < activeStep;
          const active = i === activeStep;
          return (
            <div key={labelText} className={step}>
              {done ? (
                <CheckmarkCircle UNSAFE_style={greenIcon} />
              ) : active ? (
                <ProgressCircle isIndeterminate size="S" aria-label="In progress" />
              ) : (
                <PendingDot />
              )}
              <Text styles={done ? stepDone : stepText}>{labelText}</Text>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const pendingDot = style({
  width: 16,
  height: 16,
  borderRadius: 'full',
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: 'gray-300',
  flexShrink: 0,
});

function PendingDot() {
  return <span className={pendingDot} />;
}
