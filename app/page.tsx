import Hero from './components/Hero';
import ProblemStatement from './components/ProblemStatement';
import HomeServicesSignpost from './components/HomeServicesSignpost';
import ValuePillars from './components/ValuePillars';
import CTABand from './components/CTABand';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemStatement />
      <HomeServicesSignpost />
      <ValuePillars />
      <CTABand />
    </>
  );
}
