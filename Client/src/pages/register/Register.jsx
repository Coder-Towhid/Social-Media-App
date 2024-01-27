import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_SERVER } from "../../utils/constant";
import "../register/register.css";
const Register = () => {
  const navigate = useNavigate();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("password don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(`${API_SERVER}/api/auth/register`, user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <div className="loginLogo">T Social</div>
          <span className="loginDess">
            Connect with Friends and the world around you on T Social
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              ref={username}
              required
              className="loginInput"
            />
            <input
              placeholder="Email"
              ref={email}
              type="email"
              required
              className="loginInput"
            />
            <input
              placeholder="Password"
              ref={password}
              type="password"
              required
              className="loginInput"
              minLength={6}
            />
            <input
              placeholder="Confirm Password"
              ref={confirmPassword}
              type="password"
              required
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link style={{textAlign : "center"}} to={"/login"}>
              <button className="loginRegistrationButton">
                Log Into Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
