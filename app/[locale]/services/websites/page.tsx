import type { Metadata } from 'next';
import WebsitesClient from '../../../services/websites/WebsitesClient';

export const metadata: Metadata = { title: 'Website Development' };

export default function WebsitesPage() {
  return <WebsitesClient />;
}
