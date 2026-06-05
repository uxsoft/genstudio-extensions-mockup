import type { ComponentType, CSSProperties, SVGProps } from 'react';

/** Light/dark color scheme, matching the Spectrum 2 Provider's `colorScheme`. */
export type ColorScheme = 'light' | 'dark';

/**
 * A Spectrum 2 workflow icon component. `UNSAFE_style` is included so callers
 * can set the `--iconPrimary` CSS variable to tint the icon.
 */
export type IconComponent = ComponentType<
  SVGProps<SVGSVGElement> & { UNSAFE_style?: CSSProperties }
>;

/**
 * Describes a single GenStudio right-panel add-on (extension).
 *
 * This mirrors the real GenStudio Extensibility model where each add-on
 * registers an icon in the right action rail and a panel that opens when the
 * icon is selected. Filling in a real extension later is just a matter of
 * editing its `Panel` component.
 */
export interface ExtensionDef {
  /** Stable id, used as the rail selection key. */
  id: string;
  /** Short name shown as the panel title and the rail tooltip. */
  label: string;
  /** One-line summary, shown under the title in the panel header. */
  description?: string;
  /** Icon rendered in the right action rail. */
  Icon: IconComponent;
  /** Panel body rendered inside the side panel when this add-on is active. */
  Panel: ComponentType;
}
