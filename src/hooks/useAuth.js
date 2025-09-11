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
      const response = await axios.post("http://127.0.0.1:8000/api/login", { 
        email, 
        password 
      });
      
      if(response.data.success){
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        // console.log("User set:", response.data.user);
        return true;
      }
      return false;
    } catch(error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (name, email, password) => {
    try{
      const response = await axios.post("http://127.0.0.1:8000/api/register", { 
        name,
        email, 
        password 
      });
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
      await axios.post("http://127.0.0.1:8000/api/logout", {}, {
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