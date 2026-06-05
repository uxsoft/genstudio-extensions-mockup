import type { IconComponent } from '../../host/types.ts';

/** Severity of a single compliance check result. */
export type CheckStatus = 'pass' | 'warning' | 'critical' | 'info';

/** The two compliance pillars the assistant reviews. */
export type CheckGroup = 'brand' | 'medlegal';

/** How an approved-claims match is classified. */
export type ClaimMatch = 'exact' | 'similar' | 'unrecognized';

/** A single detected marketing claim and how it maps to the approved library. */
export interface Claim {
  text: string;
  match: ClaimMatch;
  /** Approved claim reference (for exact/similar), or the reason it's flagged. */
  note: string;
}

/** One reviewable line item inside a compliance group. */
export interface Check {
  id: string;
  group: CheckGroup;
  /** Category icon shown muted to the left of the label. */
  Icon: IconComponent;
  label: string;
  status: CheckStatus;
  /** One-line result shown under the label. */
  summary: string;
  /** Expanded explanation. */
  detail: string;
  /** A quoted snippet from the content that triggered the finding. */
  evidence?: string;
  /** Primary remediation button label (only shown when fixable). */
  actionLabel?: string;
  /** Sentence shown after the user applies the primary action. */
  resolution?: string;
  /** Reference resource (e.g. an SOP) surfaced in the detail. */
  resourceLabel?: string;
  /** Renders the claims breakdown table inside the expanded panel. */
  claims?: Claim[];
}

/** The MLR review tier the assistant recommends for the content. */
export interface ReviewTier {
  id: string;
  name: string;
  blurb: string;
  /** Bulleted rationale for the recommendation. */
  rationale: string[];
}

/** The piece of content currently selected on the GenStudio canvas. */
export interface Asset {
  name: string;
  brand: string;
  channel: string;
  market: string;
  audience: string;
}
