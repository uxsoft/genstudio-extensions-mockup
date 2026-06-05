import { useState } from 'react';
import { Provider } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { HostShell } from './host/HostShell.tsx';
import type { ColorScheme } from './host/types.ts';

export function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');

  return (
    <Provider colorScheme={colorScheme} styles={style({ height: 'full' })}>
      <HostShell
        colorScheme={colorScheme}
        onColorSchemeChange={setColorScheme}
      />
    </Provider>
  );
}
