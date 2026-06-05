import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Button, ProgressCircle, Text } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import CheckmarkCircle from '@react-spectrum/s2/icons/CheckmarkCircle';
import ExportTo from '@react-spectrum/s2/icons/ExportTo';
import { channels, complianceSummary, substeps } from './data.ts';
import type { ActionState } from './types.ts';
import { StepSection } from './StepSection.tsx';
import { SubstepRow } from './SubstepRow.tsx';

const SUBSTEP_MS = 1200;
const POLL_MS = 2200;
const CHANNEL_MS = 1200;

const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  paddingX: 16,
  paddingTop: 16,
  paddingBottom: 24,
});

const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  paddingX: 12,
  paddingY: 12,
  borderRadius: 'lg',
  backgroundColor: 'layer-1',
});

const cardHead = style({ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 });
const cardText = style({ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 });
const cardTitle = style({ font: 'ui', color: 'gray-900' });
const cardSub = style({ font: 'ui-sm', color: 'gray-600' });

const channelHead = style({ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 });
const channelText = style({ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0, flexGrow: 1 });

const link = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  font: 'ui-sm',
  color: 'accent-900',
  textDecoration: 'none',
});

const doneNote = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  font: 'ui-sm',
  color: 'gray-700',
});

const greenIcon = { '--iconPrimary': '#2d9d78' } as CSSProperties;
const mutedIcon = { '--iconPrimary': '#6c6c6c' } as CSSProperties;
const accentIcon = { '--iconPrimary': 'currentColor' } as CSSProperties;

type StateMap = Record<string, ActionState>;

/**
 * Process Assistant mockup. Walks the selected content through its strictly
 * sequential lifecycle — compliance → medical-legal → activation — as a gated
 * accordion. Nothing is wired to a backend: actions simulate async work with a
 * spinner and a short delay, then reveal a (mock) link, conveying how the real
 * add-on would feel.
 */
export function ProcessPanel() {
  const [complianceAcked, setComplianceAcked] = useState(false);
  const [substepState, setSubstepState] = useState<StateMap>({});
  const [channelState, setChannelState] = useState<StateMap>({});

  // Clear any in-flight simulated actions if the panel unmounts.
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const runAction = (
    setter: React.Dispatch<React.SetStateAction<StateMap>>,
    id: string,
    delay: number,
  ) => {
    setter((prev) => ({ ...prev, [id]: 'running' }));
    const t = setTimeout(() => setter((prev) => ({ ...prev, [id]: 'done' })), delay);
    timers.current.push(t);
  };

  const allSubstepsDone = useMemo(
    () => substeps.every((s) => substepState[s.id] === 'done'),
    [substepState],
  );
  const allChannelsDone = useMemo(
    () => channels.every((c) => channelState[c.id] === 'done'),
    [channelState],
  );

  const step1Status = complianceAcked ? 'done' : 'active';
  const step2Status = !complianceAcked ? 'locked' : allSubstepsDone ? 'done' : 'active';
  const step3Status =
    step2Status !== 'done' ? 'locked' : allChannelsDone ? 'done' : 'active';

  const doneSubsteps = substeps.filter((s) => substepState[s.id] === 'done').length;
  const sentChannels = channels.filter((c) => channelState[c.id] === 'done').length;

  return (
    <div className={body}>
      {/* Step 1 — Compliance (read-only passed state) */}
      <StepSection
        index={1}
        status={step1Status}
        title="Compliance"
        summary={complianceAcked ? 'Passed — no high findings' : 'Review the compliance result'}
      >
        <div className={card}>
          <div className={cardHead}>
            <CheckmarkCircle UNSAFE_style={greenIcon} />
            <span className={cardText}>
              <Text styles={cardTitle}>Compliance check passed</Text>
              <Text styles={cardSub}>
                {complianceSummary.mustFix} must-fix · {complianceSummary.warnings} warnings ·{' '}
                {complianceSummary.passed} passed
              </Text>
            </span>
          </div>
          <Text styles={cardSub}>
            No high-severity findings remain. Run the Compliance Assistant again from its panel if
            you change the content.
          </Text>
        </div>
        {!complianceAcked ? (
          <div>
            <Button variant="accent" size="S" onPress={() => setComplianceAcked(true)}>
              Continue
            </Button>
          </div>
        ) : null}
      </StepSection>

      {/* Step 2 — Medical-legal process (sequential substeps) */}
      <StepSection
        index={2}
        status={step2Status}
        title="Medical-legal process"
        summary={
          step2Status === 'locked'
            ? 'Complete compliance first'
            : allSubstepsDone
              ? 'All steps complete'
              : `${doneSubsteps} of ${substeps.length} complete`
        }
      >
        {substeps.map((sub, i) => {
          const priorDone = substeps.slice(0, i).every((p) => substepState[p.id] === 'done');
          return (
            <SubstepRow
              key={sub.id}
              substep={sub}
              state={substepState[sub.id] ?? 'idle'}
              disabled={!priorDone}
              onRun={() => runAction(setSubstepState, sub.id, sub.poll ? POLL_MS : SUBSTEP_MS)}
            />
          );
        })}
      </StepSection>

      {/* Step 3 — Activation channels (order-independent, multiple allowed) */}
      <StepSection
        index={3}
        status={step3Status}
        title="Activation channels"
        summary={
          step3Status === 'locked'
            ? 'Complete the medical-legal process first'
            : sentChannels > 0
              ? `Sent to ${sentChannels} of ${channels.length} channels`
              : 'Send to one or more channels'
        }
      >
        {channels.map((channel) => {
          const state = channelState[channel.id] ?? 'idle';
          const { Icon } = channel;
          return (
            <div className={card} key={channel.id}>
              <div className={channelHead}>
                <Icon UNSAFE_style={mutedIcon} />
                <span className={channelText}>
                  <Text styles={cardTitle}>{channel.label}</Text>
                  <Text styles={cardSub}>{channel.blurb}</Text>
                </span>
                {state === 'done' ? <CheckmarkCircle UNSAFE_style={greenIcon} /> : null}
              </div>
              {state === 'running' ? (
                <ProgressCircle isIndeterminate size="S" aria-label={`Sending to ${channel.label}`} />
              ) : state === 'done' ? (
                <a className={link} href={channel.href} target="_blank" rel="noreferrer">
                  <ExportTo UNSAFE_style={accentIcon} />
                  {channel.linkLabel}
                </a>
              ) : (
                <div>
                  <Button
                    variant="accent"
                    size="S"
                    onPress={() => runAction(setChannelState, channel.id, CHANNEL_MS)}
                  >
                    {channel.actionLabel}
                  </Button>
                </div>
              )}
            </div>
          );
        })}
        {sentChannels > 0 ? (
          <div className={doneNote}>
            <CheckmarkCircle UNSAFE_style={greenIcon} />
            <Text styles={cardSub}>
              {allChannelsDone
                ? 'Sent to all activation channels — the process is complete.'
                : 'Sent. You can send to the remaining channels at any time.'}
            </Text>
          </div>
        ) : null}
      </StepSection>
    </div>
  );
}
