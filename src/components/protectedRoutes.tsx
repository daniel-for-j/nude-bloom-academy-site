import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // If not logged in, redirect to the login page
  if (sessionStorage.getItem("isChidLoggedIn") === "true") {
    return <>{children}</>;
  }
  return <Navigate to="/adminlogin" replace />;

  // If logged in, render the child components
};

export default ProtectedRoute;
