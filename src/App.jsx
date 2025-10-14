import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MainLayout } from "@layouts";
import "./index.css";
import { Home, User, Setting, Booking, LandingPage } from "@pages";
import { Login, Register, ForgotPassword } from "@auth";
import { useAuth } from "@hooks";
import { ProtectedRoute } from "@components/layout";

const App = () => {
  const { isAuthenticated, user, login, logout, register, forgotPassword } =
    useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <LandingPage />
          }
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Login onLogin={login} />
            )
          }
        />

        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Register onRegister={register} />
            )
          }
        />

        <Route
          path="/forgot-password"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <ForgotPassword onForgotPassword={forgotPassword} />
            )
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
              <MainLayout user={user} onLogout={logout}>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              user={user}
              allowedRoles={["super_admin", "company_admin", "employee"]}
            >
              <MainLayout user={user} onLogout={logout}>
                <Booking />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              user={user}
              allowedRoles={["super_admin", "company_admin"]}
            >
              <MainLayout user={user} onLogout={logout}>
                <User />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/setting"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              user={user}
              allowedRoles={
                [
                  "super_admin", 
                  "company_admin",
                  "finance_officer",
                  "employee",
                  "support_staff",
                ]
              }
            >
              <MainLayout user={user} onLogout={logout}>
                <Setting />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace/>} />
      </Routes>
    </Router>
  );
};

export default App;
