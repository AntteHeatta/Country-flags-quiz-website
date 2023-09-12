import React, { useState } from "react";

const AnswerForm = ({ flagName, onGuessSubmit, isGameStarted }) => {
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
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    )
  );
};

export default AnswerForm;
