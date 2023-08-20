import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../Misc/LoginForm";
import styles from "../assets/styles/HomePage.module.css";

const {
  pageContainer,
  loginFormBox,
  betweenLoginRegisterText,
  registrationButton,
  registrationLink,
} = styles;

const HomePage = () => {
  return (
    <div className={pageContainer}>
      <h1>COUNTRY QUIZ GAME</h1>
      <p>Log in or register below to play!</p>
      <div className={loginFormBox}>
        <LoginForm />
        <div className={betweenLoginRegisterText}>------ or ------</div>
        <button href="/register" className={registrationButton}>
          <Link to="/register" className={registrationLink}>
            Register
          </Link>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
