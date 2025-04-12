
import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Calendar, Clock, User, Search } from 'lucide-react';

// Mock blog post data
const blogPosts = [
  {
    id: 1,
    title: 'Embracing Growth Mindset: A Journey to Personal Development',
    excerpt: 'Discover how adopting a growth mindset can transform your approach to challenges and accelerate your personal development journey.',
    author: 'Emma Rodriguez',
    date: 'April 5, 2023',
    readTime: '5 min read',
    category: 'Personal Development',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'The Power of Community: How Connections Drive Success',
    excerpt: 'Explore the profound impact that community connections can have on your personal and professional success, and learn strategies for building meaningful relationships.',
    author: 'Michael Chang',
    date: 'March 22, 2023',
    readTime: '7 min read',
    category: 'Community',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Mindfulness Practices for a Balanced Life',
    excerpt: 'Learn practical mindfulness techniques that can help you achieve balance, reduce stress, and enhance your overall well-being.',
    author: 'Sarah Johnson',
    date: 'March 15, 2023',
    readTime: '6 min read',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Setting Meaningful Goals: A Framework for Success',
    excerpt: 'Discover a comprehensive framework for setting, tracking, and achieving meaningful goals that align with your values and aspirations.',
    author: 'David Wilson',
    date: 'March 8, 2023',
    readTime: '8 min read',
    category: 'Success Strategies',
    image: 'https://images.unsplash.com/photo-1553034545-32d4cd2168f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'Navigating Career Transitions with Confidence',
    excerpt: 'Learn strategies for managing career transitions effectively, building resilience, and embracing new opportunities with confidence.',
    author: 'Olivia Martinez',
    date: 'February 28, 2023',
    readTime: '9 min read',
    category: 'Career Development',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    title: 'The Art of Effective Communication',
    excerpt: 'Explore the principles of effective communication and learn practical techniques for enhancing your communication skills in various contexts.',
    author: 'James Anderson',
    date: 'February 20, 2023',
    readTime: '6 min read',
    category: 'Communication',
    image: 'https://images.unsplash.com/photo-1521798479778-7c85a253e5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  }
];

// Categories for filter
const categories = [
  'All Categories',
  'Personal Development',
  'Community',
  'Wellness',
  'Success Strategies',
  'Career Development',
  'Communication'
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  
  // Filter posts based on search query and selected category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || post.category === selectedCategory;
    
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/50" size={18} />
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
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm card-hover">
                  <img
                    src={post.image}
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
                      <a href={`/blog/${post.id}`} className="hover:text-primary/80">
                        {post.title}
                      </a>
                    </h3>
                    <p className="text-primary/70 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-primary/60">
                      <div className="flex items-center">
                        <User size={16} className="mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-primary/70">No articles found matching your criteria.</p>
                <button
                  className="mt-4 text-primary hover:underline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Categories');
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
