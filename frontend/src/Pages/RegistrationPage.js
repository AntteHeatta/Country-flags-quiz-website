import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
} = styles;

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/registration",
        formData
      );
      console.log("Registration successful", response.data);
      navigate("/gamePage");
    } catch (error) {
      console.log(error.response.data.errors);

      // setMessage(error.response.data.response);
      setErrors(error.response.data);
      console.log("Registration error", error);
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
          <div className={formGroup}>
            <label htmlFor="username" className={usernameLabel}></label>
            <span
              className={usernameInput}
              role="img"
              aria-label="user icon"
            ></span>
            <input
              type="usernameRegister"
              name="username"
              placeholder="Username"
              onChange={handleChange}
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
              type="emailRegister"
              name="email"
              placeholder="Email"
              onChange={handleChange}
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
              name="password"
              placeholder="Password"
              onChange={handleChange}
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
