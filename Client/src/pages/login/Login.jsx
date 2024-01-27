import CircularProgress from "@mui/material/CircularProgress";
import { useContext, useRef } from "react";
import { loginCall } from "../../loginCall";

import "../login/login.css";

import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, err, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email.current.value, password.current.value);
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
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
              placeholder="Email"
              type="email"
              required
              ref={email}
              className="loginInput"
            />
            <input
              placeholder="Password"
              type="password"
              minLength="6"
              required
              ref={password}
              className="loginInput"
            />

            <button type="submit" className="loginButton">
              {isFetching ? <CircularProgress color="white" /> : "Log in"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link style={{textAlign : "center"}} to={"/register"}>
              <button className="loginRegistrationButton">
                Create a New Account.
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
