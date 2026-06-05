import type { CSSProperties } from 'react';
import { Text } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import FileText from '@react-spectrum/s2/icons/FileText';
import type { Asset } from './types.ts';
import { MSD_GREEN } from '../../host/brand.ts';

const card = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  paddingX: 12,
  paddingY: 12,
  backgroundColor: 'layer-1',
  borderRadius: 'lg',
});

const thumb = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  borderRadius: 'default',
  backgroundColor: 'base',
  flexShrink: 0,
});

const meta = style({ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 });
const name = style({ font: 'ui', color: 'gray-900' });
const sub = style({ font: 'ui-sm', color: 'gray-600' });

const brandIcon = { '--iconPrimary': MSD_GREEN } as CSSProperties;

/** Compact header card describing the content under review. */
export function AssetCard({ asset }: { asset: Asset }) {
  return (
    <div className={card}>
      <span className={thumb}>
        <FileText UNSAFE_style={brandIcon} />
      </span>
      <div className={meta}>
        <Text styles={name}>{asset.name}</Text>
        <Text styles={sub}>
          {asset.channel} · {asset.market} · {asset.audience}
        </Text>
      </div>
    </div>
  );
}
