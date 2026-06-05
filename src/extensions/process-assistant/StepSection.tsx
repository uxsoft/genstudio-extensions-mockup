import { useState, type CSSProperties, type ReactNode } from 'react';
import { Disclosure, DisclosureTitle, DisclosurePanel } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import CheckmarkCircle from '@react-spectrum/s2/icons/CheckmarkCircle';
import type { StepStatus } from './types.ts';
import { MSD_GREEN } from '../../host/brand.ts';

const titleRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  flexGrow: 1,
  minWidth: 0,
  textAlign: 'start',
});

const titleText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  minWidth: 0,
});

const label = style({ font: 'ui', color: 'gray-900' });
const labelLocked = style({ font: 'ui', color: 'gray-500' });
const summary = style({ font: 'ui-sm', color: 'gray-600' });

const panelBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  paddingBottom: 4,
});

/** Circular step badge: number for locked/active, green check when done. */
const badgeActive = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 22,
  height: 22,
  borderRadius: 'full',
  font: 'ui-sm',
  flexShrink: 0,
  color: 'white',
});

const badgeLocked = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 22,
  height: 22,
  borderRadius: 'full',
  font: 'ui-sm',
  flexShrink: 0,
  backgroundColor: 'gray-200',
  color: 'gray-500',
});

const greenIcon = { '--iconPrimary': '#2d9d78' } as CSSProperties;
const activeBg = { backgroundColor: MSD_GREEN } as CSSProperties;

function StepBadge({ status, index }: { status: StepStatus; index: number }) {
  if (status === 'done') return <CheckmarkCircle UNSAFE_style={greenIcon} />;
  if (status === 'active')
    return (
      <span className={badgeActive} style={activeBg}>
        {index}
      </span>
    );
  return <span className={badgeLocked}>{index}</span>;
}

interface StepSectionProps {
  index: number;
  status: StepStatus;
  title: string;
  /** One-line status summary shown under the title. */
  summary: string;
  children: ReactNode;
}

/** One top-level lifecycle step as an accordion section, gated by `status`. */
export function StepSection({ index, status, title, summary: summaryText, children }: StepSectionProps) {
  const [override, setOverride] = useState<boolean | null>(null);
  const isExpanded = status === 'locked' ? false : override ?? status === 'active';

  return (
    <Disclosure
      size="S"
      isDisabled={status === 'locked'}
      isExpanded={isExpanded}
      onExpandedChange={setOverride}
    >
      <DisclosureTitle>
        <span className={titleRow}>
          <StepBadge status={status} index={index} />
          <span className={titleText}>
            <span className={status === 'locked' ? labelLocked : label}>{title}</span>
            <span className={summary}>{summaryText}</span>
          </span>
        </span>
      </DisclosureTitle>
      <DisclosurePanel>
        <div className={panelBody}>{children}</div>
      </DisclosurePanel>
    </Disclosure>
  );
}
