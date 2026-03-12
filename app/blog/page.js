// @flow strict
import { blogsData } from '@/utils/data/blogs-data';
import BlogCard from '../components/homepage/blog/blog-card';

export default function BlogPage() {
  return (
    <div className="py-8">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            All Posts
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-8">
        {blogsData.map((blog, i) => (
          <BlogCard blog={blog} index={i} key={blog.id} />
        ))}
      </div>
    </div>
  );
}