import type { Metadata } from 'next';
import WebsitesClient from './WebsitesClient';

export const metadata: Metadata = { title: 'Website Development' };

export default function WebsitesPage() {
  return <WebsitesClient />;
}
