import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Book,
  Users,
  GraduationCap,
  Mail,
  User,
  Menu,
} from "lucide-react";
import { BlogManager } from "./components/BlogManager";
import { WorkshopManager } from "./components/WorkshopManager";
import { CourseManager } from "./components/CourseManager";
import { NewsletterManager } from "./components/NewsLetterManager";
import { UsersManager } from "./components/UsersManager";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export type AdminSection =
  | "dashboard"
  | "blogs"
  | "workshops"
  | "courses"
  | "newsletter"
  | "users";

const Admin = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: GraduationCap },
    { id: "blogs", label: "Blogs", icon: Book },
    { id: "workshops", label: "Workshops", icon: Users },
    { id: "courses", label: "Courses", icon: GraduationCap },
    { id: "newsletter", label: "Newsletter", icon: Mail },
    { id: "users", label: "Users", icon: User },
  ];

  const handleSectionChange = (section: AdminSection) => {
    setActiveSection(section);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const SidebarContent = () => (
    <>
      <div className="p-4 lg:p-6">
        <h2 className="text-xl lg:text-2xl font-bold text-primary">
          SOAR Academy
        </h2>
        <p className="text-sm text-muted-foreground">Admin Panel</p>
      </div>

      <nav className="mt-4 lg:mt-6">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleSectionChange(item.id as AdminSection)}
              className={`w-full flex items-center px-4 lg:px-6 py-3 text-left transition-colors ${
                activeSection === item.id
                  ? "bg-primary text-primary-foreground border-r-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <Icon className="mr-3 h-4 lg:h-5 w-4 lg:w-5" />
              <span className="text-sm lg:text-base">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );

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
          <div className="space-y-4 lg:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                Admin Dashboard
              </h1>
              <div className="text-sm text-muted-foreground">
                Welcome to SOAR Academy Admin
              </div>
            </div>

            {/* Dashboard Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
              <Card
                className="hover-lift cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleSectionChange("blogs")}
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
                className="hover-lift cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleSectionChange("workshops")}
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
                className="hover-lift cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleSectionChange("courses")}
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
                className="hover-lift cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleSectionChange("newsletter")}
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
                className="hover-lift cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleSectionChange("users")}
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

            {/* Bottom Section Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6"></div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 bg-card border-r border-border min-h-screen">
          <SidebarContent />
        </div>

        {/* Mobile Header & Content */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Header */}
          <div className="lg:hidden bg-card border-b border-border p-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-primary">SOAR Academy</h2>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>

            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 lg:p-8">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
