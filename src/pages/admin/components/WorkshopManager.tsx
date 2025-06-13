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
import { Plus, Edit, Users } from "lucide-react";
import { Workshop } from "../types";
import { getWorkshops } from "@/api/api";
import { addWorkshop, editWorkshop } from "@/api/admin";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import WorkshopCard from "./WorkshopCard";

export const WorkshopManager = () => {
  const { toast } = useToast();
  const {
    data: workshops,
    status: workshopStatus,
    refetch,
  } = useQuery({
    queryFn: getWorkshops,
    queryKey: ["workshop"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 300000,
  });

  const { mutateAsync: addMutate, status: addStatus } = useMutation({
    mutationFn: addWorkshop,
    onSuccess: (data: any) => {
      refetch();
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
  const { mutateAsync: editMutate, status: editStatus } = useMutation({
    mutationFn: ({
      data,
      id,
    }: {
      data: {
        name?: string;
        details?: string;
        price?: string;
        date?: string;
        maxNumber?: number;
        thumbnail?: File | null;
      };
      id: string;
    }) => editWorkshop(data, id),
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
    if (workshops) {
      setWorkshops(workshops.data);
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
    thumbnail: null,
    thumbnailUrl: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      details: "",
      date: "",
      price: "",
      maxNumber: 0,
      thumbnail: null,
      thumbnailUrl: "",
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
      thumbnail: null,
      thumbnailUrl: workshop.thumbnailUrl || "",
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && selectedWorkshop) {
      try {
        editMutate({ data: formData, id: selectedWorkshop._id });
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
          workshopState.map((workshop) => <WorkshopCard workshop={workshop} />)}
      </div>
    </div>
  );
};
