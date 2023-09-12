import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoutButton from "../Misc/LogoutButton";
import Flag from "../GameLogic/Flag";
import Timer from "../GameLogic/Timer";
import CurrentScore from "../GameLogic/CurrentScore";
import AnswerForm from "../GameLogic/AnswerForm";
import FinalScore from "../GameLogic/FinalScore";

const GamePage = () => {
  const [flagUrl, setFlagUrl] = useState("");
  const [score, setScore] = useState(0);
  // const [timer, setTimer] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [gameStartTime, setGameStartTime] = useState(null);
  const [gameEndTime, setGameEndTime] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);

  // useEffect(() => {
  //   const fetchFlags = async () => {
  //     try {
  //       const response = await axios.get("your-flag-api-url-here");
  //       setFlag(response.data);
  //     } catch (error) {
  //       console.error("Error fetching flags:", error);
  //     }
  //   };

  //   fetchFlags();
  // }, []);

  const fetchNextFlag = async (countryCode) => {
    // Fetch flag from your API
    // Set flag to the fetched data
    try {
      const response = await axios.get(
        `https://restcountries.com/v3/alpha/${countryCode}`
      );
      const countryName = response.data[0].name.common;
      const flagImageUrl = response.data[0].flags[0];
      setCountryName(countryName);
      setFlagUrl(flagImageUrl);
    } catch (error) {
      console.error("Error fetching flag:", error);
    }
  };

  useEffect(() => {
    if (isGameStarted) {
      fetchNextFlag(countryCode);
    }
  }, [isGameStarted, countryCode]);

  // Function to start the game
  const startGame = () => {
    const randomCountryCode = randomizeCode();
    setCountryCode(randomCountryCode);
    fetchNextFlag(randomCountryCode);
    setIsGameStarted(true);
    setGameEnded(false);
    setGameStartTime(Date.now());
    setTimeSpent(0);
  };

  // Function to handle user's guess
  const handleGuess = (guess) => {
    if (guess.toLowerCase() === countryName.toLowerCase()) {
      setScore(score + 1);
    }
    const randomCountryCode = randomizeCode();
    setCountryCode(randomCountryCode);
    fetchNextFlag(randomCountryCode);

    if (score === 2) {
      endGame();
    }
    // // Check if the game is finished
    // if (currentFlagIndex === flags.length - 1) {
    //   setIsGameStarted(false);
    // } else {
    //   setCurrentFlagIndex(currentFlagIndex + 1);
    // }
  };

  const endGame = () => {
    // Set gameStarted to false to stop the timer
    setIsGameStarted(false);
    const endTime = Date.now();
    setGameEndTime(endTime);
    setScore(0);
    setGameEnded(true);
  };

  const randomizeCode = () => {
    const countryCodes = [
      "US",
      "CA",
      "AU",
      "GB",
      "FR",
      "DE",
      "IT",
      "JP",
      "CN",
      "IN",
    ];
    const randomIndex = Math.floor(Math.random() * countryCodes.length);
    const randomCountryCode = countryCodes[randomIndex];
    return randomCountryCode;
  };

  return (
    <div>
      <h1>FLAG QUIZ</h1>
      {/* Start Button */}
      {isGameStarted ? (
        <>
          <Timer isActive={isGameStarted} setTimeSpent={setTimeSpent} />
        </>
      ) : (
        <button onClick={startGame}>Start Game</button>
      )}
      {/* Conditionally render FinalScore */}
      {gameEnded && <FinalScore timeTaken={timeSpent} />}
      {/* Display Flag */}
      {isGameStarted && <Flag flagUrl={flagUrl} />}
      {/* Display Score */}
      {isGameStarted && <CurrentScore score={score} />}
      <AnswerForm
        flagName={flagUrl.name}
        onGuessSubmit={handleGuess}
        isGameStarted={isGameStarted}
      />
      <LogoutButton />
    </div>
  );
};

export default GamePage;
