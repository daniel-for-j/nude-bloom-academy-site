
import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import PageHeader from '../components/PageHeader';
import { Check } from 'lucide-react';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  interests: string[];
  message: string;
};

const Join = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', data);
    toast.success('Thank you for joining our community!', {
      description: 'We\'ll be in touch soon.',
    });
    
    reset();
    setIsSubmitting(false);
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
              <h2 className="text-3xl font-serif font-medium mb-6">Stay Connected</h2>
              <p className="text-primary/80 mb-8">
                Fill out the form below to join our community and receive updates on our latest offers, events, and resources.
              </p>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-nude-300 ${errors.firstName ? 'border-red-500' : 'border-nude-300'}`}
                      {...register('firstName', { required: 'First name is required' })}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-nude-300 ${errors.lastName ? 'border-red-500' : 'border-nude-300'}`}
                      {...register('lastName', { required: 'Last name is required' })}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-nude-300 ${errors.email ? 'border-red-500' : 'border-nude-300'}`}
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Please enter a valid email'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <span className="block text-sm font-medium mb-2">I'm interested in:</span>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="coaching"
                        type="checkbox"
                        className="h-4 w-4 border-nude-300 rounded"
                        value="Coaching"
                        {...register('interests')}
                      />
                      <label htmlFor="coaching" className="ml-2 text-sm">
                        One-on-One Coaching
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="workshops"
                        type="checkbox"
                        className="h-4 w-4 border-nude-300 rounded"
                        value="Workshops"
                        {...register('interests')}
                      />
                      <label htmlFor="workshops" className="ml-2 text-sm">
                        Group Workshops
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="courses"
                        type="checkbox"
                        className="h-4 w-4 border-nude-300 rounded"
                        value="Courses"
                        {...register('interests')}
                      />
                      <label htmlFor="courses" className="ml-2 text-sm">
                        Online Courses
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="newsletter"
                        type="checkbox"
                        className="h-4 w-4 border-nude-300 rounded"
                        value="Newsletter"
                        {...register('interests')}
                      />
                      <label htmlFor="newsletter" className="ml-2 text-sm">
                        Newsletter & Updates
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-nude-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nude-300"
                    placeholder="Tell us a bit about yourself and what you hope to gain from our community..."
                    {...register('message')}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Join Now'}
                </button>
              </form>
            </div>
            
            {/* Right column - Benefits */}
            <div>
              <h2 className="text-3xl font-serif font-medium mb-6">Benefits of Joining</h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xl font-medium mb-2">Exclusive Content</h3>
                    <p className="text-primary/80">
                      Access to exclusive articles, guides, and resources designed to accelerate your growth journey.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xl font-medium mb-2">Community Support</h3>
                    <p className="text-primary/80">
                      Connect with like-minded individuals, share experiences, and build meaningful relationships.
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
                      Be the first to know about new courses, workshops, and events with early access opportunities.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xl font-medium mb-2">Special Discounts</h3>
                    <p className="text-primary/80">
                      Enjoy special community member discounts on selected courses, coaching sessions, and workshops.
                    </p>
                  </div>
                </div>
                
                {/* <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xl font-medium mb-2">Tailored Recommendations</h3>
                    <p className="text-primary/80">
                      Receive personalized content and resource recommendations based on your interests and goals.
                    </p>
                  </div>
                </div> */}
              </div>
              
              <div className="mt-10 p-6 bg-nude-100 rounded-lg">
                <h3 className="text-xl font-medium mb-2">Privacy Promise</h3>
                <p className="text-primary/80">
                  We respect your privacy and are committed to protecting your personal information. We'll never share your details with third parties without your consent.
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
