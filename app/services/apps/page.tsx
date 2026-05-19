import type { Metadata } from 'next';
import AppsClient from './AppsClient';

export const metadata: Metadata = { title: 'Application Development' };

export default function AppsPage() {
  return <AppsClient />;
}
