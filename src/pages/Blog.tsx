import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { Calendar, Clock, User, Search } from "lucide-react";
import { getBlogs } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

// Mock blog post data

// Categories for filter
const categories = [
  "All Categories",
  "Personal Development",
  "Community",
  "Wellness",
  "Success Strategies",
  "Career Development",
  "Communication",
];

const Blog = () => {
  const blogPosts = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
    staleTime: 300000,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Filter posts based on search query and selected category
  const filteredPosts =
    blogPosts.data != undefined &&
    blogPosts.data.blogs.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Categories" ||
        post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

  return (
    <div>
      <PageHeader
        title="Blog"
        subtitle="Insights, stories, and resources to support your personal and professional growth"
      />

      <section className="py-16 bg-nude-50">
        <div className="container-custom">
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              <div className="relative w-full md:w-1/3">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-2 border border-nude-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nude-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/50"
                  size={18}
                />
              </div>

              <div className="w-full md:w-auto">
                <select
                  className="w-full md:w-auto px-4 py-2 border border-nude-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nude-300 bg-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts && filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <article
                  key={post._id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm card-hover"
                >
                  <img
                    src={post.thumbnailUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center text-sm text-primary/60 mb-3">
                      <span className="bg-nude-100 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-medium mb-3">
                      <a
                        href={`/blog/${post._id}`}
                        className="hover:text-primary/80"
                      >
                        {post.title}
                      </a>
                    </h3>
                    <p className="text-primary/70 mb-4 line-clamp-3">
                      {post.body}
                    </p>
                    <div className="flex items-center justify-between text-sm text-primary/60">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        <span>{format(post.createdAt, "PPpp")}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-primary/70">
                  No articles found matching your criteria.
                </p>
                <button
                  className="mt-4 text-primary hover:underline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Categories");
                  }}
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
