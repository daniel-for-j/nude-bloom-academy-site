import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { Course } from "../types";
import { getCourses } from "@/api/api";
import { deleteCourse, addCourse, editCourse } from "@/api/admin";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";

export const CourseManager = () => {
  const { toast } = useToast();
  const {
    data: courses,
    status: courseStatus,
    refetch,
  } = useQuery({
    queryFn: getCourses,
    queryKey: ["course"],
  });
  const { mutateAsync: deleteMutate, status: deleteStatus } = useMutation({
    mutationFn: deleteCourse,
    onSuccess: (data: any) => {
      refetch();
      toast({
        title: "Deleted",
        description: data.message,
      });
    },
    onError: (data: any) => {
      toast({
        title: "Error",
        description: data.message,
      });
    },
  });
  const { mutateAsync: addMutate, status: addStatus } = useMutation({
    mutationFn: addCourse,
    onSuccess: (data: any) => {
      refetch();
      toast({
        title: "course added",
        description: data.message,
      });
    },
    onError: (data: any) => {
      toast({
        title: "Error",
        description: data.message,
      });
    },
  });
  const { mutateAsync: editMutate, status: editStatus } = useMutation({
    mutationFn: ({
      data,
      id,
    }: {
      data: {
        title?: string;
        description?: string;
        price?: string;
        link?: string;
        thumbnail?: File | null;
      };
      id: string;
    }) => editCourse(data, id),
    onSuccess: (data) => {
      refetch();
      toast({
        title: "Edited successfully",
        description: data.message,
      });
    },
    onError: (data: any) => {
      toast({
        title: "Error",
        description: data.message,
      });
    },
  });
  useEffect(() => {
    if (courses) {
      setCourses(courses.data);
    }
  }, [courses]);
  const [courseState, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    price: string;
    thumbnail: File;
    thumbnailUrl: string;
    link: string;
  }>({
    title: "",
    thumbnailUrl: "",
    description: "",
    thumbnail: null,
    price: "",
    link: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      thumbnail: null,
      thumbnailUrl: "",
      price: "",
      link: "",
    });
    setSelectedCourse(null);
    setIsEditMode(false);
  };

  const handleCreate = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      thumbnail: null,
      thumbnailUrl: course.thumbnailUrl,
      price: course.price,
      link: course.link,
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && selectedCourse) {
      try {
        editMutate({ data: formData, id: selectedCourse._id });
      } catch (err) {
        throw err;
      }
    } else {
      addMutate(formData)
        .then(() => {
          setIsDialogOpen(false);
          resetForm();
        })
        .catch(() => {
          return;
        });
    }
  };

  const handleDelete = (id: string) => {
    deleteMutate(id)
      .then(() => setCourses(courseState.filter((course) => course._id !== id)))
      .catch((err) => console.log(err));
  };

  if (courseStatus === "pending") {
    return <div>Loading...</div>;
  }
  if (courseStatus === "error") {
    return <div>Something went wrong</div>;
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Course Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Create Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? "Edit Course" : "Create New Course"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="$299"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="link">Course Link</Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    placeholder="https://letsoar.co/courses/..."
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setFormData({ ...formData, thumbnail: file });
                  }}
                  placeholder="Choose an image file"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  {isEditMode ? "Update" : "Create"} Course
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={addStatus === "pending" || editStatus === "pending"}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseState &&
          courseState.length > 0 &&
          courseState.map((course) => (
            <Card key={course._id} className="hover-lift">
              <CardHeader>
                {course.thumbnailUrl && (
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}
                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-primary text-lg">
                    {course.price}
                  </span>
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {course.description}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(course)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(course._id)}
                    disabled={deleteStatus === "pending"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};
