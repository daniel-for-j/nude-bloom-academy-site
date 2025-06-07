import { CheckCircle, ArrowRight, BookOpen } from "lucide-react";
import { getCourses } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Courses() {
  const courses = useQuery({
    queryFn: getCourses,
    queryKey: ["courses"],
    refetchOnWindowFocus: false,
  });
  const features = [
    "Lifetime access to course materials",
    "Video lessons and tutorials",
    "Downloadable resources",
    "Progress tracking",
    "Community discussion forum",
  ];
  return (
    <section className="py-16 bg-nude-50">
      <div className="container-custom">
        <div className="space-y-16">
          {courses.data &&
            courses.data.data.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-full">
                    <img
                      src={offer.thumbnail}
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
                      <BookOpen size={24} />
                    </div>

                    <p className="text-primary/80 mb-6">{offer.description}</p>

                    <div className="space-y-2 mb-8">
                      {features.map((feature, index) => (
                        <div key={feature} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary/70 mr-2 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-end gap-2 mb-6">
                      <span className="text-3xl font-serif font-medium">
                        {offer.price}
                      </span>
                      {/* <span className="text-primary/70">
                    {offer.priceDescription}
                  </span> */}
                    </div>

                    <Link
                      to={offer.link}
                      className="btn-primary inline-flex items-center"
                    >
                      View On Udemy <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
