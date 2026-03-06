'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Contact as ContactType } from '@/lib/types';

interface ContactProps {
  data: ContactType;
}

export function Contact({ data }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent! (This is a demo)');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-ben-secondary">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-ben-text">Get </span>
            <span className="text-ben-primary">In Touch</span>
          </h2>
          <p className="text-ben-muted text-lg max-w-2xl mx-auto">
            Ready to collaborate on your next project? Let's discuss how we can partner to create exceptional digital solutions that drive measurable business impact.
          </p>
        </motion.div>

        {/* Direct Connection Methods */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Email Card */}
          <motion.a
            href={`mailto:${data.email}`}
            variants={itemVariants}
            className="group bg-gradient-to-br from-ben-secondary/80 to-ben-secondary/40 border border-ben-primary/20 rounded-2xl p-8 hover:border-ben-primary/50 transition-all duration-300 flex flex-col items-center text-center"
            whileHover={{ y: -5, boxShadow: '0 0 30px rgba(0, 255, 136, 0.2)' }}
          >
            <div className="w-14 h-14 bg-ben-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-ben-primary/20 transition-colors duration-300">
              <svg className="w-7 h-7 text-ben-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Email</h3>
            <p className="text-ben-primary group-hover:text-ben-accent transition-colors duration-300 break-all">{data.email}</p>
          </motion.a>

          {/* Phone Card */}
          <motion.a
            href={`tel:${data.phone}`}
            variants={itemVariants}
            className="group bg-gradient-to-br from-ben-secondary/80 to-ben-secondary/40 border border-ben-primary/20 rounded-2xl p-8 hover:border-ben-primary/50 transition-all duration-300 flex flex-col items-center text-center"
            whileHover={{ y: -5, boxShadow: '0 0 30px rgba(0, 255, 136, 0.2)' }}
          >
            <div className="w-14 h-14 bg-ben-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-ben-primary/20 transition-colors duration-300">
              <svg className="w-7 h-7 text-ben-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Phone</h3>
            <p className="text-ben-primary group-hover:text-ben-accent transition-colors duration-300">{data.phone}</p>
          </motion.a>

          {/* Location Card */}
          <motion.div
            variants={itemVariants}
            className="group bg-gradient-to-br from-ben-secondary/80 to-ben-secondary/40 border border-ben-primary/20 rounded-2xl p-8 hover:border-ben-primary/50 transition-all duration-300 flex flex-col items-center text-center"
            whileHover={{ y: -5, boxShadow: '0 0 30px rgba(0, 255, 136, 0.2)' }}
          >
            <div className="w-14 h-14 bg-ben-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-ben-primary/20 transition-colors duration-300">
              <svg className="w-7 h-7 text-ben-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Location</h3>
            <p className="text-ben-muted">{data.location}</p>
          </motion.div>
        </motion.div>

        {/* Contact Form & Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Send Message</h3>

            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 bg-ben-primary/10 border border-ben-primary/30 rounded-lg text-ben-text placeholder-ben-muted focus:outline-none focus:border-ben-primary focus:bg-ben-primary/20 transition-all duration-300"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 bg-ben-primary/10 border border-ben-primary/30 rounded-lg text-ben-text placeholder-ben-muted focus:outline-none focus:border-ben-primary focus:bg-ben-primary/20 transition-all duration-300"
              />
            </div>

            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject (Optional)"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-ben-primary/10 border border-ben-primary/30 rounded-lg text-ben-text placeholder-ben-muted focus:outline-none focus:border-ben-primary focus:bg-ben-primary/20 transition-all duration-300"
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Tell me about your project or inquiry *"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-5 py-3 bg-ben-primary/10 border border-ben-primary/30 rounded-lg text-ben-text placeholder-ben-muted focus:outline-none focus:border-ben-primary focus:bg-ben-primary/20 transition-all duration-300 resize-none"
              />
            </div>

            <motion.button
              type="submit"
              className="w-full px-6 py-3 bg-ben-primary text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-ben-primary/30 transition-all duration-300"
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(0, 255, 136, 0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </motion.form>

          {/* Direct Connection Methods */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Direct Connection</h3>

            {data.socialLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-gradient-to-br from-ben-secondary/80 to-ben-secondary/40 border border-ben-primary/20 rounded-xl hover:border-ben-primary/50 transition-all duration-300 group"
                whileHover={{ x: 8, boxShadow: '0 0 30px rgba(0, 255, 136, 0.2)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-ben-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-ben-primary/20 transition-colors duration-300">
                  {link.platform === 'Email' && (
                    <svg className="w-6 h-6 text-ben-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  {link.platform === 'LinkedIn' && (
                    <svg className="w-6 h-6 text-ben-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  )}
                  {link.platform === 'GitHub' && (
                    <svg className="w-6 h-6 text-ben-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  )}
                  {link.platform === 'Twitter' && (
                    <svg className="w-6 h-6 text-ben-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7a10.6 10.6 0 01-9.5 5M23 3" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-ben-text font-semibold group-hover:text-ben-primary transition-colors duration-300">{link.platform}</p>
                  <p className="text-ben-muted text-sm truncate">{link.url}</p>
                </div>
                <svg className="w-5 h-5 text-ben-primary flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
