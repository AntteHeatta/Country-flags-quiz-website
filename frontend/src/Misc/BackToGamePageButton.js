import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import styles from "../assets/styles/LeaderboardPage.module.css";

const { backToGamePageButtonPlacementButton } = styles;

const BackToGamePageButton = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      navigate("/gamePage");
    } catch (error) {
      console.error("navigation failed", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={backToGamePageButtonPlacementButton}
    >
      Game Page
    </button>
  );
};

export default BackToGamePageButton;
