import {
  Navbar,
  Hero,
  Experience,
  Skills,
  Projects,
  Blog,
  FAQSection,
  Contact,
} from '@/components';
import { getPortfolioData } from '@/lib/parser';

export default function Home() {
  const portfolioData = getPortfolioData();

  return (
    <main className="bg-ben-secondary">
      <Navbar />
      <Hero data={portfolioData.hero} />
      <Experience data={portfolioData.experience} />
      <Skills data={portfolioData.skills} />
      <Projects data={portfolioData.projects} />
      <Blog />
      <FAQSection data={portfolioData.faqs} />
      <Contact data={portfolioData.contact} />

      {/* Footer */}
      <footer className="border-t border-ben-accent/10 p-8 text-center text-ben-muted">
        <p>© 2024 Harshit Gupta. All rights reserved.</p>
      </footer>
    </main>
  );
}
