import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import './App.css'
import AuthContext from './context/AuthContext';
import { Router } from './context/RouterContext'

import { LoginPage } from './pages/Login';
import DashboardLayout from './layout/DashboardLayout';
import ProtectedRoute from './layout/ProtectedRoute';
import Home from './pages/DashboardScreen/Home';
import AppLayout from './layout/AppLayout';
import VendorsPage from './pages/vendor';
import VendorDetailsPage from './pages/vendor/vendorDetails';
import UsersPage from './pages/user';
import UserDetailsPage from './pages/user/UserDetails';

function App() {
  const isLoggedIn = !!localStorage.getItem("token");
  console.log("the value of isLoggedin", isLoggedIn)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* 🔐 Public Auth Routes */}
        {/* <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />
          }
        /> */}

       
        <Route
          path="/auth"
          element={
            <LoginPage />
          }
        />

        {/* 🧭 Protected Dashboard Routes */}
        <Route

          element={
             <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
          path='/'
        >
         <Route index element={<Home/>}/>
          <Route path='vendors' element={<AppLayout/>}>
            <Route index element={<VendorsPage/>}/>
            <Route path=':vendorId' element={<VendorDetailsPage/>}/>
          </Route>
          <Route path='users' element={<AppLayout/>}>
            <Route index element={<UsersPage/>}/>
            <Route path=':userId' element={<UserDetailsPage/>}/>
          </Route>
        </Route>
      </>
    )
  );

  return (
    <AuthContext>
    
      <RouterProvider router={router} />
   
    </AuthContext>
  )
}

export default App
