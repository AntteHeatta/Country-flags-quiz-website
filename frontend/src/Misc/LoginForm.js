import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import styles from "../assets/styles/LoginForm.module.css";

const {
  formGroup,
  usernameLabel,
  passwordLabel,
  usernameInput,
  passwordInput,
  loginButton,
} = styles;

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { saveUserDataForLogin } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        username,
        password,
      });
      const token = response.data.response;
      saveUserDataForLogin({ username, token });
      navigate("/gamePage");
    } catch (error) {
      setMessage(error.response.data.response);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && <div className="error-message">{message}</div>}
      <br />
      <div className={formGroup}>
        <label htmlFor="username" className={usernameLabel}></label>
        <span
          className={usernameInput}
          role="img"
          aria-label="user icon"
        ></span>
        <input
          type="text"
          id="username"
          name="usernameLogin"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </div>
      <div className={formGroup}>
        <label htmlFor="password" className={passwordLabel}>
          <span
            className={passwordInput}
            role="img"
            aria-label="password icon"
          ></span>
        </label>
        <input
          type="password"
          id="password"
          name="passwordLogin"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className={loginButton}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
