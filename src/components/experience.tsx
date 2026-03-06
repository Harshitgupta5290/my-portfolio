'use client';

import { motion } from 'framer-motion';
import { ExperienceItem } from '@/lib/types';

interface ExperienceProps {
  data: ExperienceItem[];
}

export function Experience({ data }: ExperienceProps) {
  return (
    <section id="experience" className="relative min-h-screen py-20 bg-ben-secondary">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-ben-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-ben-primary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-ben-text">Professional </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ben-primary to-ben-accent">
              Journey
            </span>
          </h2>
          <p className="text-ben-muted text-lg">Delivering impact across innovative organizations</p>
        </motion.div>

        {/* Experience items */}
        <div className="max-w-4xl mx-auto space-y-8">
          {data.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-ben-secondary/80 to-ben-secondary/40 border border-ben-primary/20 rounded-2xl p-8 hover:border-ben-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-ben-primary/20">
                {/* Company Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-ben-text">{job.company}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-ben-primary font-semibold">{job.position}</span>
                  </div>
                </div>

                {/* Meta information */}
                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-2 text-ben-muted">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {job.duration}
                  </div>
                  <div className="flex items-center gap-2 text-ben-muted">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {job.location}
                  </div>
                </div>

                {/* Responsibilities */}
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex gap-3 text-ben-text/90 leading-relaxed">
                      <span className="text-ben-primary flex-shrink-0 mt-1">›</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
