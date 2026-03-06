'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ } from '@/lib/types';

interface FAQProps {
  data: FAQ[];
}

const categories = ['All', 'Services', 'Technical', 'General'];

export function FAQSection({ data }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Add categories to FAQs based on their index
  const faqsWithCategories = data.map((faq, idx) => {
    const categoryMap: { [key: number]: string } = {
      0: 'Services',
      1: 'Technical',
      2: 'Services',
      3: 'General',
      4: 'Technical',
    };
    return { ...faq, category: categoryMap[idx % 5] || 'General' };
  });

  const filteredFAQs =
    selectedCategory === 'All'
      ? faqsWithCategories
      : faqsWithCategories.filter((faq) => (faq as any).category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-ben-secondary">
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
            <span className="text-ben-text">Frequently </span>
            <span className="text-ben-primary">Asked Questions</span>
          </h2>
          <p className="text-ben-muted text-lg max-w-2xl mx-auto">
            Quick answers to help you understand our services and capabilities better
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-ben-primary text-black shadow-lg shadow-ben-primary/40'
                  : 'bg-ben-secondary border border-ben-primary/30 text-ben-text hover:border-ben-primary/60 hover:bg-ben-primary/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {filteredFAQs.map((faq, index) => {
                const originalIndex = data.indexOf(faq);
                return (
                  <motion.div
                    key={`${selectedCategory}-${index}`}
                    variants={itemVariants}
                    className="bg-gradient-to-br from-ben-secondary/80 to-ben-secondary/40 border border-ben-primary/20 rounded-2xl overflow-hidden hover:border-ben-primary/50 transition-all duration-300"
                    layout
                  >
                    <motion.button
                      onClick={() =>
                        setOpenIndex(
                          openIndex === originalIndex ? null : originalIndex
                        )
                      }
                      className="w-full px-8 py-5 flex items-center justify-between hover:bg-ben-primary/5 transition-all duration-300 group"
                    >
                      <h3 className="text-lg md:text-xl font-semibold text-ben-text text-left group-hover:text-ben-primary transition-colors duration-300">
                        {faq.question}
                      </h3>
                      <motion.svg
                        className="w-6 h-6 text-ben-primary flex-shrink-0 ml-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{
                          rotate: openIndex === originalIndex ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </motion.svg>
                    </motion.button>

                    <AnimatePresence>
                      {openIndex === originalIndex && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-8 py-6 border-t border-ben-primary/20 bg-ben-primary/5">
                            <p className="text-ben-text/90 leading-relaxed mb-4">{faq.answer}</p>
                            <div>
                              <span className="text-xs font-semibold text-ben-primary bg-ben-primary/15 px-3 py-1.5 rounded-full inline-block">
                                {(faq as any).category}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
