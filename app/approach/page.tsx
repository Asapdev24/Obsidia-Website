import type { Metadata } from 'next';
import ApproachClient from './ApproachClient';

export const metadata: Metadata = {
  title: 'Approach — Obsidia',
  description:
    'How Obsidia thinks about digital services — our four-phase process from audit to handoff, and the principles we hold ourselves to.',
};

export default function ApproachPage() {
  return <ApproachClient />;
}
