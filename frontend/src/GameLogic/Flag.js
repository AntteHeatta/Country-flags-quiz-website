import React, { useState, useEffect } from "react";

const Flag = ({ flagUrl }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Preload the image in the background
    const image = new Image();
    image.src = flagUrl;
    image.onload = () => {
      // Once the image is loaded, update the state to display it
      setIsLoaded(true);
    };
  }, [flagUrl]);

  const flagStyle = {
    width: "200px",
    height: "auto",
  };

  return (
    <div>
      {isLoaded ? (
        <img src={flagUrl} alt="Flag" style={flagStyle} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Flag;
