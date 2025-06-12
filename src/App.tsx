import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Index";
import About from "./pages/About";
import Join from "./pages/Join";
import Blog from "./pages/Blog";
import Academy from "./pages/Academy";
import AcademyItem from "./pages/AcademyItem";
import NotFound from "./pages/NotFound";
import UseScrollToTop from "./hooks/useScroll";
import BlogPost from "./pages/SingleBlog";
import Admin from "./pages/admin/page";
import AdminLoginPage from "./pages/login/page";
import ProtectedRoute from "./components/protectedRoutes";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <UseScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/join" element={<Join />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/adminlogin" element={<AdminLoginPage />} />
                <Route path="/academy" element={<Academy />} />
                <Route path="/academy/:type" element={<AcademyItem />} />
                <Route path="*" element={<NotFound />} />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
