import React, { useState, useEffect } from "react";
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
import { Plus, Edit, Trash2 } from "lucide-react";
import { Blog } from "../types";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getBlogs } from "@/api/api";
import { deleteBlog } from "@/api/admin";
import { useToast } from "@/hooks/use-toast";

export const BlogManager = () => {
  const [blogState, setBlogs] = useState<Blog[]>([]);

  const { toast } = useToast();
  const { data: blogs, status: blogStatus } = useQuery({
    queryFn: getBlogs,
    queryKey: ["blog"],
  });
  const { mutateAsync: deleteMutate, status: deleteStatus } = useMutation({
    mutationFn: deleteBlog,
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
  useEffect(() => {
    if (blogs) {
      setBlogs(blogs.blogs);
    }
  }, [blogs]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    category: "",
    thumbnail: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      body: "",
      category: "",
      thumbnail: "",
    });
    setSelectedBlog(null);
    setIsEditMode(false);
  };

  const handleCreate = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      body: blog.body,
      category: blog.category,
      thumbnail: blog.thumbnail || "",
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode && selectedBlog) {
      setBlogs(
        blogs.map((blog) =>
          blog._id === selectedBlog._id
            ? {
                ...blog,
                ...formData,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : blog
        )
      );
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    deleteMutate(id)
      .then(() => setBlogs(blogState.filter((blog) => blog._id !== id)))
      .catch((err) => console.log(err));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Create Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? "Edit Blog Post" : "Create New Blog Post"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                />
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
                <Label htmlFor="body">Content</Label>
                <Textarea
                  id="body"
                  value={formData.body}
                  onChange={(e) =>
                    setFormData({ ...formData, body: e.target.value })
                  }
                  rows={8}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  {isEditMode ? "Update" : "Create"} Blog Post
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
        {blogState &&
          blogState.length > 0 &&
          blogState.map((blog) => (
            <Card key={blog._id} className="hover-lift">
              <CardHeader>
                {blog.thumbnail && (
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}
                <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-md">
                    {blog.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {blog.body}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(blog)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    disabled={deleteStatus === "pending"}
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(blog._id)}
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
