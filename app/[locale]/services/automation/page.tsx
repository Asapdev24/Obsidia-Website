import type { Metadata } from 'next';
import AutomationClient from '../../../services/automation/AutomationClient';

export const metadata: Metadata = { title: 'Workflow Automation' };

export default function AutomationPage() {
  return <AutomationClient />;
}
