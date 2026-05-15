import type { Metadata } from 'next';
import WebsitesClient from './WebsitesClient';

export const metadata: Metadata = {
  title: 'Website Development',
  description:
    'Obsidia builds websites that convert visitors, load fast, and work correctly on every device: corporate sites, landing pages, e-commerce, and web applications.',
};

export default function WebsitesPage() {
  return <WebsitesClient />;
}
