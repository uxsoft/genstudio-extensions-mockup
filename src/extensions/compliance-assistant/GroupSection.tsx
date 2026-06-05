import type { CSSProperties } from 'react';
import { Badge, Text } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import type { Check } from './types.ts';
import type { IconComponent } from '../../host/types.ts';
import { CheckRow } from './CheckRow.tsx';
import { MSD_GREEN } from '../../host/brand.ts';

const section = style({ display: 'flex', flexDirection: 'column', gap: 4 });

const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  paddingX: 4,
  paddingTop: 4,
  paddingBottom: 4,
});

const titleStyle = style({ font: 'ui', color: 'gray-900', flexGrow: 1, minWidth: 0 });

const list = style({
  display: 'flex',
  flexDirection: 'column',
});

const brandIcon = { '--iconPrimary': MSD_GREEN } as CSSProperties;

interface GroupSectionProps {
  title: string;
  Icon: IconComponent;
  checks: Check[];
  resolved: Set<string>;
  onResolve: (id: string) => void;
  onUndo: (id: string) => void;
}

/** A titled group (Brand or Medical & Legal) with a roll-up badge and its checks. */
export function GroupSection({
  title,
  Icon,
  checks,
  resolved,
  onResolve,
  onUndo,
}: GroupSectionProps) {
  if (checks.length === 0) return null;

  let critical = 0;
  let review = 0;
  for (const check of checks) {
    if (resolved.has(check.id)) continue;
    if (check.status === 'critical') critical += 1;
    else if (check.status === 'warning' || check.status === 'info') review += 1;
  }

  const badge =
    critical > 0 ? (
      <Badge size="S" variant="negative" fillStyle="subtle">
        {critical} must fix
      </Badge>
    ) : review > 0 ? (
      <Badge size="S" variant="notice" fillStyle="subtle">
        {review} to review
      </Badge>
    ) : (
      <Badge size="S" variant="positive" fillStyle="subtle">
        All clear
      </Badge>
    );

  return (
    <div className={section}>
      <div className={header}>
        <Icon UNSAFE_style={brandIcon} />
        <Text styles={titleStyle}>{title}</Text>
        {badge}
      </div>
      <div className={list}>
        {checks.map((check) => (
          <CheckRow
            key={check.id}
            check={check}
            resolved={resolved.has(check.id)}
            onResolve={onResolve}
            onUndo={onUndo}
          />
        ))}
      </div>
    </div>
  );
}
