import { useEffect, useMemo, useState } from 'react';
import { SegmentedControl, SegmentedControlItem, Divider, Text } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import BadgeVerified from '@react-spectrum/s2/icons/BadgeVerified';
import Flag from '@react-spectrum/s2/icons/Flag';
import { checks } from './data.ts';
import { IdleView } from './IdleView.tsx';
import { ScanningView } from './ScanningView.tsx';
import { SummaryHeader } from './SummaryHeader.tsx';
import { GroupSection } from './GroupSection.tsx';

type Phase = 'idle' | 'scanning' | 'done';
type Filter = 'all' | 'action';

const SCAN_STEP_COUNT = 5;
const SCAN_STEP_MS = 520;

const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  paddingX: 16,
  paddingTop: 16,
  paddingBottom: 24,
});

const filterRow = style({ display: 'flex', flexDirection: 'column', gap: 8 });
const emptyFilter = style({
  font: 'ui-sm',
  color: 'gray-600',
  textAlign: 'center',
  paddingY: 16,
});

/**
 * Compliance Assistant mockup. Simulates a brand + medical-legal review of the
 * selected GenStudio content: run a scan, browse grouped findings, apply inline
 * fixes, and see the recommended MLR review tier. Nothing is wired to a backend
 * — interactions update local state to convey how the real add-on would feel.
 */
export function CompliancePanel() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [activeStep, setActiveStep] = useState(0);
  const [resolved, setResolved] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<Filter>('all');

  // Drive the simulated scan, advancing one step at a time before showing results.
  useEffect(() => {
    if (phase !== 'scanning') return;
    if (activeStep >= SCAN_STEP_COUNT) {
      const t = setTimeout(() => setPhase('done'), SCAN_STEP_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActiveStep((s) => s + 1), SCAN_STEP_MS);
    return () => clearTimeout(t);
  }, [phase, activeStep]);

  const run = () => {
    setResolved(new Set());
    setActiveStep(0);
    setPhase('scanning');
  };

  const resolve = (id: string) =>
    setResolved((prev) => new Set(prev).add(id));
  const undo = (id: string) =>
    setResolved((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });

  const counts = useMemo(() => {
    let critical = 0;
    let warning = 0;
    let passed = 0;
    for (const check of checks) {
      if (resolved.has(check.id) || check.status === 'pass') passed += 1;
      else if (check.status === 'critical') critical += 1;
      else warning += 1; // warning + info
    }
    return { critical, warning, passed, total: checks.length };
  }, [resolved]);

  const visible = useMemo(() => {
    if (filter === 'all') return checks;
    return checks.filter(
      (check) => check.status !== 'pass' && !resolved.has(check.id),
    );
  }, [filter, resolved]);

  if (phase === 'idle') {
    return (
      <div className={body}>
        <IdleView onRun={run} />
      </div>
    );
  }

  if (phase === 'scanning') {
    return (
      <div className={body}>
        <ScanningView activeStep={activeStep} />
      </div>
    );
  }

  const brandChecks = visible.filter((c) => c.group === 'brand');
  const medlegalChecks = visible.filter((c) => c.group === 'medlegal');
  const nothingToShow = visible.length === 0;

  return (
    <div className={body}>
      <SummaryHeader counts={counts} onRerun={run} />
      <Divider size="S" />

      <div className={filterRow}>
        <SegmentedControl
          aria-label="Filter findings"
          isJustified
          selectedKey={filter}
          onSelectionChange={(key) => setFilter(key as Filter)}
          styles={style({ width: 'full' })}
        >
          <SegmentedControlItem id="all">All checks</SegmentedControlItem>
          <SegmentedControlItem id="action">Needs action</SegmentedControlItem>
        </SegmentedControl>
      </div>

      {nothingToShow ? (
        <Text styles={emptyFilter}>Nothing needs action — every finding is resolved.</Text>
      ) : (
        <>
          <GroupSection
            title="Brand compliance"
            Icon={BadgeVerified}
            checks={brandChecks}
            resolved={resolved}
            onResolve={resolve}
            onUndo={undo}
          />
          <GroupSection
            title="Medical & legal compliance"
            Icon={Flag}
            checks={medlegalChecks}
            resolved={resolved}
            onResolve={resolve}
            onUndo={undo}
          />
        </>
      )}
    </div>
  );
}
