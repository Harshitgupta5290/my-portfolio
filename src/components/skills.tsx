'use client';

import { motion } from 'framer-motion';

interface SkillsProps {
  data: { [key: string]: string[] };
}

const categoryIcons: { [key: string]: string } = {
  'Languages & Frameworks': '💻',
  'UI & Animation Libraries': '🎨',
  'DevOps & Cloud': '☁️',
  'Blockchain': '🔗',
  'Databases': '📊',
  'Tools & Platforms': '🛠️',
};

export function Skills({ data }: SkillsProps) {
  const skillCategories = Object.entries(data);

  return (
    <section id="skills" className="relative py-20 bg-ben-secondary">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-ben-primary rounded-full blur-3xl"/>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-ben-primary rounded-full blur-3xl"/>
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
            <span className="text-ben-text">Technical </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ben-primary to-ben-accent">
              Expertise
            </span>
          </h2>
          <p className="text-ben-muted text-lg">Mastered across modern web technologies and architectures</p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map(([category, skills], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-ben-secondary/80 to-ben-secondary/40 border border-ben-primary/20 rounded-2xl p-8 hover:border-ben-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-ben-primary/20">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-4xl">{categoryIcons[category] || '⭐'}</div>
                  <h3 className="text-2xl font-bold text-ben-text">{category}</h3>
                </div>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: skillIdx * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <div className="px-4 py-2 bg-gradient-to-r from-ben-primary/10 to-ben-primary/5 text-ben-text rounded-xl border border-ben-primary/30 text-sm font-medium hover:border-ben-primary/70 hover:bg-ben-primary/20 transition-all duration-300 cursor-default">
                        {skill}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
