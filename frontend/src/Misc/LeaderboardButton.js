import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import styles from "../assets/styles/GamePage.module.css";

const { leaderboardButton } = styles;

const LeaderboardButton = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      navigate("/leaderboard");
    } catch (error) {
      console.error("Navigation failed", error);
    }
  };
  return (
    <button onClick={handleClick} class={leaderboardButton}>
      Leaderboard
    </button>
  );
};

export default LeaderboardButton;
