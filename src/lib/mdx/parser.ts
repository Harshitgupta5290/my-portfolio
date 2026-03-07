import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogMetadata {
  title: string;
  description: string;
  date: string;
  author?: string;
  tags: string[];
  category?: string;
  featured?: boolean;
  seoTitle?: string;
  seoDesc?: string;
  keywords?: string[];
  readingTime?: number;
  coverImage?: string;
}

export interface BlogPost {
  slug: string;
  content: string;
  metadata: BlogMetadata;
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

/**
 * Parse front matter from MDX file
 */
export function parseFrontMatter(fileContent: string): { data: Record<string, any>; content: string } {
  const { data, content } = matter(fileContent);
  return { data, content };
}

/**
 * Get all blog posts
 */
export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.mdx') || file.endsWith('.md'));

  const posts = files.map((file) => {
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: body } = parseFrontMatter(content);
    const slug = file.replace(/\.(mdx|md)$/, '');

    return {
      slug,
      content: body,
      metadata: {
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        author: data.author || 'You',
        tags: data.tags || [],
        category: data.category || 'general',
        featured: data.featured || false,
        seoTitle: data.seoTitle,
        seoDesc: data.seoDesc,
        keywords: data.keywords || [],
        readingTime: data.readingTime || calculateReadingTime(body),
        coverImage: data.coverImage,
      },
    };
  });

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
}

/**
 * Get single blog post by slug
 */
export function getBlogPost(slug: string): BlogPost | null {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      const mdPath = path.join(BLOG_DIR, `${slug}.md`);
      if (!fs.existsSync(mdPath)) {
        return null;
      }
      const content = fs.readFileSync(mdPath, 'utf-8');
      const { data, content: body } = parseFrontMatter(content);

      return {
        slug,
        content: body,
        metadata: {
          title: data.title || 'Untitled',
          description: data.description || '',
          date: data.date || new Date().toISOString(),
          author: data.author || 'You',
          tags: data.tags || [],
          category: data.category || 'general',
          featured: data.featured || false,
          seoTitle: data.seoTitle,
          seoDesc: data.seoDesc,
          keywords: data.keywords || [],
          readingTime: data.readingTime || calculateReadingTime(body),
          coverImage: data.coverImage,
        },
      };
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: body } = parseFrontMatter(content);

    return {
      slug,
      content: body,
      metadata: {
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        author: data.author || 'You',
        tags: data.tags || [],
        category: data.category || 'general',
        featured: data.featured || false,
        seoTitle: data.seoTitle,
        seoDesc: data.seoDesc,
        keywords: data.keywords || [],
        readingTime: data.readingTime || calculateReadingTime(body),
        coverImage: data.coverImage,
      },
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Create new blog post
 */
export function createBlogPost(slug: string, metadata: BlogMetadata, content: string): void {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }

  const frontMatter = `---
title: ${metadata.title}
description: ${metadata.description}
date: ${metadata.date}
author: ${metadata.author || 'You'}
tags: [${(metadata.tags || []).map((t) => `"${t}"`).join(', ')}]
category: ${metadata.category || 'general'}
featured: ${metadata.featured || false}
seoTitle: ${metadata.seoTitle || metadata.title}
seoDesc: ${metadata.seoDesc || metadata.description}
keywords: [${(metadata.keywords || []).map((k) => `"${k}"`).join(', ')}]
coverImage: ${metadata.coverImage || ''}
---`;

  const fileContent = `${frontMatter}\n\n${content}`;
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  fs.writeFileSync(filePath, fileContent, 'utf-8');
}

/**
 * Calculate reading time (minutes)
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Get featured blog posts
 */
export function getFeaturedBlogPosts(limit = 3): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.metadata.featured).slice(0, limit);
}

/**
 * Get blog posts by tag
 */
export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.metadata.tags.includes(tag));
}

/**
 * Get blog posts by category
 */
export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.metadata.category === category);
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllBlogPosts().forEach((post) => {
    post.metadata.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  getAllBlogPosts().forEach((post) => {
    if (post.metadata.category) {
      categories.add(post.metadata.category);
    }
  });
  return Array.from(categories).sort();
}
