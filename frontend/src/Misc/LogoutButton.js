import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import styles from "../assets/styles/GamePage.module.css";

const { logoutButton } = styles;

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Navigate the user back to the login page
      logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <button onClick={handleLogout} className={logoutButton}>
      Logout
    </button>
  );
};

export default LogoutButton;
