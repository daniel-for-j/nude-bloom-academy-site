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
import { Plus, Edit, Trash2, Users } from "lucide-react";
import { Workshop } from "../types";
import { getWorkshops } from "@/api/api";
import { addWorkshop } from "@/api/admin";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";

export const WorkshopManager = () => {
  const { toast } = useToast();
  const { data: workshops, status: workshopStatus } = useQuery({
    queryFn: getWorkshops,
    queryKey: ["workshop"],
  });

  const { mutateAsync: addMutate, status: addStatus } = useMutation({
    mutationFn: addWorkshop,
    onSuccess: (data: any) => {
      toast({
        title: "workshop added",
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
    if (workshops) {
      setWorkshops(workshops);
    }
  }, [workshops]);
  const [workshopState, setWorkshops] = useState<Workshop[]>([]);

  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(
    null
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    details: "",
    date: "",
    price: "",
    maxNumber: 0,
    thumbnail: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      details: "",
      date: "",
      price: "",
      maxNumber: 0,
      thumbnail: "",
    });
    setSelectedWorkshop(null);
    setIsEditMode(false);
  };

  const handleCreate = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setFormData({
      name: workshop.name,
      details: workshop.details,
      date: workshop.date,
      price: workshop.price,
      maxNumber: workshop.maxNumber,
      thumbnail: workshop.thumbnail || "",
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode && selectedWorkshop) {
      setWorkshops(
        workshopState.map((workshop) =>
          workshop.id === selectedWorkshop.id
            ? {
                ...workshop,
                ...formData,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : workshop
        )
      );
    } else {
      const newWorkshop: Workshop = {
        id: Date.now().toString(),
        ...formData,
        participants: [],
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      setWorkshops([...workshops, newWorkshop]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setWorkshops(workshops.filter((workshop) => workshop.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Workshop Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Create Workshop
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? "Edit Workshop" : "Create New Workshop"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Workshop Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="$199"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="maxNumber">Maximum Participants</Label>
                <Input
                  id="maxNumber"
                  type="number"
                  value={formData.maxNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxNumber: parseInt(e.target.value),
                    })
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
                <Label htmlFor="details">Details</Label>
                <Textarea
                  id="details"
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                  rows={4}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  {isEditMode ? "Update" : "Create"} Workshop
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
        {workshopState &&
          workshopState.length > 0 &&
          workshopState.map((workshop) => (
            <Card key={workshop.id} className="hover-lift">
              <CardHeader>
                {workshop.thumbnail && (
                  <img
                    src={workshop.thumbnail}
                    alt={workshop.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}
                <CardTitle className="line-clamp-2">{workshop.name}</CardTitle>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{new Date(workshop.date).toLocaleDateString()}</span>
                  <span className="font-semibold text-primary">
                    {workshop.price}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {workshop.details}
                </p>
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <Users className="h-4 w-4" />
                  <span>
                    {workshop.participants.length}/{workshop.maxNumber}{" "}
                    participants
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(workshop)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(workshop.id)}
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
