import { useState } from 'react';
import axios from "axios";

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    return token && userData ? JSON.parse(userData) : null;
  });

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, { 
        email, 
        password 
      });
      
      if(response.data.success){
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        return true;
      }
      return false;
    } catch(error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (name, email, password, confirmPassword) => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, { 
        name,
        email, 
        password,
        password_confirmation: confirmPassword, 
      });

      console.log(response.data);
      if (response.data.success){
        return true;
      }
    }catch{
      return false;
    };
  };

  const logout = async () => {
    try{
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }catch (error) {
      console.error("Logout error:", error);
    }finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  return {
    user,
    login,
    logout, 
    register,
    isAuthenticated: !!user
  };
};