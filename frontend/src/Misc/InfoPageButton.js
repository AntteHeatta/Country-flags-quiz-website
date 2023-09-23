import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/styles/GamePage.module.css";

const { infoButton, buttonContainer } = styles;

const InfoPageButton = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      navigate("/infoPage");
    } catch (error) {
      console.error("Navigation failed", error);
    }
  };

  return (
    <div className={buttonContainer}>
      <button onClick={handleClick} className={infoButton}>
        Game info
      </button>
    </div>
  );
};

export default InfoPageButton;
