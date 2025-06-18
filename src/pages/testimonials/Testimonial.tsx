import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Upload, MessageCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { addTestimonial } from "@/api/api";

const Testimonial = () => {
  const { toast } = useToast();
  const { mutate, status } = useMutation({
    mutationFn: addTestimonial,
    onSuccess: (data) => {
      setFormData({
        name: "",
        email: "",
        programme: "",
        body: "",
        thumbnail: null,
      });
      const fileInput = document.getElementById(
        "thumbnail"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      toast({ title: "Response Sent!", description: data.message });
    },
    onError: (err) => {
      toast({ title: "Error", description: err.message });
    },
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    programme: "",
    body: "",
    thumbnail: null as File | null,
  });

  const programmes = ["Coaching", "Group Workshops"];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      thumbnail: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.programme ||
      !formData.body
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-blakck to-stone-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-nude-100 to-nude-200 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <MessageCircle className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-black">
            Share Your Success Story
          </h1>
          <p className="text-xl md:text-2xl text-black max-w-3xl mx-auto">
            Help inspire others by sharing your experience with our programmes
          </p>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardDescription className="text-lg text-stone-600 max-w-2xl mx-auto">
                Your success story could inspire the next generation of leaders.
                Share your journey and help others take flight.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-semibold text-stone-700"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Enter your full name"
                      className="h-12 border-stone-200 focus:border-stone-600 focus:ring-stone-600"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-stone-700"
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="Enter your email address"
                      className="h-12 border-stone-200 focus:border-stone-600 focus:ring-stone-600"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="programme"
                    className="text-sm font-semibold text-stone-700"
                  >
                    Programme *
                  </Label>
                  <Select
                    value={formData.programme}
                    onValueChange={(value) =>
                      handleInputChange("programme", value)
                    }
                    required
                  >
                    <SelectTrigger className="h-12 border-stone-200 focus:border-stone-600 focus:ring-stone-600">
                      <SelectValue placeholder="Select the programme you participated in" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-stone-200">
                      {programmes.map((programme) => (
                        <SelectItem
                          key={programme}
                          value={programme}
                          className="hover:bg-stone-50"
                        >
                          {programme}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="body"
                    className="text-sm font-semibold text-stone-700"
                  >
                    Your Testimonial *
                  </Label>
                  <Textarea
                    id="body"
                    value={formData.body}
                    onChange={(e) => handleInputChange("body", e.target.value)}
                    placeholder="Share your experience, what you learned, how it helped you grow, and what you would tell others considering this programme..."
                    className="min-h-[120px] border-stone-200 focus:border-stone-600 focus:ring-stone-600 resize-none"
                    required
                  />
                  <p className="text-sm text-stone-500">
                    Tell us about your journey, achievements, and how Let Soar
                    helped you succeed.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="thumbnail"
                    className="text-sm font-semibold text-stone-700"
                  >
                    Profile Photo (Optional)
                  </Label>
                  <div className="border-2 border-dashed border-stone-200 rounded-lg p-6 text-center hover:border-stone-400 transition-colors">
                    <Upload className="h-8 w-8 text-stone-400 mx-auto mb-2" />
                    <Input
                      id="thumbnail"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Label
                      htmlFor="thumbnail"
                      className="cursor-pointer text-sm text-stone-600 hover:text-stone-800 transition-colors"
                    >
                      Click to upload your photo or drag and drop
                    </Label>
                    <p className="text-xs text-stone-400 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                    {formData.thumbnail && (
                      <Badge variant="secondary" className="mt-2">
                        {formData.thumbnail.name}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-stone-50 to-stone-100 rounded-lg p-6 border border-stone-200">
                  <h4 className="font-semibold text-stone-800 mb-2">
                    Why share your story?
                  </h4>
                  <ul className="text-sm text-stone-600 space-y-1">
                    <li>• Inspire others to pursue their dreams</li>
                    <li>• Showcase the impact of Let Soar programmes</li>
                    <li>• Build a community of successful alumni</li>
                    <li>• Help future participants know what to expect</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  disabled={status === "pending"}
                  className="w-full h-12 bg-stone-800 hover:bg-stone-700 text-white font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
                >
                  {status === "pending"
                    ? "Submitting..."
                    : "Submit My Testimonial"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-stone-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-stone-600 mb-4">
            Thank you for being part of the SOAR community!
          </p>
          <p className="text-sm text-stone-500">
            Your testimonial will be reviewed and may be featured on our website
            and marketing materials.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
