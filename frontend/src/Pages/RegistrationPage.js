import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Misc/AuthProvider";
import styles from "../assets/styles/RegistrationPage.module.css";

const {
  pageContainer,
  formGroup,
  registrationFormBox,
  usernameInput,
  usernameLabel,
  emailLabel,
  emailInput,
  passwordLabel,
  passwordInput,
  registrationButton,
  tooltipContainer,
  tooltipText,
} = styles;

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { saveUserDataForLogin } = useAuth();

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/registration",
        { username, email, password }
      );
      const token = response.data.response;
      saveUserDataForLogin({ username, token });
      navigate("/gamePage");
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <div className={pageContainer}>
      <h1>Registration</h1>
      <div className={registrationFormBox}>
        {errors && (
          <div>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={tooltipContainer}>
            <label htmlFor="username" className={usernameLabel}>
              <div className={tooltipText}>Visible to all users</div>
              <span
                className={usernameInput}
                role="img"
                aria-label="user icon"
              ></span>
            </label>
            <input
              type="text"
              id="username"
              name="usernameRegister"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className={formGroup}>
            <label htmlFor="email" className={emailLabel}></label>
            <span
              className={emailInput}
              role="img"
              aria-label="user icon"
            ></span>
            <input
              type="email"
              id="email"
              name="emailRegister"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
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
              name="passwordRegister"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={registrationButton}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
