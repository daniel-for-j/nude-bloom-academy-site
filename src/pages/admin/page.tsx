import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Book, Users, GraduationCap, Mail, User } from "lucide-react";
import { BlogManager } from "./components/BlogManager";
import { WorkshopManager } from "./components/WorkshopManager";
import { CourseManager } from "./components/CourseManager";
import { NewsletterManager } from "./components/NewsLetterManager";
import { UsersManager } from "./components/UsersManager";

export type AdminSection =
  | "dashboard"
  | "blogs"
  | "workshops"
  | "courses"
  | "newsletter"
  | "users";

const Admin = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: GraduationCap },
    { id: "blogs", label: "Blogs", icon: Book },
    { id: "workshops", label: "Workshops", icon: Users },
    { id: "courses", label: "Courses", icon: GraduationCap },
    { id: "newsletter", label: "Newsletter", icon: Mail },
    { id: "users", label: "Users", icon: User },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "blogs":
        return <BlogManager />;
      case "workshops":
        return <WorkshopManager />;
      case "courses":
        return <CourseManager />;
      case "newsletter":
        return <NewsletterManager />;
      case "users":
        return <UsersManager />;
      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">
                Admin Dashboard
              </h1>
              <div className="text-sm text-muted-foreground">
                Welcome to SOAR Academy Admin
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card
                className="hover-lift cursor-pointer"
                onClick={() => setActiveSection("blogs")}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blogs</CardTitle>
                  <Book className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Manage blog articles
                  </p>
                </CardContent>
              </Card>

              <Card
                className="hover-lift cursor-pointer"
                onClick={() => setActiveSection("workshops")}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Workshops
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Manage workshops
                  </p>
                </CardContent>
              </Card>

              <Card
                className="hover-lift cursor-pointer"
                onClick={() => setActiveSection("courses")}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Courses</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Manage courses
                  </p>
                </CardContent>
              </Card>

              <Card
                className="hover-lift cursor-pointer"
                onClick={() => setActiveSection("newsletter")}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Newsletter
                  </CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Compose newsletters
                  </p>
                </CardContent>
              </Card>

              <Card
                className="hover-lift cursor-pointer"
                onClick={() => setActiveSection("users")}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Users</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    View registered users
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          New blog post published
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Workshop scheduled
                        </p>
                        <p className="text-xs text-muted-foreground">
                          5 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Course updated</p>
                        <p className="text-xs text-muted-foreground">
                          1 day ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => setActiveSection("blogs")}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Blog Post
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => setActiveSection("workshops")}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Workshop
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => setActiveSection("courses")}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Course
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => setActiveSection("newsletter")}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Compose Newsletter
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border min-h-screen">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-primary">SOAR Academy</h2>
            <p className="text-sm text-muted-foreground">Admin Panel</p>
          </div>

          <nav className="mt-6">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as AdminSection)}
                  className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                    activeSection === item.id
                      ? "bg-primary text-primary-foreground border-r-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Admin;
