import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { testimonialType } from "../types";
import { useQuery, useMutation } from "@tanstack/react-query";
import { editTestimonial, getTestimonies } from "@/api/admin";
import { useToast } from "@/hooks/use-toast";
import ButtonLoader from "@/components/buttonLoader";

export const TestimonialManager = () => {
  const [testimonialState, setTestimonial] = useState<testimonialType[]>([]);

  const { toast } = useToast();
  const {
    data: testimonials,
    status: getTestimonialStatus,
    refetch,
  } = useQuery({
    queryFn: getTestimonies,
    queryKey: ["test"],
    refetchOnWindowFocus: false,
    staleTime: 300000,
  });

  const { mutateAsync: editMutate, status: editStatus } = useMutation({
    mutationFn: ({ data, id }: { data: { isVisible: boolean }; id: string }) =>
      editTestimonial(data, id),
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data.message,
      });
      refetch();
    },
    onError: (data: any) => {
      toast({
        title: "Error",
        description: data.message,
      });
    },
  });
  useEffect(() => {
    if (testimonials) {
      setTestimonial(testimonials.Testimonials);
    }
  }, [testimonials]);

  if (getTestimonialStatus === "pending") {
    return <div>Loading...</div>;
  }
  if (getTestimonialStatus === "error") {
    return <div>Something went wrong</div>;
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Testimonials</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonialState &&
          testimonialState.map((blog) => (
            <Card key={blog._id} className="hover-lift">
              <CardHeader>
                {blog.thumbnailUrl && (
                  <div className="w-12 h-12 bg-nude-300 rounded-full overflow-hidden mr-4">
                    <img
                      src={blog.thumbnailUrl}
                      alt="pfp"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {blog.name}
                </p>
                <CardTitle className="line-clamp-2">{`"${blog.body}"`}</CardTitle>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-md">
                    {blog.programme}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    disabled={editStatus === "pending"}
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      editMutate({
                        data: { isVisible: !blog.isVisible },
                        id: blog._id,
                      });
                    }}
                  >
                    {editStatus === "pending" ? (
                      <ButtonLoader size="w-4 h-4" color="border-black" />
                    ) : blog.isVisible === true ? (
                      "Hide"
                    ) : (
                      "Show"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};
