import React from "react";

const FinalScore = ({ timeTaken }) => {
  return (
    <div>
      <h2>10 flags guessed right</h2>
      <p>Time Taken: {timeTaken} seconds</p>
    </div>
  );
};

export default FinalScore;
