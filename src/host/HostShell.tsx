import { useState } from 'react';
import { Switch } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { RightRail } from './RightRail.tsx';
import { SidePanel } from './SidePanel.tsx';
import { extensions } from './extensionRegistry.ts';
import type { ColorScheme } from './types.ts';

const shell = style({
  display: 'flex',
  height: 'full',
  width: 'full',
});

// Neutral stand-in for the GenStudio canvas. Scope is "right sidepanel only",
// so the canvas is intentionally a calm, empty surface.
const canvas = style({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'gray-50',
});

const toolbar = style({
  display: 'flex',
  alignItems: 'center',
  paddingX: 16,
  paddingY: 12,
});

const canvasBody = style({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  font: 'ui',
  color: 'gray-500',
});

interface HostShellProps {
  colorScheme: ColorScheme;
  onColorSchemeChange: (scheme: ColorScheme) => void;
}

export function HostShell({ colorScheme, onColorSchemeChange }: HostShellProps) {
  const [activeId, setActiveId] = useState<string | null>(extensions[0]?.id ?? null);

  const active = extensions.find((ext) => ext.id === activeId) ?? null;

  const toggle = (id: string) => setActiveId((current) => (current === id ? null : id));

  return (
    <div className={shell}>
      <div className={canvas}>
        <div className={toolbar}>
          <Switch
            isSelected={colorScheme === 'dark'}
            onChange={(isDark) => onColorSchemeChange(isDark ? 'dark' : 'light')}
          >
            Dark mode
          </Switch>
        </div>
        <div className={canvasBody}>GenStudio canvas</div>
      </div>

      {active ? (
        <SidePanel
          title={active.label}
          description={active.description}
          onClose={() => setActiveId(null)}
        >
          <active.Panel />
        </SidePanel>
      ) : null}

      <RightRail extensions={extensions} activeId={activeId} onSelect={toggle} />
    </div>
  );
}
