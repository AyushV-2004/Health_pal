import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setId(token);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); // Empty dependency array ensures this runs once on mount

  const StoreinLs = (id) => {
    localStorage.setItem("token", id);
    setId(id);
    setIsLoggedIn(true);
  };

  const userAuth = async () => {
    try {
      if (id) {
        const response = await fetch("http://localhost:2024/api/auth/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${id}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    userAuth();
  }, [id]); // Fetch user data when token changes

  const LogoutUser = () => {
    setId(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ StoreinLs, LogoutUser, isLoggedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
