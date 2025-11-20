import { useState, useContext } from 'react'
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
import { MainContext } from './context/AuthContext';

function App() {
 

  const { isLoggedin} = useContext(MainContext);
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
            isLoggedin ? <Navigate to="/" replace /> :  <LoginPage />
          }
        />

        {/* 🧭 Protected Dashboard Routes */}
        <Route

          element={
            !isLoggedin ? <Navigate to="/auth" replace /> :   (<ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>)
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
 
    
      <RouterProvider router={router} />
   
  
  )
}

export default App
