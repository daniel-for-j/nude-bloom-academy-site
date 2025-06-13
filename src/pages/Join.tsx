import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import PageHeader from "../components/PageHeader";
import { Check } from "lucide-react";
import { useLocation } from "react-router-dom";
import { register as registerApi } from "@/api/api";
import { useMutation } from "@tanstack/react-query";

type FormData = {
  name: string;
  email: string;
  userMessage?: string;
};

const Join = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const location = useLocation();
  const { price, programme, workshopID } = location.state || {};
  const { mutateAsync: mutate, status } = useMutation({
    mutationFn: registerApi,
    onError: (err) => {
      toast.error("Something went wrong", {
        description: err.message,
      });
      throw err;
    },
    onSuccess: (data) => {
      toast.success("Success", {
        description: data.message,
      });
    },
  });

  const onSubmit = async (data: FormData) => {
    await mutate({
      ...data,
      programme: programme,
      workshopID: workshopID ? workshopID : undefined,
    });

    reset();
  };

  return (
    <div>
      <PageHeader
        title="Join Our Community"
        subtitle="Become part of our supportive network and access exclusive resources"
      />

      <section className="py-16 md:py-24 bg-nude-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left column - Form */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-3xl font-serif font-medium mb-6">
                Stay Connected
              </h2>
              <p className="text-primary/80 mb-8">
                Fill out the form below to be part of the {programme} programme
                and receive updates on our latest offers, events, and resources.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-1"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-nude-300 ${
                        errors.name ? "border-red-500" : "border-nude-300"
                      }`}
                      {...register("name", {
                        required: "First name is required",
                      })}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-nude-300 ${
                      errors.email ? "border-red-500" : "border-nude-300"
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1"
                  >
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-nude-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nude-300"
                    placeholder="Tell us a bit about yourself and what you hope to gain from our community..."
                    {...register("userMessage")}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={`disabled:bg-green-600 btn-primary w-full`}
                  disabled={status === "pending" || !price || !programme}
                >
                  {status === "pending"
                    ? "Submitting..."
                    : `Proceed to Checkout ₦${price}`}
                </button>
              </form>
            </div>

            {/* Right column - Benefits */}
            <div>
              <h2 className="text-3xl font-serif font-medium mb-6">
                Benefits of Joining
              </h2>

              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xl font-medium mb-2">
                      Exclusive Content
                    </h3>
                    <p className="text-primary/80">
                      Access to exclusive articles, guides, and resources
                      designed to accelerate your growth journey.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xl font-medium mb-2">
                      Community Support
                    </h3>
                    <p className="text-primary/80">
                      Connect with like-minded individuals, share experiences,
                      and build meaningful relationships.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xl font-medium mb-2">Early Access</h3>
                    <p className="text-primary/80">
                      Be the first to know about new courses, workshops, and
                      events with early access opportunities.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xl font-medium mb-2">
                      Special Discounts
                    </h3>
                    <p className="text-primary/80">
                      Enjoy special community member discounts on selected
                      courses, coaching sessions, and workshops.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-nude-100 rounded-lg">
                <h3 className="text-xl font-medium mb-2">Privacy Promise</h3>
                <p className="text-primary/80">
                  We respect your privacy and are committed to protecting your
                  personal information. We'll never share your details with
                  third parties without your consent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Join;
