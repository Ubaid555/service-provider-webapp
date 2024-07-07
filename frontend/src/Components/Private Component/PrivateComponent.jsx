import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateComponent = () => {
  const auth = localStorage.getItem("loginusers");
  if(auth){
  const role = JSON.parse(localStorage.getItem("loginusers")).role;
  return (auth && role === "user")?<Outlet/>:<Navigate to="/signup"/>
  }
  return auth?<Outlet/>:<Navigate to="/signup"/>
}

