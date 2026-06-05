import { Meter, ActionButton, Text } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import Refresh from '@react-spectrum/s2/icons/Refresh';
import { StatusIcon } from './status.tsx';

export interface Counts {
  critical: number;
  warning: number;
  passed: number;
  total: number;
}

const wrap = style({ display: 'flex', flexDirection: 'column', gap: 12 });

const topRow = style({
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  gap: 8,
});

const verdict = style({ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 });
const title = style({ font: 'heading-sm', color: 'gray-900' });
const stamp = style({ font: 'ui-sm', color: 'gray-600' });

const chips = style({ display: 'flex', gap: 16 });
const chip = style({ display: 'flex', alignItems: 'center', gap: 4 });
const chipText = style({ font: 'ui-sm', color: 'gray-700' });

interface SummaryHeaderProps {
  counts: Counts;
  onRerun: () => void;
}

/** Headline verdict, compliance-score meter and result tallies. */
export function SummaryHeader({ counts, onRerun }: SummaryHeaderProps) {
  const { critical, warning, passed, total } = counts;
  const score = total > 0 ? Math.round((passed / total) * 100) : 100;
  const variant = critical > 0 ? 'negative' : warning > 0 ? 'notice' : 'positive';
  const headline =
    critical > 0
      ? `${critical} ${critical === 1 ? 'issue needs' : 'issues need'} fixing`
      : warning > 0
        ? `${warning} ${warning === 1 ? 'item' : 'items'} to review`
        : 'All checks passed';

  return (
    <div className={wrap}>
      <div className={topRow}>
        <div className={verdict}>
          <Text styles={title}>{headline}</Text>
          <Text styles={stamp}>Checked just now · {total} checks</Text>
        </div>
        <ActionButton isQuiet aria-label="Re-run check" onPress={onRerun}>
          <Refresh />
        </ActionButton>
      </div>

      <Meter
        size="L"
        variant={variant}
        value={score}
        label="Compliance score"
        styles={style({ width: 'full' })}
      />

      <div className={chips}>
        <span className={chip}>
          <StatusIcon status="critical" />
          <Text styles={chipText}>{critical} Must fix</Text>
        </span>
        <span className={chip}>
          <StatusIcon status="warning" />
          <Text styles={chipText}>{warning} Review</Text>
        </span>
        <span className={chip}>
          <StatusIcon status="pass" />
          <Text styles={chipText}>{passed} Passed</Text>
        </span>
      </div>
    </div>
  );
}
