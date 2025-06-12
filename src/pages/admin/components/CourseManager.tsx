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
  const { data: courses, status: courseStatus } = useQuery({
    queryFn: getCourses,
    queryKey: ["course"],
  });
  const { mutateAsync: deleteMutate, status: deleteStatus } = useMutation({
    mutationFn: deleteCourse,
    onSuccess: (data: any) => {
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
  useEffect(() => {
    if (courses) {
      setCourses(courses);
    }
  }, [courses]);
  const [courseState, setCourses] = useState<Course[]>([]);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    price: "",
    link: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      thumbnail: "",
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
      thumbnail: course.thumbnail || "",
      price: course.price,
      link: course.link,
    });
    editMutate(formData, course._id)
      .then(() => {
        setIsEditMode(true);
        setIsDialogOpen(true);
      })
      .catch(() => {
        return;
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && selectedCourse) {
      setCourses(
        courseState.map((course) =>
          course._id === selectedCourse._id
            ? {
                ...course,
                ...formData,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : course
        )
      );
    }
    addMutate(formData)
      .then(() => {
        setIsDialogOpen(false);
        resetForm();
      })
      .catch(() => {
        return;
      });

    // if (isEditMode && selectedCourse) {
    //   setCourses(
    //     courseState.map((course) =>
    //       course._id === selectedCourse._id
    //         ? {
    //             ...course,
    //             ...formData,
    //             updatedAt: new Date().toISOString().split("T")[0],
    //           }
    //         : course
    //     )
    //   );
    // }
  };

  const handleDelete = (id: string) => {
    deleteMutate(id)
      .then(() => setCourses(courseState.filter((course) => course._id !== id)))
      .catch((err) => console.log(err));
  };

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
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  value={formData.thumbnail}
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnail: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
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
                  disabled={addStatus === "pending"}
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
                {course.thumbnail && (
                  <img
                    src={course.thumbnail}
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
