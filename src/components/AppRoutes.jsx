import React, { Fragment, useContext } from "react";
import { useState } from "react";
import "../index.css";
import App from "../App";
import { Login } from "../components/Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Signup } from "./Signup";
import { AuthProvider, AuthContext } from "../contexts/auth";

export const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div>Carregando...</div>;
    }
    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Fragment>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Private>
                  <App />
                </Private>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </AuthProvider>
      </Fragment>
    </BrowserRouter>
  );
};
