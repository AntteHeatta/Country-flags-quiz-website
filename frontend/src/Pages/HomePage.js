import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../Misc/LoginForm";

const HomePage = () => {
  return (
    <div>
      <h1>This is the Home Page</h1>
      <p>Welcome to the main page of our application TEST.</p>
      <Link to="/register">Go to Registration Page</Link>
      <LoginForm />
    </div>
  );
};

export default HomePage;
