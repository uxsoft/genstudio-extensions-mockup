import type { CSSProperties } from 'react';
import CheckmarkCircle from '@react-spectrum/s2/icons/CheckmarkCircle';
import AlertTriangle from '@react-spectrum/s2/icons/AlertTriangle';
import AlertDiamond from '@react-spectrum/s2/icons/AlertDiamond';
import InfoCircle from '@react-spectrum/s2/icons/InfoCircle';
import type { CheckStatus, ClaimMatch } from './types.ts';
import type { IconComponent } from '../../host/types.ts';

type BadgeVariant = 'positive' | 'notice' | 'negative' | 'informative' | 'neutral';

interface StatusMeta {
  Icon: IconComponent;
  /** Mid-tone hex that reads acceptably in both light and dark, used to tint the status icon. */
  color: string;
  badge: BadgeVariant;
  label: string;
}

const STATUS: Record<CheckStatus, StatusMeta> = {
  pass: { Icon: CheckmarkCircle, color: '#2d9d78', badge: 'positive', label: 'Pass' },
  warning: { Icon: AlertTriangle, color: '#e68619', badge: 'notice', label: 'Warning' },
  critical: { Icon: AlertDiamond, color: '#e34850', badge: 'negative', label: 'Must fix' },
  info: { Icon: InfoCircle, color: '#5aa9fa', badge: 'informative', label: 'Suggestion' },
};

export function statusMeta(status: CheckStatus): StatusMeta {
  return STATUS[status];
}

/** A status icon tinted with its semantic color via the `--iconPrimary` variable. */
export function StatusIcon({ status }: { status: CheckStatus }) {
  const { Icon, color } = STATUS[status];
  return <Icon UNSAFE_style={{ '--iconPrimary': color } as CSSProperties} />;
}

const CLAIM: Record<ClaimMatch, { badge: BadgeVariant; label: string }> = {
  exact: { badge: 'positive', label: 'Exact' },
  similar: { badge: 'notice', label: 'Similar' },
  unrecognized: { badge: 'negative', label: 'Unrecognized' },
};

export function claimMeta(match: ClaimMatch) {
  return CLAIM[match];
}
