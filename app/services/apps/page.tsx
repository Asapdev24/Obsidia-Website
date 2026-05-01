import type { Metadata } from 'next';
import AppsClient from './AppsClient';

export const metadata: Metadata = {
  title: 'Application Development — Obsidia',
  description:
    'Obsidia builds custom mobile apps, internal tools, client portals, and dashboards designed around how your business actually works — not around off-the-shelf templates.',
};

export default function AppsPage() {
  return <AppsClient />;
}
