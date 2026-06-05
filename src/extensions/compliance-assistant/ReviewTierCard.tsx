import type { CSSProperties } from 'react';
import { Badge, Button, Text } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import ReviewLink from '@react-spectrum/s2/icons/ReviewLink';
import { recommendedTier, reviewTiers } from './data.ts';

const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  paddingX: 12,
  paddingY: 12,
  backgroundColor: 'layer-1',
  borderRadius: 'lg',
  borderWidth: 1,
  borderColor: 'gray-200',
  borderStyle: 'solid',
});

const head = style({ display: 'flex', alignItems: 'center', gap: 8 });
const eyebrow = style({ font: 'ui-sm', color: 'gray-600', flexGrow: 1, minWidth: 0 });

const tierName = style({ font: 'heading-sm', color: 'gray-900' });
const blurb = style({ font: 'ui-sm', color: 'gray-700' });

const ladder = style({ display: 'flex', gap: 8, alignItems: 'center' });

const rationale = style({ display: 'flex', flexDirection: 'column', gap: 8 });
const bullet = style({ display: 'flex', alignItems: 'start', gap: 8 });
const dot = style({
  width: 8,
  height: 8,
  borderRadius: 'full',
  backgroundColor: 'gray-500',
  marginTop: 8,
  flexShrink: 0,
});
const bulletText = style({ font: 'ui-sm', color: 'gray-700', flexGrow: 1, minWidth: 0 });

const actions = style({ display: 'flex', gap: 8, marginTop: 2 });

const accentIcon = { '--iconPrimary': '#e34850' } as CSSProperties;

/** The escalated MLR review-tier recommendation with rationale and submit actions. */
export function ReviewTierCard() {
  return (
    <div className={card}>
      <div className={head}>
        <ReviewLink UNSAFE_style={accentIcon} />
        <Text styles={eyebrow}>Recommended MLR review tier</Text>
        <Badge size="S" variant="negative" fillStyle="subtle">
          Escalated
        </Badge>
      </div>

      <Text styles={tierName}>{recommendedTier.name}</Text>
      <Text styles={blurb}>{recommendedTier.blurb}</Text>

      <div className={ladder}>
        {reviewTiers.map((tier) => (
          <Badge
            key={tier.id}
            size="S"
            variant={tier.id === recommendedTier.id ? 'accent' : 'neutral'}
            fillStyle={tier.id === recommendedTier.id ? 'bold' : 'subtle'}
          >
            {tier.name}
          </Badge>
        ))}
      </div>

      <div className={rationale}>
        {recommendedTier.rationale.map((reason) => (
          <div key={reason} className={bullet}>
            <span className={dot} />
            <Text styles={bulletText}>{reason}</Text>
          </div>
        ))}
      </div>

      <div className={actions}>
        <Button variant="accent" size="S">
          Submit for MLR review
        </Button>
        <Button variant="secondary" size="S">
          Assign reviewers
        </Button>
      </div>
    </div>
  );
}
