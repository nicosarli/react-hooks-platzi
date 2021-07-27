import React, { useState } from "react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleClick = () => {
    setDarkMode(!darkMode);
  };

  if (darkMode) {
    document.documentElement.style.setProperty("--background-App", "#000");
    document.documentElement.style.setProperty("--fontColor-App", "#fff");
    document.documentElement.style.setProperty(
      "--borderContent",
      "2px solid burlywood"
    );
  } else {
    document.documentElement.style.setProperty("--background-App", "#fff");
    document.documentElement.style.setProperty("--fontColor-App", "#000");
    document.documentElement.style.setProperty(
      "--borderContent",
      "2px solid black"
    );
  }

  return (
    <div className="Header">
      <h1>ReactHooks</h1>
      <button type="button" onClick={handleClick}>
        {darkMode ? "Dark Mode" : "Light Mode"}
      </button>
    </div>
  );
};

export default Header;
