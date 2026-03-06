'use client';

import { motion } from 'framer-motion';
import { ProjectItem } from '@/lib/types';

interface ProjectsProps {
  data: ProjectItem[];
}

export function Projects({ data }: ProjectsProps) {
  return (
    <section id="projects" className="relative py-20 bg-ben-secondary">
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
            <span className="text-ben-text">Featured </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ben-primary to-ben-accent">
              Projects
            </span>
          </h2>
          <p className="text-ben-muted text-lg">High-impact solutions that drive measurable results</p>
        </motion.div>

        {/* Projects Grid */}
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.map((project, index) => (
              <motion.a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-full bg-gradient-to-br from-ben-secondary/80 to-ben-secondary/40 border-2 border-ben-primary/20 rounded-2xl overflow-hidden hover:border-ben-primary/70 transition-all duration-300 hover:shadow-lg hover:shadow-ben-primary/30 flex flex-col">
                  {/* Project Image */}
                  <div className="h-64 bg-gradient-to-br from-ben-primary/15 to-ben-primary/5 flex items-center justify-center overflow-hidden relative border-b border-ben-primary/20 group-hover:bg-gradient-to-br group-hover:from-ben-primary/25 group-hover:to-ben-primary/10 transition-all">
                    <svg
                      className="w-16 h-16 text-ben-primary/40 group-hover:text-ben-primary/70 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>

                  <div className="p-8 flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-ben-text mb-3 group-hover:text-ben-primary transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-ben-text/80 mb-6 leading-relaxed flex-1 line-clamp-4">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-ben-primary/15 text-ben-primary/90 rounded-lg text-xs font-medium border border-ben-primary/30 group-hover:border-ben-primary/60 group-hover:bg-ben-primary/25 transition-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                      className="inline-flex items-center text-ben-primary font-semibold group-hover:text-ben-primary/80 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      View Case Study
                      <svg
                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-ben-muted text-lg">Featured projects coming soon</p>
          </div>
        )}
      </div>
    </section>
  );
}
