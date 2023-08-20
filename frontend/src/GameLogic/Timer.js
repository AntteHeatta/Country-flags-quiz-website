import React, { useState, useEffect } from "react";

const Timer = ({ isActive, setTimeSpent }) => {
  const [totalMilliseconds, setTotalMilliseconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (isActive) {
      const startTime = Date.now() - totalMilliseconds;
      const id = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        setTotalMilliseconds(elapsedTime);
        setTimeSpent(elapsedTime / 1000);
      }, 100);

      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isActive, totalMilliseconds, intervalId, setTimeSpent]);

  const seconds = Math.floor(totalMilliseconds / 1000);
  const milliseconds = totalMilliseconds % 1000;

  return (
    <div>
      {seconds}.{milliseconds}
    </div>
  );
};

export default Timer;
