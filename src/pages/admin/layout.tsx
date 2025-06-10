import type React from "react";
import { Link } from "react-router-dom";
import { BookOpen, FileText, Newspaper, PenSquare, Users } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <Link
            to="/"
            className="text-2xl font-serif font-medium text-gray-800"
          >
            SOAR
          </Link>
          <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
        </div>
        <nav className="mt-6">
          <div className="px-4 mb-2">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Content
            </p>
          </div>
          <Link
            to="/admin/blogs"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50"
          >
            <FileText className="h-5 w-5 mr-3 text-gray-500" />
            <span>Blogs</span>
          </Link>
          <Link
            to="/admin/workshops"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50"
          >
            <Users className="h-5 w-5 mr-3 text-gray-500" />
            <span>Workshops</span>
          </Link>
          <Link
            to="/admin/courses"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50"
          >
            <BookOpen className="h-5 w-5 mr-3 text-gray-500" />
            <span>Courses</span>
          </Link>
          <Link
            to="/admin/newsletter"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50"
          >
            <Newspaper className="h-5 w-5 mr-3 text-gray-500" />
            <span>Newsletter</span>
          </Link>
          <div className="px-4 mt-6 mb-2">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Account
            </p>
          </div>
          <Link
            to="/admin/profile"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50"
          >
            <PenSquare className="h-5 w-5 mr-3 text-gray-500" />
            <span>Profile</span>
          </Link>
          <Link
            to="/logout"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Logout</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
