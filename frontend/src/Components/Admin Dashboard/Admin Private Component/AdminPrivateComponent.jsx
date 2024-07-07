import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const AdminPrivateComponent = () => {
  const auth = localStorage.getItem("loginusers");
  const role = JSON.parse(localStorage.getItem("loginusers")).role;
  return (auth && role === "admin")?<Outlet/>:<Navigate to="/signup"/>
}