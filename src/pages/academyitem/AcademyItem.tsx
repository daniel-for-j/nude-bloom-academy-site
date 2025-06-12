import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PageHeader from "../../components/PageHeader";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCourses, getWorkshops } from "@/api/api";
import CourseCard from "./components/course-card";

// Offer data
const offerData = {
  coaching: {
    type: "One-on-One Coaching",
    title: "Personalized Coaching Sessions",
    description:
      "Our one-on-one coaching sessions are designed to provide you with personalized guidance, support, and accountability as you work towards your goals. Whether you're looking to advance your career, improve specific skills, or navigate life transitions, our experienced coaches will help you create a tailored plan for success.",
    benefits: [
      "Personalized strategy tailored to your specific goals",
      "Direct feedback and guidance from experienced coaches",
      "Accountability and support throughout your journey",
      "Flexible scheduling to accommodate your needs",
      "Specific, actionable steps to help you progress",
      "Safe space to explore challenges and opportunities",
    ],
    process: [
      "Initial assessment to understand your goals and challenges",
      "Strategy session to create your personalized growth plan",
      "Regular coaching sessions focused on implementation and progress",
      "Ongoing support and resources between sessions",
      "Periodic reviews to measure progress and adjust strategies",
    ],
    pricing: [
      {
        name: "Single Session",
        price: "$199",
        features: [
          "1-hour coaching session",
          "Session summary and action plan",
          "Email follow-up",
        ],
      },
      {
        name: "Monthly Package",
        price: "$649",
        features: [
          "4 weekly sessions",
          "Email support between sessions",
          "Personalized resources and tools",
          "Progress tracking",
        ],
        recommended: true,
      },
      {
        name: "Quarterly Package",
        price: "$1,799",
        features: [
          "12 sessions (1 per week)",
          "Priority scheduling",
          "Unlimited email support",
          "Access to exclusive resources",
          "Quarterly progress report",
        ],
      },
    ],
    image:
      "https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
  workshops: {
    type: "Group Workshops",
    title: "Collaborative Growth Experiences",
    description:
      "Our interactive workshops bring together small groups of individuals with similar goals and challenges, creating a powerful environment for learning, sharing, and growth. Led by expert facilitators, these sessions combine structured learning with peer interaction to maximize your development.",
    benefits: [
      "Learn from diverse perspectives and experiences",
      "Build connections with like-minded individuals",
      "Practice new skills in a supportive environment",
      "Receive feedback from both experts and peers",
      "Access to workshop materials and resources",
      "Ongoing community support after the workshop",
    ],
    process: [
      "Pre-workshop assessment to establish goals and expectations",
      "Structured workshop sessions combining teaching and practice",
      "Interactive exercises and group discussions",
      "Action planning for implementing learnings",
      "Post-workshop resources and community access",
    ],
    upcoming: [
      {
        title: "Mastering Effective Communication",
        date: "May 15, 2023",
        time: "9:00 AM - 12:00 PM EST",
        price: "$99",
        spots: "8 spots remaining",
      },
      {
        title: "Building Resilience in Challenging Times",
        date: "May 22, 2023",
        time: "1:00 PM - 4:00 PM EST",
        price: "$99",
        spots: "5 spots remaining",
      },
      {
        title: "Goal Setting and Achievement Strategies",
        date: "June 5, 2023",
        time: "9:00 AM - 12:00 PM EST",
        price: "$99",
        spots: "10 spots remaining",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
  courses: {
    type: "Online Courses",
    title: "Self-Paced Learning Journeys",
    description:
      "Our comprehensive online courses allow you to learn at your own pace while still benefiting from expert instruction and community support. Each course combines video lessons, practical exercises, and supplementary resources to provide a complete learning experience.",
    benefits: [
      "Learn at your own pace, on your own schedule",
      "Access course materials from anywhere, anytime",
      "Practical exercises to apply what you've learned",
      "Community forum for questions and discussions",
      "Regular updates with new content and resources",
      "Lifetime access to course materials",
    ],
    process: [
      "Orientation module to familiarize yourself with the course platform",
      "Structured modules with video lessons and supplementary materials",
      "Practical assignments to apply your learning",
      "Progress tracking to monitor your advancement",
      "Discussion forums for community learning and support",
      "Final project or assessment to consolidate your learning",
    ],
    courses: [
      {
        title: "Personal Branding Masterclass",
        description:
          "Learn how to define, develop, and communicate your personal brand effectively to advance your career and stand out in your field.",
        modules: "8 modules",
        duration: "Approximately 20 hours",
        price: "$199",
        level: "Beginner to Intermediate",
      },
      {
        title: "Emotional Intelligence in Leadership",
        description:
          "Develop your emotional intelligence to become a more effective leader, build stronger relationships, and create positive team cultures.",
        modules: "10 modules",
        duration: "Approximately 25 hours",
        price: "$249",
        level: "Intermediate to Advanced",
      },
      {
        title: "Productivity and Time Management Essentials",
        description:
          "Master practical strategies and tools to maximize your productivity, manage your time effectively, and achieve more with less stress.",
        modules: "6 modules",
        duration: "Approximately 15 hours",
        price: "$149",
        level: "All levels",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
};

const AcademyItem = () => {
  const navigate = useNavigate();
  const courses = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
    refetchOnWindowFocus: false,
  });
  const workshops = useQuery({
    queryKey: ["workshops"],
    queryFn: getWorkshops,
    refetchOnWindowFocus: false,
  });
  const { type = "" } = useParams<{ type: string }>();
  const [offerType, setOfferType] = useState<keyof typeof offerData | null>(
    null
  );

  useEffect(() => {
    // Validate and set the offer type
    if (type === "coaching" || type === "workshops" || type === "courses") {
      setOfferType(type);
    } else {
      // Redirect or handle invalid type
      console.error("Invalid academy offer type:", type);
    }
  }, [type]);

  const handlePurchase = (itemName: string, price: string) => {
    console.log(`Purchasing ${itemName} for ${price}`);
    toast.success("Thank you for your purchase!", {
      description: "You will receive an email with further instructions.",
    });
  };

  if (!offerType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-medium mb-4">
            Offer Not Found
          </h1>
          <p className="mb-6 text-primary/70">
            The requested academy offering could not be found.
          </p>
          <Link to="/academy" className="btn-primary">
            Return to Academy
          </Link>
        </div>
      </div>
    );
  }

  const offer = offerData[offerType];

  return (
    <div>
      <PageHeader title={offer.type} subtitle={offer.title} />

      <section className="py-8 bg-nude-100">
        <div className="container-custom">
          <Link
            to="/academy"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Academy
          </Link>
        </div>
      </section>

      <section className="py-16 bg-nude-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
                {offer.title}
              </h2>
              <p className="text-lg text-primary/80 mb-8">
                {offer.description}
              </p>

              <div className="space-y-3 mb-8">
                <h3 className="text-xl font-medium">Benefits</h3>
                <div className="space-y-2">
                  {offer.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary/70 mr-2 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-serif font-medium mb-6">
              Our Process
            </h3>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <ol className="relative border-l border-nude-300">
                {offer.process.map((step, index) => (
                  <li key={index} className="mb-10 ml-6 last:mb-0">
                    <div className="absolute w-8 h-8 bg-nude-200 rounded-full -left-4 border border-white flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div className="ml-4">
                      <p className="text-lg">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {offerType === "coaching" && (
            <div className="flex justify-center min-w-96">
              <button
                onClick={() => navigate("/join")}
                className="btn-primary min-w-96"
              >
                Enroll
              </button>
            </div>
          )}

          {offerType === "workshops" && (
            <div>
              <h3 className="text-2xl font-serif font-medium mb-6">
                Upcoming Workshops
              </h3>
              <div className="space-y-4">
                {workshops.data &&
                  workshops.data.data.map((workshop, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-sm border border-nude-200"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h4 className="text-xl font-medium mb-2">
                            {workshop.name}
                          </h4>
                          <div className="flex flex-col sm:flex-row sm:space-x-8">
                            <div className="flex items-center text-primary/70 mb-2 sm:mb-0">
                              <Calendar size={18} className="mr-2" />
                              <span>{workshop.date}</span>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-primary/70">
                            {""}
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center">
                          <div className="text-2xl font-serif font-medium mr-4">
                            ₦{workshop.price}
                          </div>
                          <button
                            onClick={() => navigate("/join")}
                            className="btn-primary"
                          >
                            Register
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {offerType === "courses" && (
            <div>
              <h3 className="text-2xl font-serif font-medium mb-6">
                Available Courses
              </h3>
              <div className="space-y-6">
                {courses.data &&
                  courses.data.data.map((course, index) => (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      <CourseCard key={course._id} course={course} />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-nude-200">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
            Have Questions?
          </h2>
          <p className="text-lg text-primary/80 max-w-2xl mx-auto mb-8">
            Our team is here to help you choose the right learning path for your
            goals. Contact us for more information or to discuss your specific
            needs.
          </p>
          <a href="mailto:academy@soarcommunity.com" className="btn-primary">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default AcademyItem;
