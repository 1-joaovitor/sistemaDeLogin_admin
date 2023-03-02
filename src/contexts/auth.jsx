import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const recoveUser = localStorage.getItem("user");
    if (recoveUser) {
      setUser(JSON.parse(recoveUser));
    }
    setLoading(false);
  }, []);
  const login = (email, password) => {
    console.log("login auth", { email, password });

    if (password === "123") {
      const loggedUser = { email, password };
      localStorage.setItem("user", JSON.stringify(loggedUser));
      setUser(loggedUser);
      navigate("/");
      toast.success(`Seja bem vindo  ${email}`);
    }
    if (password != "123") {
      toast.error("Senha incorreta!");
      setUser(null);
      return;
    }
  };
  const logout = () => {
    setUser(null);
    navigate("/login");
    localStorage.removeItem("user");
    toast.success("Até a próxima!");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, login, logout, loading }}
    >
      <Toaster />
      {children}
    </AuthContext.Provider>
  );
};
