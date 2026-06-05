import type { CSSProperties } from 'react';
import { ToggleButton, TooltipTrigger, Tooltip } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import type { ExtensionDef } from './types.ts';
import { MSD_GREEN } from './brand.ts';

// S2 icons take their color from the `--iconPrimary` CSS variable. Setting it
// inline accents every add-on icon with the MSD brand green across states.
const accent = { '--iconPrimary': MSD_GREEN } as CSSProperties;

const rail = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
  width: 56,
  height: 'full',
  paddingY: 8,
  backgroundColor: 'layer-1',
  borderStartWidth: 1,
  borderColor: 'gray-200',
  borderStyle: 'solid',
});

interface RightRailProps {
  extensions: ExtensionDef[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

/**
 * The far-right vertical action rail. One quiet toggle button per add-on; the
 * active add-on stays highlighted, matching the GenStudio right action bar.
 */
export function RightRail({ extensions, activeId, onSelect }: RightRailProps) {
  return (
    <div className={rail}>
      {extensions.map(({ id, label, Icon }) => (
        <TooltipTrigger key={id} placement="start">
          <ToggleButton
            isQuiet
            aria-label={label}
            isSelected={activeId === id}
            onPress={() => onSelect(id)}
          >
            <Icon UNSAFE_style={accent} />
          </ToggleButton>
          <Tooltip>{label}</Tooltip>
        </TooltipTrigger>
      ))}
    </div>
  );
}
