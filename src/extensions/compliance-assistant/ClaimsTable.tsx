import { Badge, Text } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import type { Claim } from './types.ts';
import { claimMeta } from './status.tsx';

const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginTop: 8,
});

const row = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  paddingX: 12,
  paddingY: 8,
  borderRadius: 'lg',
  backgroundColor: 'layer-1',
});

const topLine = style({
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  gap: 8,
});

const claimText = style({
  font: 'ui-sm',
  flexGrow: 1,
  minWidth: 0,
});

const note = style({
  font: 'ui-sm',
  color: 'gray-600',
});

const badgeStyle = style({ flexShrink: 0 });

/** The per-claim breakdown shown when the Claims validation check is expanded. */
export function ClaimsTable({ claims }: { claims: Claim[] }) {
  return (
    <div className={list}>
      {claims.map((claim) => {
        const meta = claimMeta(claim.match);
        return (
          <div key={claim.text} className={row}>
            <div className={topLine}>
              <span className={claimText}>“{claim.text}”</span>
              <Badge size="S" variant={meta.badge} fillStyle="subtle" styles={badgeStyle}>
                {meta.label}
              </Badge>
            </div>
            <Text styles={note}>{claim.note}</Text>
          </div>
        );
      })}
    </div>
  );
}
