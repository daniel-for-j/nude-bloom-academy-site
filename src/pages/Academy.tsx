import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { Users, User, BookOpen, ArrowRight, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTestimonies } from "@/api/api";

// Offer types
type Offer = {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: string;
  priceDescription: string;
  image: string;
  icon: React.ReactNode;
  link: string;
};

const Academy = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const { data: testimonials, status: testimonialStatus } = useQuery({
    queryKey: ["monials"],
    queryFn: getTestimonies,
    refetchOnWindowFocus: false,
    staleTime: 300000,
  });
  const offers: Offer[] = [
    {
      id: "one-on-one",
      title: "One-on-One Coaching",
      description:
        "Personalized coaching sessions tailored to your specific goals and challenges. Work directly with our expert coaches to accelerate your growth and overcome obstacles.",
      features: [
        "Personalized growth strategy",
        "1-hour sessions",
        "Flexible scheduling",
        "Action plan after each session",
        "Access to exclusive resources",
      ],
      price: "$199",
      priceDescription: "per session",
      image:
        "https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      icon: <User size={24} />,
      link: "/academy/coaching",
    },
    {
      id: "group-workshops",
      title: "Group Workshops",
      description:
        "Collaborative learning experiences designed to foster community, share diverse perspectives, and tackle common challenges together with our expert facilitators.",
      features: [
        "Interactive group sessions",
        "Limited to 20 participants",
        "Practical exercises",
        "Peer feedback and support",
        "Workshop materials included",
      ],
      price: "$99",
      priceDescription: "per workshop",
      image:
        "https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      icon: <Users size={24} />,
      link: "/academy/workshops",
    },
    {
      id: "online-courses",
      title: "Online Courses",
      description:
        "Self-paced learning journeys that provide comprehensive knowledge and practical skills. Access expert-created content anytime, anywhere.",
      features: [
        "Lifetime access to course materials",
        "Video lessons and tutorials",
        "Downloadable resources",
        "Progress tracking",
        "Community discussion forum",
      ],
      price: "$149",
      priceDescription: "starting price",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      icon: <BookOpen size={24} />,
      link: "/academy/courses",
    },
  ];

  const filteredOffers =
    activeTab === "all"
      ? offers
      : offers.filter((offer) => offer.id === activeTab);

  return (
    <div>
      <PageHeader
        title="Academy"
        subtitle="Explore our range of learning opportunities designed to help you grow and thrive"
      />

      {/* Offer Tabs */}
      <section className="py-8 bg-nude-100">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-3 rounded-full transition-colors ${
                activeTab === "all"
                  ? "bg-primary text-white"
                  : "bg-white text-primary hover:bg-nude-200"
              }`}
            >
              All Offerings
            </button>

            <button
              onClick={() => setActiveTab("one-on-one")}
              className={`px-6 py-3 rounded-full transition-colors ${
                activeTab === "one-on-one"
                  ? "bg-primary text-white"
                  : "bg-white text-primary hover:bg-nude-200"
              }`}
            >
              One-on-One Coaching
            </button>

            <button
              onClick={() => setActiveTab("group-workshops")}
              className={`px-6 py-3 rounded-full transition-colors ${
                activeTab === "group-workshops"
                  ? "bg-primary text-white"
                  : "bg-white text-primary hover:bg-nude-200"
              }`}
            >
              Group Workshops
            </button>

            <button
              onClick={() => setActiveTab("online-courses")}
              className={`px-6 py-3 rounded-full transition-colors ${
                activeTab === "online-courses"
                  ? "bg-primary text-white"
                  : "bg-white text-primary hover:bg-nude-200"
              }`}
            >
              Online Courses
            </button>
          </div>
        </div>
      </section>

      {/* Offers */}
      <section className="py-16 bg-nude-50">
        <div className="container-custom">
          <div className="space-y-16">
            {filteredOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-full">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <h3 className="text-3xl md:text-4xl font-serif font-medium text-white text-center px-4">
                        {offer.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="w-12 h-12 bg-nude-200 rounded-full flex items-center justify-center mb-6">
                      {offer.icon}
                    </div>

                    <p className="text-primary/80 mb-6">{offer.description}</p>

                    <div className="space-y-2 mb-8">
                      {offer.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary/70 mr-2 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-end gap-2 mb-6"></div>

                    <Link
                      to={offer.link}
                      className="btn-primary inline-flex items-center"
                    >
                      Learn More <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-nude-100">
        <div className="container-custom">
          {testimonials?.Testimonials && (
            <>
              <h2 className="section-title text-center mb-12">
                What Our Students Say
              </h2>
              {testimonials.Testimonials.map((test) => (
                <div className="grid md:grid-cols-3 gap-8" key={test._id}>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-nude-300 rounded-full overflow-hidden mr-4">
                        <img
                          src={test.thumbnailUrl}
                          alt="Testimonial"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{test.name}</h4>
                        <p className="text-sm text-primary/70">
                          {test.programme}
                        </p>
                      </div>
                    </div>
                    <p className="text-primary/80 italic">{`"${test.body}"`}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      {/* <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
            Ready to Begin Your Growth Journey?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Explore our offerings and find the perfect learning path for your
            personal and professional development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/academy"
              className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-nude-100 transition-colors"
            >
              Explore our offers
            </Link>
            <a
              href="mailto:Chiderahkaluidika@gmail.com"
              className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Academy;
