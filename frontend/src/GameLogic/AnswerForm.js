import React, { useState, useEffect, useRef } from "react";
import styles from "../assets/styles/GamePage.module.css";

const { submitButton } = styles;

const AnswerForm = ({ onGuessSubmit, isGameStarted }) => {
  const [guess, setGuess] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the user's guess to the parent component for validation
    onGuessSubmit(guess);
    // Clear the input field
    setGuess("");
  };

  useEffect(() => {
    if (isGameStarted) {
      inputRef.current.focus(); // Focus on the input field
    }
  }, [isGameStarted]);

  return (
    isGameStarted && (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="submitGuess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder={"Enter your guess"}
          ref={inputRef}
        />
        <button
          type="submit"
          className={submitButton}
          disabled={!isGameStarted}
        >
          Submit
        </button>
      </form>
    )
  );
};

export default AnswerForm;
