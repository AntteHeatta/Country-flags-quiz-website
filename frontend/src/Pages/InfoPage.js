import React, { useEffect } from "react";
import { useAuth } from "../Misc/AuthProvider";
import { useNavigate } from "react-router-dom";
import BackToGamePageButton from "../Misc/BackToGamePageButton";
import styles from "../assets/styles/InfoPage.module.css";

const { pageContainer, infoBox, happyText, backToGamePageButtonPlacement } =
  styles;

const InfoPage = () => {
  const { authenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      // Redirect to login page if not authenticated
      navigate("/");
    }
  }, []);

  if (!authenticated) {
    return null; // Render nothing if not authenticated
  }

  return (
    <div className={pageContainer}>
      <h1>RULES</h1>
      <div className={infoBox}>
        <h5>Guess the flags as fast as possible</h5>
        <h5>Correct guess is +2 points</h5>
        <h5>Incorrect guess is -1 point</h5>
        <h3 className={happyText}>Happy guessing!</h3>
      </div>
      <div className={backToGamePageButtonPlacement}>
        <BackToGamePageButton />
      </div>
    </div>
  );
};

export default InfoPage;
