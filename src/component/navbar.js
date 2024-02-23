import React from "react";
import "./navbar.css";
import { IoMdSearch } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io"; // importing react-icons
import { MdHome } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { loginError } from "../redux/Action/userAction";
import { useDispatch, useSelector } from "react-redux";
const Navbar = () => {
  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  const user = useSelector((state) => state.userReducer.user._id);
  console.log(user);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Dispatch(loginError());
    Navigate("/login");
  };

  return (
    <div>
      <nav className="navbar fixed-top bg-body-tertiary shadow-sm py-3 mb-5">
        <div className="container-fluid">
          <NavLink className="navbar-brand ms-md-5" to="/posts">
            <img src="images/logo.PNG" height="45px" alt="navlogo"></img>
          </NavLink>
          <form className="d-flex" role="search">
            <input
              className="form-control border me-5 search-box text-muted"
              type="search"
              placeholder="Search"
            />
            <button className="btn search-button me-sm-5 " type="submit">
              <IoMdSearch className="fs-3" />
            </button>

            <div className="d-flex">
              <NavLink className="nav-link nav-style me-sm-4 me-4" to="/posts">
                <MdHome className="fs-3" />
              </NavLink>
              {user && (
                <span className="nav-link nav-style  me-sm-4 me-4">
                  <FaRegHeart className="fs-3" />
                </span>
              )}
              {user ? (
                ""
              ) : (
                <span className="nav-item">
                  <NavLink className="nav-link  fs-5" to="/login">
                    <span>
                      <IoIosLogIn className="fs-3" />
                    </span>
                    login
                  </NavLink>
                </span>
              )}
              {user && (
                <span
                  className="nav-link nav-style me-sm-4 me-1"
                  style={{ cursor: "pointer" }}
                >
                  <div className="btn-group dropstart float-end">
                    <span data-bs-toggle="dropdown">
                      <img
                        src="https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="profile-pic"
                        className="navbar-profile-pic"
                      ></img>
                    </span>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/myprofile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => logout()}
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </span>
              )}
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
