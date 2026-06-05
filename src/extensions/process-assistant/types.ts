import type { IconComponent } from '../../host/types.ts';

/** Status of a top-level lifecycle step. Steps are strictly sequential. */
export type StepStatus = 'locked' | 'active' | 'done';

/** State of a single simulated async action (a substep or a channel send). */
export type ActionState = 'idle' | 'running' | 'done';

/** One sequential substep inside the medical-legal process step. */
export interface Substep {
  id: string;
  /** Category icon shown muted to the left of the label. */
  Icon: IconComponent;
  label: string;
  /** Shown while the action runs. */
  runningLabel: string;
  /** Primary button label in the idle state. */
  actionLabel: string;
  /** Link text shown once the substep completes. */
  linkLabel: string;
  /** Mock destination the completed substep links to. */
  href: string;
  /** Longer simulated delay for the polled "approved for distribution" substep. */
  poll?: boolean;
}

/** An activation channel the finished content can be sent to (order-independent). */
export interface ActivationChannel {
  id: string;
  Icon: IconComponent;
  label: string;
  /** One-line description shown under the channel name. */
  blurb: string;
  /** Button label in the idle state. */
  actionLabel: string;
  /** Link text shown once sent. */
  linkLabel: string;
  /** Mock destination the sent content links to. */
  href: string;
}

/** The piece of content moving through the lifecycle — stands in for the GenStudio canvas selection. */
export interface Asset {
  name: string;
  brand: string;
  channel: string;
}
