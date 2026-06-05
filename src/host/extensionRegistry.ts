import type { ExtensionDef } from './types.ts';
import ComplianceIcon from '@react-spectrum/s2/icons/BadgeVerified';
import ProcessIcon from '@react-spectrum/s2/icons/ListNumbered';
import { CompliancePanel } from '../extensions/compliance-assistant/CompliancePanel.tsx';
import { ProcessPanel } from '../extensions/process-assistant/ProcessPanel.tsx';

/**
 * The set of add-ons mounted into the GenStudio right sidepanel. The host
 * shell renders one rail icon + panel slot per entry, so adding or refining an
 * extension later is a single edit here.
 */
export const extensions: ExtensionDef[] = [
  {
    id: 'compliance-assistant',
    label: 'Compliance Assistant',
    description: 'Brand & medical-legal review for this content.',
    Icon: ComplianceIcon,
    Panel: CompliancePanel,
  },
  {
    id: 'process-assistant',
    label: 'Process Assistant',
    description: 'Placeholder add-on — content to be defined.',
    Icon: ProcessIcon,
    Panel: ProcessPanel,
  },
];
