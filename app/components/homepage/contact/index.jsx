// @flow strict
import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaInstagram } from 'react-icons/fa';
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from './contact-form';

function ContactSection() {
  return (
    <div id="contact" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      {/* Top gradient line */}
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      {/* Section header */}
      <div className="flex flex-col items-center mt-12 mb-14">
        <p className="text-[#16f2b3] text-[10px] uppercase tracking-[5px] font-mono mb-4">
          // get in touch
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center leading-tight">
          Let&apos;s{' '}
          <span className="bg-gradient-to-r from-violet-400 to-[#16f2b3] bg-clip-text text-transparent">
            Connect
          </span>
        </h2>
        <p className="text-gray-600 text-sm mt-3 max-w-sm text-center font-mono leading-relaxed">
          Open to roles, freelance projects &amp; AI/backend collaborations
        </p>
        <div className="w-20 h-[2px] bg-gradient-to-r from-violet-500 to-[#16f2b3] mt-5 rounded-full" />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

        {/* LEFT column */}
        <div className="flex flex-col gap-6">

          {/* Contact info cards */}
          <div className="flex flex-col gap-3">
            {[
              { icon: MdAlternateEmail, label: "Email", value: personalData.email, href: `mailto:${personalData.email}`, color: "#16f2b3" },
              { icon: IoMdCall, label: "Phone", value: personalData.phone, href: `tel:${personalData.phone}`, color: "#a78bfa" },
              { icon: CiLocationOn, label: "Location", value: personalData.address, href: null, color: "#ec4899" },
            ].map(({ icon: Icon, label, value, href, color }) => (
              <div
                key={label}
                className="group flex items-center gap-4 p-4 rounded-xl border border-[#1b2c6840] bg-[#0d1224] hover:border-[#1b2c6880] transition-all duration-300"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${color}12`, border: `1px solid ${color}28` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest font-mono mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="text-gray-300 text-sm hover:text-white transition-colors duration-200 truncate block">
                      {value}
                    </a>
                  ) : (
                    <p className="text-gray-300 text-sm">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div>
            <p className="text-[10px] text-gray-600 uppercase tracking-widest font-mono mb-3">// find me on</p>
            <div className="flex items-center gap-3">
              {[
                { href: personalData.github, Icon: IoLogoGithub, label: "GitHub" },
                { href: personalData.linkedIn, Icon: BiLogoLinkedin, label: "LinkedIn" },
                { href: personalData.instagram, Icon: FaInstagram, label: "Instagram" },
              ].map(({ href, Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#1b2c6840] bg-[#0d1224] hover:border-[#16f2b3]/40 hover:bg-[#16f2b305] transition-all duration-300"
                >
                  <Icon size={15} className="text-gray-500 group-hover:text-[#16f2b3] transition-colors duration-300" />
                  <span className="text-gray-500 group-hover:text-gray-300 text-xs font-mono transition-colors duration-300">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Terminal availability widget */}
          <div className="rounded-xl border border-[#1b2c6840] bg-[#080d1a] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1b2c6830]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-gray-600 text-[10px] font-mono ml-2">status.sh</span>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-[9px] font-mono">live</span>
              </div>
            </div>
            <div className="p-5 font-mono text-xs space-y-2">
              <p>
                <span className="text-[#16f2b3]">$</span>
                <span className="text-gray-500"> check-availability --verbose</span>
              </p>
              <p className="text-gray-500 pl-2">
                {'>'} Status:{' '}
                <span className="text-green-400 font-semibold">Available</span> for opportunities
              </p>
              <p className="text-gray-500 pl-2">
                {'>'} Response: <span className="text-[#16f2b3]">within 24 hours</span>
              </p>
              <p className="text-gray-500 pl-2">
                {'>'} Timezone: <span className="text-violet-400">IST (UTC+5:30)</span>
              </p>
              <p className="text-gray-500 pl-2">
                {'>'} Open to: <span className="text-white">Full-time · Freelance · Contract</span>
              </p>
              <p className="mt-1">
                <span className="text-[#16f2b3]">$</span>
                <span className="inline-block w-2 h-3.5 bg-[#16f2b3]/60 ml-1 animate-pulse align-middle" />
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT column: Form */}
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
