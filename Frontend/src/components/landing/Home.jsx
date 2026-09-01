import { Hero } from './Hero.jsx';
import { HowItWorks } from './HowItWorks.jsx';
import { Features } from './Features.jsx';
import { Example } from './Example.jsx';
import { Faq } from './Faq.jsx';
import { Cta } from './Cta.jsx';
import { SiteFooter } from '../Footer.jsx';

export function Home() {
  return (
    <main className="page home">
      <Hero />
      <HowItWorks />
      <Features />
      <Example />
      <Faq />
      <Cta />
      <SiteFooter />
    </main>
  );
}
