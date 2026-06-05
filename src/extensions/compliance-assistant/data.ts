import type { Asset, Check, ReviewTier } from './types.ts';
import TextHighlight from '@react-spectrum/s2/icons/TextHighlight';
import CommentText from '@react-spectrum/s2/icons/CommentText';
import TextSize from '@react-spectrum/s2/icons/TextSize';
import FontPicker from '@react-spectrum/s2/icons/FontPicker';
import FileText from '@react-spectrum/s2/icons/FileText';
import MagicWand from '@react-spectrum/s2/icons/MagicWand';
import Flag from '@react-spectrum/s2/icons/Flag';
import History from '@react-spectrum/s2/icons/Clock';
import Tag from '@react-spectrum/s2/icons/Tag';
import Image from '@react-spectrum/s2/icons/Image';
import BadgeVerified from '@react-spectrum/s2/icons/BadgeVerified';
import FileUser from '@react-spectrum/s2/icons/FileUser';

/** The content the assistant is reviewing — stands in for the GenStudio canvas selection. */
export const asset: Asset = {
  name: 'KEYTRUDA HCP Email — Spring Launch',
  brand: 'KEYTRUDA® (pembrolizumab)',
  channel: 'Email',
  market: 'US',
  audience: 'Healthcare professionals',
};

