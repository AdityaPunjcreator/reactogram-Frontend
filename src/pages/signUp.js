import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../constant";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const Navigate = useNavigate();

  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [Fullname, setFullname] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [loader, setloader] = useState(false);

  const signUpSubmission = async (event) => {
    event.preventDefault();
    debugger;
    setloader(true);

    try {
      const requestdata = {
        Fullname: Fullname,
        Email: Email,
        PhoneNumber: PhoneNumber,
        Password: Password,
        ConfirmPassword: ConfirmPassword,
      };
      const signupdata = await axios.post(
        `${API_BASE_URL}user/signup`,
        requestdata
      );
      debugger;
      console.log(signupdata);
      console.log(signupdata.data);

      if (signupdata.status === 201) {
        setloader(false);
        debugger;
        Swal.fire({
          icon: "success",
          title: signupdata.data.message,
        });

        setPhoneNumber("");
        setEmail("");
        setFullname("");
        setPassword("");
        setConfirmPassword("");
        Navigate("/login");
      }
    } catch (error) {
      debugger;
      console.log(error);
      setloader(false);
      Swal.fire({
        icon: "error",
        title: error.response.data.error,
      });
    }
  };
  const Loader = () => {
    return (
      <div className="row">
        <div className="col-sm-12 loader">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container login-container">
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
          <div className="card shadow ">
            {loader && <Loader />}
            <div className="card-body px-sm-5">
              <h5 className="card-title text-center mt-3 fw-bold">Sign Up</h5>
              <form onSubmit={signUpSubmission}>
                <input
                  type="text"
                  className="form-control mb-2 input-bg p-3 mt-3"
                  placeholder="Phone"
                  value={PhoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
                <input
                  type="email"
                  className="form-control mb-2 input-bg p-3"
                  placeholder="email"
                  value={Email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <input
                  type="text"
                  className="form-control  input-bg p-3 mb-2"
                  placeholder="Full Name"
                  value={Fullname}
                  onChange={(event) => setFullname(event.target.value)}
                />

                <input
                  type="password"
                  className="form-control input-bg p-3 mb-2"
                  placeholder="password"
                  value={Password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <small className="mb-2">(password must be 8 characters)</small>
                <input
                  type="password"
                  className="form-control input-bg p-3 mb-2"
                  placeholder="confirm password"
                  value={ConfirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <div className="d-grid mt-3 mb-5">
                  <button type="submit" className="custom-btn">
                    Sign Up
                  </button>
                </div>
                <div className="or-divider">
                  <hr />
                  <span>OR</span>
                </div>

                <div>
                  <div className="d-grid mt-3 mb-5">
                    <button className="custom-button">
                      <Link
                        to="/login"
                        className="text-info fw-bold ms-2"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="text-dark me-1">
                          Already have an accout?
                        </span>
                        log In
                      </Link>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
