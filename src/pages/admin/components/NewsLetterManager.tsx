import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Newsletter } from "../types";
import { sendNewsLetter } from "@/api/admin";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export const NewsletterManager = () => {
  const { toast } = useToast();
  const { mutate, status } = useMutation({
    mutationFn: sendNewsLetter,
    onSuccess: () => {
      toast({ title: "Email sent" });
      resetForm();
    },
    onError: (err) => {
      toast({ title: "Error", description: err.message });
    },
  });

  const [formData, setFormData] = useState({
    subject: "",
    text: "",
  });

  const resetForm = () => {
    setFormData({
      subject: "",
      text: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="">
        <h1 className="text-3xl font-bold">Newsletter Management</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              placeholder="Enter newsletter subject"
              required
            />
          </div>
          <div>
            <Label htmlFor="text">Message Body</Label>
            <Textarea
              id="text"
              value={formData.text}
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
              rows={12}
              placeholder="Write your newsletter content here..."
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit">Send NewsLetter</Button>
            <Button
              type="button"
              variant="outline"
              disabled={status === "pending"}
              onClick={() => handleSubmit}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
    </div>
  );
};