export const checks: Check[] = [
  // ---- Brand compliance ----
  {
    id: 'spelling',
    group: 'brand',
    Icon: TextHighlight,
    label: 'Spelling',
    status: 'pass',
    summary: 'No spelling issues found.',
    detail:
      'All copy was checked against the US English brand dictionary, including the product and indication terms.',
  },
  {
    id: 'grammar',
    group: 'brand',
    Icon: CommentText,
    label: 'Grammar',
    status: 'warning',
    summary: '1 issue — scientific-style agreement.',
    detail:
      'In scientific writing “data” takes a plural verb. The body copy uses “data shows”; brand style guide §3.2 recommends “data show”.',
    evidence: '“Clinical data shows a meaningful survival benefit…”',
    actionLabel: 'Apply suggestion',
    resolution: 'Updated to “data show” to match brand style.',
  },
  {
    id: 'font-size',
    group: 'brand',
    Icon: TextSize,
    label: 'Font sizes',
    status: 'warning',
    summary: 'ISI footnote below minimum size.',
    detail:
      'Legal and safety copy must be at least 9px. The ISI footnote is currently set to 7px, which fails the brand accessibility minimum.',
    evidence: 'ISI footnote · 7px (minimum 9px)',
    actionLabel: 'Resize to 9px',
    resolution: 'ISI footnote resized to 9px.',
  },
  {
    id: 'font-style',
    group: 'brand',
    Icon: FontPicker,
    label: 'Font style',
    status: 'pass',
    summary: 'Typefaces match the brand kit.',
    detail:
      'Headlines use Invention Bold and body uses Invention Regular, both from the approved KEYTRUDA brand font kit.',
  },
  {
    id: 'sops',
    group: 'brand',
    Icon: FileText,
    label: 'SOPs & resources',
    status: 'pass',
    summary: 'Aligns with SOP-204 (HCP Email).',
    detail:
      'Layout, footer and unsubscribe handling follow the current Standard Operating Procedure for HCP email.',
    resourceLabel: 'SOP-204 · HCP Email v4',
  },
  {
    id: 'rephrasing',
    group: 'brand',
    Icon: MagicWand,
    label: 'Rephrasing suggestions',
    status: 'info',
    summary: '2 optional suggestions to improve clarity.',
    detail:
      'Tighten the subheading for skimmability and lead the CTA with an active verb. These are optional and do not affect compliance.',
    evidence: '“Learn about the data that may help your patients” → “See the survival data”',
    actionLabel: 'Apply suggestions',
    resolution: '2 rephrasing suggestions applied.',
  },

  // ---- Medical & legal compliance ----
  {
    id: 'isi-present',
    group: 'medlegal',
    Icon: Flag,
    label: 'Required safety information',
    status: 'critical',
    summary: 'Important Safety Information section is missing.',
    detail:
      'The required Important Safety Information (ISI) and boxed-warning block were not detected in this asset. HCP promotional email may not be distributed without fair-balance safety information.',
    actionLabel: 'Insert approved ISI',
    resolution: 'Approved ISI block inserted from the content library.',
  },
  {
    id: 'isi-current',
    group: 'medlegal',
    Icon: History,
    label: 'Safety information up to date',
    status: 'warning',
    summary: 'References a superseded PI version.',
    detail:
      'Cited safety wording maps to the Prescribing Information dated Jun 2024. The current approved PI is dated Mar 2026 and revises two adverse-reaction frequencies.',
    evidence: 'Detected: PI Jun 2024 · Current: PI Mar 2026',
    actionLabel: 'Update to current PI',
    resolution: 'Safety wording updated to the Mar 2026 PI.',
  },
  {
    id: 'label',
    group: 'medlegal',
    Icon: FileUser,
    label: 'Product label correct',
    status: 'pass',
    summary: 'Label matches the approved US PI.',
    detail:
      'Product name, indication and dosing reflect the approved KEYTRUDA® (pembrolizumab) US Prescribing Information for first-line treatment.',
  },
  {
    id: 'images',
    group: 'medlegal',
    Icon: Image,
    label: 'Images align with brand rules',
    status: 'pass',
    summary: '2 images checked — both compliant.',
    detail:
      'Both images are sourced from the approved DAM library, carry the required photo disclaimer, and respect logo clear-space rules.',
  },
  {
    id: 'claims',
    group: 'medlegal',
    Icon: Tag,
    label: 'Claims validation',
    status: 'warning',
    summary: '7 claims · 4 exact, 2 similar, 1 unrecognized.',
    detail:
      'Each detected claim is matched against the approved claims library. Similar claims need medical sign-off; an unrecognized claim cannot be used until it is substantiated and approved.',
    claims: [
      {
        text: 'Demonstrated superior overall survival vs chemotherapy',
        match: 'exact',
        note: 'Matches approved claim MRK-1042',
      },
      {
        text: 'Significantly improved progression-free survival',
        match: 'exact',
        note: 'Matches approved claim MRK-1058',
      },
      {
        text: 'Indicated for first-line treatment',
        match: 'exact',
        note: 'Matches approved indication statement',
      },
      {
        text: 'Manageable safety profile',
        match: 'exact',
        note: 'Matches approved claim MRK-1071',
      },
      {
        text: 'The most prescribed anti-PD-1 therapy',
        match: 'similar',
        note: 'Close to MRK-0990 — wording differs, needs MLR sign-off',
      },
      {
        text: 'Well tolerated across patient groups',
        match: 'similar',
        note: 'Requires a tolerability qualifier to match MRK-1071',
      },
      {
        text: 'Proven to extend lives',
        match: 'unrecognized',
        note: 'Not in the approved library — unsubstantiated, remove or substantiate',
      },
    ],
  },
  {
    id: 'logo',
    group: 'medlegal',
    Icon: BadgeVerified,
    label: 'Logo style guidelines',
    status: 'pass',
    summary: 'Logo placement and clear space verified.',
    detail:
      'The KEYTRUDA logo uses the approved lockup, color and minimum clear space for the email header.',
  },
];

/** The recommended MLR review tier, escalated by the critical and unrecognized findings. */
export const recommendedTier: ReviewTier = {
  id: 'tier-3',
  name: 'Tier 3 — Full MLR committee review',
  blurb: 'Escalated. Regulatory-critical findings require medical, legal and regulatory sign-off before release.',
  rationale: [
    'Required Important Safety Information is missing (regulatory-critical)',
    '1 unrecognized claim needs medical substantiation',
    'Safety wording references a superseded PI version',
  ],
};

/** The full tier ladder, shown for context under the recommendation. */
export const reviewTiers = [
  { id: 'tier-1', name: 'Tier 1', blurb: 'Async copy review' },
  { id: 'tier-2', name: 'Tier 2', blurb: 'Standard MLR review' },
  { id: 'tier-3', name: 'Tier 3', blurb: 'Full MLR committee' },
];
