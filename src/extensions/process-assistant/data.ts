import type { ActivationChannel, Asset, Substep } from './types.ts';
import UploadToCloud from '@react-spectrum/s2/icons/UploadToCloud';
import FileConvert from '@react-spectrum/s2/icons/FileConvert';
import FileText from '@react-spectrum/s2/icons/FileText';
import Publish from '@react-spectrum/s2/icons/Publish';
import Cloud from '@react-spectrum/s2/icons/Cloud';
import WebPage from '@react-spectrum/s2/icons/WebPage';

/** The content moving through the lifecycle — stands in for the GenStudio canvas selection. */
export const asset: Asset = {
  name: 'KEYTRUDA HCP Email — Spring Launch',
  brand: 'KEYTRUDA® (pembrolizumab)',
  channel: 'Email',
};

/** Mock counts shown by the read-only compliance step. */
export const complianceSummary = {
  mustFix: 0,
  warnings: 2,
  passed: 9,
};

/** The four strictly-sequential substeps of the medical-legal process step. */
export const substeps: Substep[] = [
  {
    id: 'workfront',
    Icon: UploadToCloud,
    label: 'Upload to Workfront',
    runningLabel: 'Uploading to Workfront…',
    actionLabel: 'Upload to Workfront',
    linkLabel: 'View in Workfront',
    href: 'https://merck.my.workfront.com/task/keytruda-hcp-email',
  },
  {
    id: 'rendition',
    Icon: FileConvert,
    label: 'Viewable rendition',
    runningLabel: 'Generating viewable PDF…',
    actionLabel: 'Create viewable rendition',
    linkLabel: 'Review rendition PDF',
    href: 'https://merck.my.workfront.com/document/keytruda-hcp-email.pdf',
  },
  {
    id: 'promomats',
    Icon: FileText,
    label: 'PromoMats material',
    runningLabel: 'Creating material & attaching rendition…',
    actionLabel: 'Create in PromoMats',
    linkLabel: 'Open material in PromoMats',
    href: 'https://merck.veevavault.com/ui/#doc_info/keytruda-hcp-email',
  },
  {
    id: 'approved',
    Icon: Publish,
    label: 'Approved for distribution',
    runningLabel: 'Checking PromoMats status…',
    actionLabel: 'Check approval status',
    linkLabel: 'View approval record',
    href: 'https://merck.veevavault.com/ui/#doc_info/keytruda-hcp-email/workflow',
    poll: true,
  },
];

/** Activation channels — sent in any order, multiple allowed. */
export const channels: ActivationChannel[] = [
  {
    id: 'sfmc',
    Icon: Cloud,
    label: 'Salesforce Marketing Cloud',
    blurb: 'Deploy as an HCP email send',
    actionLabel: 'Send to SFMC',
    linkLabel: 'View in SFMC',
    href: 'https://mc.salesforce.com/email/keytruda-hcp-email',
  },
  {
    id: 'wordpress',
    Icon: WebPage,
    label: 'WordPress',
    blurb: 'Publish to the HCP portal',
    actionLabel: 'Send to WordPress',
    linkLabel: 'View published post',
    href: 'https://hcp.keytruda.com/wp-admin/post/keytruda-hcp-email',
  },
];
