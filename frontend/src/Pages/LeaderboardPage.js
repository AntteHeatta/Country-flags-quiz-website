import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackToGamePageButton from "../Misc/BackToGamePageButton";
import { useAuth } from "../Misc/AuthProvider";
import styles from "../assets/styles/LeaderboardPage.module.css";

const {
  pageContainer,
  leaderboardBoxContainer,
  leaderboardBox,
  leaderboardGrid,
  number,
  backToGamePageButtonPlacement,
  leaderboardText,
} = styles;

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const { authenticated, user } = useAuth();
  const [globalTimes, setGlobalTimes] = useState([]);

  useEffect(() => {
    if (!authenticated) {
      // Redirect to login page if not authenticated
      navigate("/");
    } else {
      fetchGlobalTop3Times();
    }
  }, []);

  const fetchGlobalTop3Times = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/leaderboard/globalTop3Times",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();
      setGlobalTimes(data);
      console.log("Global Top 3 Times:", data.username);
    } catch (error) {
      console.error("Error fetching global times:", error);
    }
  };

  if (!authenticated) {
    return null; // Render nothing if not authenticated
  }

  return (
    <div className={pageContainer}>
      <h1>Leaderboard</h1>
      <div className={leaderboardBoxContainer}>
        <div className={leaderboardBox}>
          <div className={leaderboardText}>Global top 3 fastest times</div>
          {globalTimes.length === 0 ? (
            <div>No times yet!</div>
          ) : (
            <div className={leaderboardGrid}>
              {globalTimes.map((time, index) => (
                <div key={index}>
                  <span className={number}>{index + 1}.</span> {time.timeTaken}{" "}
                  by {time.username}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={backToGamePageButtonPlacement}>
        <BackToGamePageButton />
      </div>
    </div>
  );
};

export default LeaderboardPage;
