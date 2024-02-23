import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../constant";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/Action/userAction";

function Login() {
  const [loader, setloader] = useState(false); // creating state variables
  const [Email, setEmail] = useState(""); // creating state variables
  const [Password, setPassword] = useState(""); // creating state variables

  const Dispatch = useDispatch(); // Dispatch action ko trigger karta hai
  const Navigate = useNavigate();

  const loginEventhandler = async (event) => {
    event.preventDefault();
    setloader(true);

    try {
      const requestbody = { Email: Email, Password: Password };
      const loginresult = await axios.post(
        `${API_BASE_URL}user/login`,
        requestbody
      );
      console.log(loginresult);
      console.log(loginresult.data);
      if (loginresult.status === 200) {
        Swal.fire({
          icon: "success",
          title: loginresult.data.message,
        });
        console.log(loginresult.data.token);
        localStorage.setItem("token", loginresult.data.token);
        localStorage.setItem("user", JSON.stringify(loginresult.data.user));
        Dispatch(loginSuccess(loginresult.data.user)); // this will trigger the action
        setloader(false); // setting the loader to false
        Navigate("/myprofile"); // redirecting to myprofile section once the user is logged in
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setloader(false);
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.error,
      });
    }
  };
  const Loadericon = () => {
    if (loader) {
      return (
        <div className="row">
          <div className="col-sm-12 loader">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="container login-container mt-5">
      <div className="row ">
        <div className="col-xl-7 col-12 d-flex justify-content-center align-items-center">
          <img
            src="images/social-desktop.PNG"
            height="85%"
            alt=""
            className="d-sm-block d-none"
          ></img>
          <img
            src="images/social-mobile.PNG"
            height="100%"
            alt=""
            className="d-sm-none d-block"
          ></img>
        </div>
        <div className="col-xl-5 col-12 d-flex justify-content-center align-items-center">
          <div className="card shadow">
            <Loadericon />
            <div className="card-body px-sm-5">
              <h5 className="card-title text-center mt-3 fw-bold">Log In</h5>
              <form onSubmit={loginEventhandler}>
                <input
                  type="email"
                  className=" mt-4 form-control  input-bg p-3 mb-2"
                  placeholder="email"
                  value={Email}
                  onChange={(event) => setEmail(event.target.value)}
                />

                <input
                  type="password"
                  className="form-control input-bg p-3 mb-2"
                  placeholder="password"
                  value={Password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <small className="mb-2">(password must be 8 characters)</small>
                <div className="d-grid mt-3 mb-5">
                  <button type="submit" className="custom-btn">
                    log in
                  </button>
                </div>
                <div className="or-divider">
                  <hr />
                  <span>OR</span>
                </div>

                <div className="d-grid mt-3 mb-5">
                  <button className="custom-button">
                    <Link
                      to="/signup"
                      className="text-info fw-bold ms-2"
                      style={{ textDecoration: "none" }}
                    >
                      <span className="text-dark me-1">
                        Don't have an account?
                      </span>
                      sign Up
                    </Link>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
