'use client';

import { motion } from 'framer-motion';
import { HeroSection } from '@/lib/types';

interface HeroProps {
  data: HeroSection;
}

export function Hero({ data }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const words = data.subtitle?.split(' ') || [];

  return (
    <section id="home" className="relative min-h-screen w-full bg-ben-secondary antialiased flex flex-col items-center justify-center">
      {/* Background blobs */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-ben-primary rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-ben-primary rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center md:min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto max-md:mt-7 space-y-9 md:space-y-16">
            <div className="text-center space-y-8">
              {/* Heading with gradient */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="absolute -inset-2 blur-3xl bg-gradient-to-r from-ben-primary/20 to-ben-accent/20 rounded-full" />
                <h1 className="relative text-6xl md:text-8xl font-bold mb-4">
                  <span className="text-ben-text">Hi, I'm </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-ben-primary to-ben-accent">
                    {data.name}
                  </span>
                </h1>
              </motion.div>

              {/* Divider line */}
              <motion.div
                className="flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-80 h-[1px] bg-gradient-to-r from-transparent via-ben-primary/50 to-transparent" />
              </motion.div>

              {/* Subtitle with text animation */}
              <motion.div
                className="text-center max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <div className="font-bold text-lg text-ben-muted">
                  <div className="mt-4">
                    <div className="dark:text-white text-white text-2xl leading-snug tracking-wide">
                      <div>
                        {words.map((word, idx) => (
                          <motion.span
                            key={idx}
                            className="dark:text-white text-white inline-block mr-1"
                            initial={{ opacity: 0, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            transition={{ delay: 0.5 + idx * 0.05, duration: 0.3 }}
                          >
                            {word}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                className="flex flex-wrap justify-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <motion.a
                  href="#contact"
                  className="px-8 py-4 rounded-full border border-ben-primary text-ben-primary font-medium text-lg hover:bg-ben-primary/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get in Touch
                </motion.a>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                {data.stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <span className="block text-3xl font-bold bg-gradient-to-r from-ben-primary to-ben-accent text-transparent bg-clip-text">
                      {stat.value}
                    </span>
                    <span className="text-ben-muted">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
