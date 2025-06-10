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
import { Plus, Send, Edit, Mail } from "lucide-react";
import { Newsletter } from "../types";

export const NewsletterManager = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([
    {
      id: "1",
      subject: "Welcome to SOAR Academy",
      text: "Welcome to our newsletter! Stay updated with the latest SOAR research, tips, and upcoming workshops.",
      createdAt: "2024-01-15",
      sentAt: "2024-01-15",
      status: "sent",
    },
    {
      id: "2",
      subject: "New Research Findings",
      text: "Exciting new research shows the effectiveness of SOAR interventions in classroom settings...",
      createdAt: "2024-01-20",
      status: "draft",
    },
  ]);

  const [selectedNewsletter, setSelectedNewsletter] =
    useState<Newsletter | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    subject: "",
    text: "",
  });

  const resetForm = () => {
    setFormData({
      subject: "",
      text: "",
    });
    setSelectedNewsletter(null);
    setIsEditMode(false);
  };

  const handleCreate = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (newsletter: Newsletter) => {
    setSelectedNewsletter(newsletter);
    setFormData({
      subject: newsletter.subject,
      text: newsletter.text,
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode && selectedNewsletter) {
      setNewsletters(
        newsletters.map((newsletter) =>
          newsletter.id === selectedNewsletter.id
            ? { ...newsletter, ...formData }
            : newsletter
        )
      );
    } else {
      const newNewsletter: Newsletter = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
        status: "draft",
      };
      setNewsletters([...newsletters, newNewsletter]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleSend = (id: string) => {
    setNewsletters(
      newsletters.map((newsletter) =>
        newsletter.id === id
          ? {
              ...newsletter,
              status: "sent" as const,
              sentAt: new Date().toISOString().split("T")[0],
            }
          : newsletter
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Newsletter Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Compose Newsletter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? "Edit Newsletter" : "Compose Newsletter"}
              </DialogTitle>
            </DialogHeader>
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
                <Button type="submit">
                  {isEditMode ? "Update" : "Save"} Newsletter
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {newsletters.map((newsletter) => (
          <Card key={newsletter.id} className="hover-lift">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="line-clamp-1">
                  {newsletter.subject}
                </CardTitle>
                <div
                  className={`px-2 py-1 rounded-md text-xs font-medium ${
                    newsletter.status === "sent"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {newsletter.status}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Created: {new Date(newsletter.createdAt).toLocaleDateString()}
                {newsletter.sentAt && (
                  <span className="ml-2">
                    • Sent: {new Date(newsletter.sentAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-4 mb-4">
                {newsletter.text}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(newsletter)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                {newsletter.status === "draft" && (
                  <Button
                    size="sm"
                    onClick={() => handleSend(newsletter.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Send
                  </Button>
                )}
                {newsletter.status === "sent" && (
                  <Button size="sm" variant="secondary" disabled>
                    <Mail className="h-4 w-4 mr-1" />
                    Sent
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
