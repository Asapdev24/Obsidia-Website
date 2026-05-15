import type { Metadata } from 'next';
import ServicesClient from '../../services/ServicesClient';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Three disciplines. One partner. Obsidia builds workflow automations, websites, and custom applications for businesses that are serious about how they operate.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
