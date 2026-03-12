import dynamic from 'next/dynamic';
import HeroSection from "./components/homepage/hero-section";
import AboutSection from "./components/homepage/about";

// Below-fold sections — code-split and client-only to reduce initial bundle
const Experience = dynamic(() => import('./components/homepage/experience'), { ssr: false });
const Skills = dynamic(() => import('./components/homepage/skills'), { ssr: false });
const Projects = dynamic(() => import('./components/homepage/projects'), { ssr: false });
const Education = dynamic(() => import('./components/homepage/education'), { ssr: false });
const Certifications = dynamic(() => import('./components/homepage/certifications'), { ssr: false });
const ContactSection = dynamic(() => import('./components/homepage/contact'), { ssr: false });

// async function getData() {
//   const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`)

//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }

//   const data = await res.json();

//   const filtered = data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);

//   return filtered;
// };

export default function Home() {

  return (
    <div suppressHydrationWarning >
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Certifications />
      {/* <Blog blogs={blogs} /> */}
      <ContactSection />
    </div>
  )
};