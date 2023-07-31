import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./Auth.css";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); // isLoggedIn 상태 업데이트

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !username) {
      setError("Please fill in all fields.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password should be at least 8 characters long.");
      return;
    }
    if (username.includes(" ")) {
      setError("Username should not contain spaces.");
      return;
    }
    setError("");
    setIsLoggedIn(true); // isLoggedIn 상태 업데이트
    console.log(`submit! Email: ${email} Password: ${password} Username: ${username}`);
    navigate("/home");
  };

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };


  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="login-items">
          <div className="login-items-text">E-mail</div>
          <input
            className="login-items-input"
            name="email"
            value={email}
            placeholder="example@kangwon.ac.kr"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-items">
          <div className="login-items-text">Password</div>
          <input
            className="login-items-input"
            type="password"
            name="password"
            value={password}
            placeholder="At least 8 characters"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-items">
          <div className="login-items-text">Username</div>
          <input
            className="login-items-input"
            name="username"
            value={username}
            placeholder="No space allowed"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {error ? <p className="error-message">{error}</p> : null}
        <input className="login-items-submit" type="submit" value="가입하기" />
      </form>
      <button className="login-items-btn-kakao">카카오톡으로 시작하기</button>
      <button className="login-items-btn-google">구글로 시작하기</button>
    </div>
  );
}

export default Auth;
