import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/styles/GamePage.module.css";

const { logoutButton } = styles;

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("jwtToken");
      // Navigate the user back to the login page
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
