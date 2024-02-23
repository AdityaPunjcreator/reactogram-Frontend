import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../constant";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import "./Userprofile.css";

const Userprofile = () => {
  const [profile, setProfile] = useState([]);
  const { authorId } = useParams(); // Extract authorId from URL parameters
  const getuserprofile = async (postauthorid) => {
    try {
      const response = await axios.get(`${API_BASE_URL}${postauthorid}`);
      debugger;
      if (response.status === 200) {
        setProfile(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getuserprofile(authorId); // Call getuserprofile with the extracted authorId
  }, [authorId]); // Add authorId to the dependency array

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col d-flex justify-content-center">
          <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="custom-div"></div>
            <div className="card-body">
              <img
                src="https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d"
                alt="profile-pic"
                className="user-profile-pic"
              />
              <span className="btn btn-primary float-end">follow</span>
              <div className="card-title">
                <h5>name of the person whose profile is being viewed</h5>
                <p>email id of the persons</p>
                <p>date joined the twitter that is created on </p>
                <p>
                  <span>Followers</span> <span>Following</span>
                </p>
              </div>

              <h5 className="card-text text-center">Tweets</h5>
            </div>
            <div className="row">
              <div className="col d-flex justify-content-center">
                <div
                  className="card mx-2   mb-3 shadow"
                  style={{ maxWidth: "400px" }}
                >
                  <div className="row">
                    <div className="col-md-2">
                      <img
                        src="https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d"
                        alt="profile-image"
                        className="tweet-profile-pic ms-2 mt-2"
                      />
                    </div>
                    <div className="col-md-10">
                      <div className="card-body">
                        <div className="row">
                          <div className="col"></div>
                        </div>

                        <h5 className="card-title">
                          @ created by - date and time
                        </h5>

                        <p className="card-text">
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </p>
                        <div>
                          <img
                            src="https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d"
                            alt="postedImage"
                            className=""
                            height="200px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
