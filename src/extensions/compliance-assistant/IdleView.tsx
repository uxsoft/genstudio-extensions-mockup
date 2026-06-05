import type { CSSProperties } from 'react';
import { Button, Text } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import MagicWand from '@react-spectrum/s2/icons/MagicWand';
import BadgeVerified from '@react-spectrum/s2/icons/BadgeVerified';
import Flag from '@react-spectrum/s2/icons/Flag';
import { MSD_GREEN } from '../../host/brand.ts';

const wrap = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
  paddingX: 16,
  paddingTop: 24,
  textAlign: 'center',
});

const hero = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 56,
  height: 56,
  borderRadius: 'full',
  backgroundColor: 'layer-1',
});

const title = style({ font: 'heading-sm', color: 'gray-900' });
const intro = style({ font: 'ui-sm', color: 'gray-600', maxWidth: 280 });

const pillars = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  width: 'full',
  marginTop: 4,
});

const pillar = style({
  display: 'flex',
  alignItems: 'start',
  gap: 12,
  paddingX: 12,
  paddingY: 12,
  backgroundColor: 'layer-1',
  borderRadius: 'lg',
  textAlign: 'start',
});

const pillarText = style({ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 });
const pillarTitle = style({ font: 'ui', color: 'gray-900' });
const pillarSub = style({ font: 'ui-sm', color: 'gray-600' });

const brandIcon = { '--iconPrimary': MSD_GREEN } as CSSProperties;

interface IdleViewProps {
  onRun: () => void;
}

/** Pre-scan empty state describing what the assistant checks. */
export function IdleView({ onRun }: IdleViewProps) {
  return (
    <div className={wrap}>
      <span className={hero}>
        <BadgeVerified UNSAFE_style={brandIcon} />
      </span>
      <Text styles={title}>Review this content for compliance</Text>
      <Text styles={intro}>
        The assistant checks brand and medical-legal requirements, then suggests
        the right MLR review tier.
      </Text>

      <Button variant="accent" size="L" onPress={onRun}>
        <MagicWand />
        Run compliance check
      </Button>

      <div className={pillars}>
        <div className={pillar}>
          <BadgeVerified UNSAFE_style={brandIcon} />
          <div className={pillarText}>
            <Text styles={pillarTitle}>Brand compliance</Text>
            <Text styles={pillarSub}>
              Spelling, grammar, fonts, SOPs and rephrasing
            </Text>
          </div>
        </div>
        <div className={pillar}>
          <Flag UNSAFE_style={brandIcon} />
          <div className={pillarText}>
            <Text styles={pillarTitle}>Medical &amp; legal compliance</Text>
            <Text styles={pillarSub}>
              Safety info, labels, claims, imagery and logo rules
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
