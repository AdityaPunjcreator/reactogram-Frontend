import "./App.css";
import Login from "./pages/loginPage";
import SignUp from "./pages/signUp";
import Navbar from "./component/navbar";
import Profile from "./pages/profile";
import CardOverview from "./pages/CardOverview";
import Userprofile from "./pages/userprofile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, loginError } from "./redux/Action/userAction";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // the way which we can implement
// routing in React js is by Third party library called "react-router-dom"
function App() {
  /* we want that when the user refreshes the page, the same state of the application should be maintained
 so for that we will be using - useEffect hook. we know that when we start the application the first component
 that lods is the "app.js" so we are implementing the logic here  */

  function DynamicRouting() {
    const Dispatch = useDispatch();
    const Navigate = useNavigate();

    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("user")); // parsing the data to convert from string to object
      if (userData) {
        Dispatch(loginSuccess(userData)); // dispatching the login success action if user exists, that is asking the application not to change the state when the page refreshes
        Navigate("/posts");
      } else {
        // the below code will run in case the user is not logged in
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        Dispatch(loginError());
        Navigate("/login");
      }
      /* we know that useNavigate() may be used only in the context of a <Router> component. so we will have 
    to create a component which will contain all these routes, and finally we will load the component in below*/

      // Do not return anything here (always keep in mind)
    }, []); // Empty dependency array to run the effect only once
    return (
      <>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/posts" element={<CardOverview />}></Route>
          <Route exact path="/myprofile" element={<Profile />}></Route>
          <Route
            exact
            path="/userprofile/:authorId"
            element={<Userprofile />}
          ></Route>
        </Routes>
        ;
      </>
    );
  }

  return (
    <div>
      <Router>
        {/* the below component is the child of Router */}
        <Navbar />
        <DynamicRouting />
      </Router>
    </div>
  );
}

export default App;
