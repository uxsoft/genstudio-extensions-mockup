import type { CSSProperties } from 'react';
import { Disclosure, DisclosureTitle, DisclosurePanel, Button, Text } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import CheckmarkCircle from '@react-spectrum/s2/icons/CheckmarkCircle';
import type { Check } from './types.ts';
import { StatusIcon } from './status.tsx';
import { ClaimsTable } from './ClaimsTable.tsx';

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
const summary = style({ font: 'ui-sm', color: 'gray-600' });

const panelBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  paddingBottom: 4,
});

const detail = style({ font: 'ui-sm', color: 'gray-700' });

const evidence = style({
  font: 'ui-sm',
  color: 'gray-800',
  backgroundColor: 'layer-1',
  borderRadius: 'lg',
  paddingX: 12,
  paddingY: 8,
  borderStartWidth: 2,
  borderStartColor: 'gray-400',
  borderStartStyle: 'solid',
});

const resource = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  font: 'ui-sm',
  color: 'accent-900',
});

const actions = style({ display: 'flex', gap: 8, alignItems: 'center' });

const resolvedRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

const resolvedText = style({ font: 'ui-sm', color: 'gray-700', flexGrow: 1, minWidth: 0 });

const greenIcon = { '--iconPrimary': '#2d9d78' } as CSSProperties;

interface CheckRowProps {
  check: Check;
  resolved: boolean;
  onResolve: (id: string) => void;
  onUndo: (id: string) => void;
}

/** A single expandable compliance finding with inline remediation. */
export function CheckRow({ check, resolved, onResolve, onUndo }: CheckRowProps) {
  const effectiveStatus = resolved ? 'pass' : check.status;
  const shownSummary = resolved && check.resolution ? check.resolution : check.summary;

  return (
    <Disclosure size="S" defaultExpanded={check.status === 'critical'}>
      <DisclosureTitle>
        <span className={titleRow}>
          <StatusIcon status={effectiveStatus} />
          <span className={titleText}>
            <span className={label}>{check.label}</span>
            <span className={summary}>{shownSummary}</span>
          </span>
        </span>
      </DisclosureTitle>
      <DisclosurePanel>
        <div className={panelBody}>
          <Text styles={detail}>{check.detail}</Text>

          {check.evidence ? <div className={evidence}>{check.evidence}</div> : null}

          {check.claims ? <ClaimsTable claims={check.claims} /> : null}

          {check.resourceLabel ? (
            <span className={resource}>
              <FileTextDot />
              {check.resourceLabel}
            </span>
          ) : null}

          {resolved ? (
            <div className={resolvedRow}>
              <CheckmarkCircle UNSAFE_style={greenIcon} />
              <Text styles={resolvedText}>
                {check.resolution ?? 'Resolved.'}
              </Text>
              <Button variant="secondary" size="S" onPress={() => onUndo(check.id)}>
                Undo
              </Button>
            </div>
          ) : check.actionLabel ? (
            <div className={actions}>
              <Button variant="accent" size="S" onPress={() => onResolve(check.id)}>
                {check.actionLabel}
              </Button>
              <Button variant="secondary" size="S" onPress={() => onResolve(check.id)}>
                Dismiss
              </Button>
            </div>
          ) : null}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

import FileText from '@react-spectrum/s2/icons/FileText';
const dot = { '--iconPrimary': '#6c6c6c' } as CSSProperties;
function FileTextDot() {
  return <FileText UNSAFE_style={dot} />;
}
