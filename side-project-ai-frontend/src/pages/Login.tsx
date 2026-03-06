import React from "react";
import LoginImage from "../assets/Sign_In_Picture.jpg";
import Header from "../components/HeaderGeneric";
import Footer from "../components/Footer";
import "../styles/login.css";
import admin from "../data/demo_login_cred.json";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* Extract username and password from the form */
    const formData = new FormData(e.currentTarget);
    const username = String(formData.get("username") || "");
    const password = String(formData.get("password") || "");

    const decodedPass = atob(admin.password);
    if (username === admin.username && password === decodedPass) {
      localStorage.setItem("username", username);
      navigate("/Main");
    } else {
      setError("Invalid username or password entered. Try Again.");
    }
  };

  return (
    <>
      <Header></Header>
      <Toolbar />
      <div className="container">
        {/* Background Image */}
        <div className="background_picture">
          <img src={LoginImage} alt="Login Visual" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>

          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Username"
            id="username"
          />

          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            id="password"
          />

          <button type="submit">LOGIN</button>
          {error && <p style={{ marginTop: "12px", color: "red" }}>{error}</p>}
          {/* Forgot Password */}
          <div className="social">
            <div className="go">
              <i className="forgot-password"></i> Forgot Password?
            </div>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Login;
