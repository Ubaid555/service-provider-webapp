import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const AdminPrivateComponent = () => {
  const auth = localStorage.getItem("loginusers");
  return auth?<Outlet/>:<Navigate to="/signup"/>
}