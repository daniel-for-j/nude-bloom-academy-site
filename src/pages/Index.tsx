import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Presentation, Star } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-nude-100 hero-section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6 leading-tight animate-fade-in">
              SOAR
              <br />
              Community
            </h1>
            <p className="text-xl md:text-2xl text-primary/80 mb-8 animate-fade-in">
              Unlock your full potential, build unshakable confidence and master
              the art of communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/about" className="btn-primary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-nude-50">
        <div className="container-custom">
          <h2 className="section-title text-center mb-16">What We Offer</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Academy */}
            <div className="bg-white p-8 rounded-lg shadow-sm card-hover">
              <div className="w-12 h-12 bg-nude-200 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="text-primary" size={24} />
              </div>
              <h3 className="text-2xl font-serif font-medium mb-4">Academy</h3>
              <p className="text-primary/70 mb-6">
                Access our curated courses, workshops, and one-on-one coaching
                sessions designed to accelerate your growth.
              </p>
              <Link
                to="/academy"
                className="inline-flex items-center text-primary font-medium"
              >
                Explore Courses <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>

            {/* Resources */}
            <div className="bg-white p-8 rounded-lg shadow-sm card-hover">
              <div className="w-12 h-12 bg-nude-200 rounded-full flex items-center justify-center mb-6">
                <Presentation className="text-primary" size={24} />
              </div>
              <h3 className="text-2xl font-serif font-medium mb-4">Blog</h3>
              <p className="text-primary/70 mb-6">
                Dive into our collection of insightful articles, guides, and
                resources crafted by industry experts.
              </p>
              <Link
                to="/blog"
                className="inline-flex items-center text-primary font-medium"
              >
                Read Articles <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>

            {/* Reviews */}
            <div className="bg-white p-8 rounded-lg shadow-sm card-hover">
              <div className="w-12 h-12 bg-nude-200 rounded-full flex items-center justify-center mb-6">
                <Star className="text-primary" size={24} />
              </div>
              <h3 className="text-2xl font-serif font-medium mb-4">Reviews</h3>
              <p className="text-primary/70 mb-6">
                Share your experience and read testimonials from our community
                members who have transformed their lives through our courses.
              </p>
              <Link
                to="/testimonial"
                className="inline-flex items-center text-primary font-medium"
              >
                Leave a Review <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
