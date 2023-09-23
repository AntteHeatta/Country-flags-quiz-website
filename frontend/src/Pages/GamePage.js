import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoutButton from "../Misc/LogoutButton";
import LeaderboardButton from "../Misc/LeaderboardButton";
import Flag from "../GameLogic/Flag";
import CurrentScore from "../GameLogic/CurrentScore";
import AnswerForm from "../GameLogic/AnswerForm";
import FinalScore from "../GameLogic/FinalScore";
import { useAuth } from "../Misc/AuthProvider";
import styles from "../assets/styles/GamePage.module.css";
import { useNavigate } from "react-router-dom";
import InfoPageButton from "../Misc/InfoPageButton";

const {
  pageContainer,
  gameBox,
  startButton,
  logoutButtonPlacement,
  leaderboardButtonPlacement,
  infoPageButtonPlacement,
} = styles;

const GamePage = () => {
  const { authenticated, user } = useAuth();
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0.0);
  const [flagUrl, setFlagUrl] = useState("");
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [timeSpent, setTimeSpent] = useState(0);
  const [welcomeDisplayed, setWelcomeDisplayed] = useState(false);

  const fetchNextFlag = async (countryCode) => {
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
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 0.01);
      }, 10);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isGameStarted, countryCode]);

  useEffect(() => {
    if (!authenticated) {
      // Redirect to login page if not authenticated
      navigate("/");
    }
  }, [authenticated, navigate]);

  useEffect(() => {
    if (score >= 20) {
      endGame();
    }
  });

  const endGame = () => {
    setIsGameStarted(false);
    setTimeSpent(timer);
    setScore(0);
    setGameEnded(true);

    const userData = {
      username: user.username, // Use the authenticated user's username
      timeTaken: timer.toFixed(2),
    };

    axios
      .post("http://localhost:8080/api/saveTimeTaken", userData, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Include the token in the header
        },
      })
      .then((response) => {
        //Empty on purpose
      })
      .catch((error) => {
        //Empty on purpose
      });
  };

  const handleGuess = (guess) => {
    if (guess.toLowerCase() === countryName.toLowerCase()) {
      setScore(score + 2);
    } else {
      setScore(score - 1);
    }
    const randomCountryCode = randomizeCode();
    setCountryCode(randomCountryCode);
    fetchNextFlag(randomCountryCode);
  };

  const startGame = () => {
    const randomCountryCode = randomizeCode();
    fetchNextFlag(randomCountryCode);
    setFlagUrl("");
    setIsGameStarted(true);
    setGameEnded(false);
    setTimeSpent(0);
    setTimer(0.0);
    setWelcomeDisplayed(true);
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

  if (!authenticated) {
    return null; // Render nothing if not authenticated
  }

  return (
    <div className={pageContainer}>
      <h1>FLAG QUIZ</h1>
      {!welcomeDisplayed && <h1>Welcome, {user.username}!</h1>}
      <div className={gameBox}>
        {isGameStarted ? (
          <>
            <p>{timer.toFixed(2)}</p>
          </>
        ) : (
          <button onClick={startGame} className={startButton}>
            Start Game
          </button>
        )}
        <div className={infoPageButtonPlacement}>
          <InfoPageButton></InfoPageButton>
        </div>
        {gameEnded && <FinalScore timeTaken={timeSpent.toFixed(2)} />}
        {isGameStarted && <Flag flagUrl={flagUrl} />}
        {isGameStarted && <CurrentScore score={score} />}
        <AnswerForm onGuessSubmit={handleGuess} isGameStarted={isGameStarted} />
        <div className={logoutButtonPlacement}>
          <LogoutButton />
        </div>
        <div className={leaderboardButtonPlacement}>
          <LeaderboardButton />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
