import React, { useState } from "react";
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

export const CourseManager = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      title: "SOAR Fundamentals",
      description:
        "Learn the core principles of the SOAR intervention method for ADHD support.",
      thumbnail:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400",
      price: "$299",
      link: "https://letsoar.co/courses/fundamentals",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Advanced SOAR Techniques",
      description:
        "Deep dive into advanced strategies and implementation techniques for experienced practitioners.",
      thumbnail:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
      price: "$499",
      link: "https://letsoar.co/courses/advanced",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-12",
    },
  ]);

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
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode && selectedCourse) {
      setCourses(
        courses.map((course) =>
          course.id === selectedCourse.id
            ? {
                ...course,
                ...formData,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : course
        )
      );
    } else {
      const newCourse: Course = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      setCourses([...courses, newCourse]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id));
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
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover-lift">
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
                  onClick={() => handleDelete(course.id)}
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
