export interface Stat {
  label: string;
  value: string;
}

export interface HeroSection {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  stats: Stat[];
}

export interface About {
  shortBio: string;
  longBio: string;
}

export interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  location: string;
  responsibilities: string[];
}

export interface Skill {
  category: string;
  skills: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Contact {
  email: string;
  phone: string;
  location: string;
  socialLinks: SocialLink[];
}

export interface PortfolioData {
  hero: HeroSection;
  about: About;
  experience: ExperienceItem[];
  skills: { [key: string]: string[] };
  projects: ProjectItem[];
  faqs: FAQ[];
  contact: Contact;
}
