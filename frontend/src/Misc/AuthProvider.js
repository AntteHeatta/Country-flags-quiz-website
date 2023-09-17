import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check for the token in local storage
    const token = localStorage.getItem("jwtToken");

    if (token) {
      // Clear the token from local storage
      localStorage.removeItem("jwtToken");

      // Clear the user authentication state
      setUser(null);
      setAuthenticated(false);
    }
  }, []);

  const saveUserDataForLogin = ({ username, token }) => {
    setUser({ username, token });
    localStorage.setItem("jwtToken", token);
    setAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("jwtToken");
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, authenticated, saveUserDataForLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
