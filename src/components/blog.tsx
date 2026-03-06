'use client';

import { motion } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  link: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Full-Stack Type Safety: From Database to Frontend',
    excerpt: 'Type errors at runtime are embarrassing. With modern tooling, you can achieve complete type safety from your database layer all the way to your UI.',
    category: 'TypeScript',
    date: 'Mar 6, 2026',
    readTime: '3 min read',
    link: '#',
  },
  {
    id: '2',
    title: 'Server Components vs Client Components: The Definitive Decision Guide',
    excerpt: 'The use client directive has caused more confusion than clarity. When should components run on the server vs client? Here\'s the guide.',
    category: 'React',
    date: 'Mar 5, 2026',
    readTime: '3 min read',
    link: '#',
  },
  {
    id: '3',
    title: 'RAG in 2026: Vector Databases Are Just the Beginning',
    excerpt: 'Retrieval-Augmented Generation has matured beyond simple vector search. Hybrid retrieval, reranking, and complex workflows are now the standard.',
    category: 'AI/ML',
    date: 'Mar 4, 2026',
    readTime: '3 min read',
    link: '#',
  },
  {
    id: '4',
    title: 'Building Your First AI Agent: A Practical Tutorial',
    excerpt: 'Learn how to create an AI agent from scratch. We\'ll build a tool-using autonomous agent that can browse the web and write code.',
    category: 'AI/ML',
    date: 'Mar 3, 2026',
    readTime: '5 min read',
    link: '#',
  },
  {
    id: '5',
    title: 'TypeScript 5.5+ Advanced Patterns: Beyond the Basics',
    excerpt: 'Const type parameters, template type inference improvements, and more. Learn the advanced patterns that make TypeScript truly powerful.',
    category: 'TypeScript',
    date: 'Mar 2, 2026',
    readTime: '4 min read',
    link: '#',
  },
  {
    id: '6',
    title: 'React 19 Deep Dive: The Compiler Changes Everything',
    excerpt: 'React\'s new compiler is a game-changer. We\'ll dive deep into how it optimizes your app and what it means for your architecture.',
    category: 'React',
    date: 'Mar 1, 2026',
    readTime: '6 min read',
    link: '#',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function Blog() {
  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-ben-secondary">
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
            <span className="text-ben-text">Latest </span>
            <span className="text-ben-primary">Articles</span>
          </h2>
          <p className="text-ben-muted text-lg max-w-2xl mx-auto">
            Insights on modern web development, architecture patterns, and emerging technologies
          </p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {blogPosts.map((post) => (
            <motion.a
              key={post.id}
              href={post.link}
              variants={itemVariants}
              className="group h-full"
              whileHover={{ y: -5 }}
            >
              <div className="h-full bg-gradient-to-br from-ben-secondary/80 to-ben-secondary/40 border border-ben-primary/20 rounded-2xl overflow-hidden p-8 flex flex-col hover:border-ben-primary/50 hover:shadow-lg hover:shadow-ben-primary/20 transition-all duration-300">
                {/* Meta Info */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-ben-primary/10">
                  <span className="text-xs font-semibold text-ben-primary bg-ben-primary/15 px-3 py-1.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-ben-muted font-medium">{post.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-ben-text mb-3 group-hover:text-ben-primary transition-colors duration-300 line-clamp-2 leading-tight">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-ben-muted/80 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Footer with Date and Arrow */}
                <div className="pt-4 border-t border-ben-primary/10 flex items-center justify-between">
                  <span className="text-xs text-ben-muted font-medium flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1 4.5 4.5 0 1-3.764 6.233z" />
                    </svg>
                    {post.date}
                  </span>
                  <svg className="w-4 h-4 text-ben-primary group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
