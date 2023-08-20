import React, { useState } from "react";
import styles from "../assets/styles/GamePage.module.css";

const { submitButton } = styles;

const AnswerForm = ({ onGuessSubmit, isGameStarted }) => {
  const [guess, setGuess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the user's guess to the parent component for validation
    onGuessSubmit(guess);
    // Clear the input field
    setGuess("");
  };

  return (
    isGameStarted && (
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="submitGuess"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
        </label>
        <button type="submit" className={submitButton}>
          Submit
        </button>
      </form>
    )
  );
};

export default AnswerForm;
