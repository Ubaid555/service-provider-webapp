import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PublicComponent = () => {
  const loginUsers = localStorage.getItem("loginusers");

  if (loginUsers) {
    const parsedLoginUsers = JSON.parse(loginUsers);
    const role = parsedLoginUsers.role;

    if (role === "admin") {
      return <Navigate to="/adminoverview" />;
    }
  }
  return <Outlet />;
};
