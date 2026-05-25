"use client";
// @flow strict
import { featuredBlogs } from '@/utils/data/blogs-data';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import BlogCard from './blog-card';
import { useLocale } from "@/app/context/locale-context";
import SectionHeading from "../../helper/section-heading";

function Blog() {
  const { t } = useLocale();
  return (
    <div id='blogs' className="relative z-50 border-t my-12 lg:my-24 border-[var(--line)]">
      <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-20"></div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <SectionHeading eyebrow="Thoughts &amp; writing" plain={t("blogs.latest")} gradient={t("blogs.label")} subtitle={t("blogs.subtitle")} className="my-5 lg:py-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-8">
        {featuredBlogs.map((blog, i) => (
          <BlogCard blog={blog} index={i} key={blog.id} />
        ))}
      </div>

      <div className="flex justify-center mt-8 lg:mt-12">
        <Link
          className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
          role="button"
          href="/blog"
        >
          <span>{t("blogs.viewAll")}</span>
          <FaArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default Blog;
