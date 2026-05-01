import type { Metadata } from 'next';
import AutomationClient from './AutomationClient';

export const metadata: Metadata = {
  title: 'Workflow Automation — Obsidia',
  description:
    'Obsidia builds custom workflow automations that eliminate manual work, cut approval times, and connect your business tools. Approval routing, data integration, reporting pipelines, and custom operations.',
};

export default function AutomationPage() {
  return <AutomationClient />;
}
