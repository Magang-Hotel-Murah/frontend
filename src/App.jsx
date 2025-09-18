import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@layouts';
import './index.css';
import { Home, User, Transaction, Setting, Booking } from '@pages';
import { Login, Register, ForgotPassword } from '@auth';
import { useAuth } from '@hooks';
import { ProtectedRoute } from './components';


const App = () => {
  const { isAuthenticated, user, login, logout, register, forgotPassword } = useAuth();

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
            <Navigate to="/home" replace /> : 
            <Login onLogin={login}/>
          }
        />
        
        <Route 
          path="/register" 
          element={
            isAuthenticated ? 
            <Navigate to="/home" replace /> : 
            <Register onRegister={register}/>
          }
        />

        <Route 
          path="/forgot-password" 
          element={
            isAuthenticated ? 
            <Navigate to="/home" replace /> : 
            <ForgotPassword onForgotPassword={forgotPassword}/>
          }
        />

        <Route 
          path="/home" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout user={user} onLogout={logout}>
                <Home/>
              </MainLayout>
            </ProtectedRoute>
          }
        />
        
        <Route 
          path="/transaction" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout user={user} onLogout={logout}>
                <Transaction/>
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route 
          path="/booking" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout user={user} onLogout={logout}>
                <Booking/>
              </MainLayout>
            </ProtectedRoute>
          }
        />
        
        <Route 
          path="/user" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout user={user} onLogout={logout}>
                <User/>
              </MainLayout>
            </ProtectedRoute>
          }
        />
        
        <Route 
          path="/setting" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout user={user} onLogout={logout}>
                <Setting/>
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;