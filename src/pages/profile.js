import React, { useState, useEffect } from "react";
import "./profile.css";
import Modal from "react-bootstrap/Modal";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import { BiSolidNavigation } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import { FaUpload } from "react-icons/fa6";
import API_BASE_URL from "../constant";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const Navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.user);
  console.log(user);
  const [show, setShow] = useState(false);
  const [mypost, setmypost] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showPost, setShowPost] = useState(false);

  const handlePostClose = () => setShowPost(false);
  const handlePostShow = () => setShowPost(true);

  // crating an image state variable

  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");

  const [details, showDetails] = useState({});

  const setDetails = (postdetails) => {
    showDetails(postdetails); // this will set the value of details as the object which is one of the items in the array we are receiving from the database
  };

  const getmyposts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}myposts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      debugger;
      if (response.status === 200) {
        setmypost(response.data.myposts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletepost = async (postId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}delete/${postId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      debugger;
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: response.data.message,
        });

        setShow(false);
        getmyposts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = async () => {
    // creating the form data which will be sent to the server

    const imagedata = new FormData();
    imagedata.append("image", image);

    try {
      const imageUploadData = await axios.post(
        `${API_BASE_URL}upload`,
        imagedata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(imageUploadData);
      const imageFileName = imageUploadData.data.filename;
      console.log(imageFileName);
      return imageUploadData;
      /*if (imageUploadData.status === 201) {
        // Reset states after successful upload
        setImage("");
        setImagePreview("");
        setUploadicon(true);
        Swal.fire({
          icon: "success",
          title: imageUploadData.data.message,
        });
      }*/
    } catch (error) {
      console.log(error);
      /* setImage("");
      setImagePreview("");
      setUploadicon(true);
      Swal.fire({
        icon: "error",
        title: error.response.data,
      });*/
    }
  };

  const handleImagePreview = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);

    if (selectedImage) {
      const previewURl = URL.createObjectURL(selectedImage);
      setImagePreview(previewURl);
    } else {
      setImagePreview("");
    }
  };

  // trying to create a statevariable to toggle the upload icon

  const [uploadicon, setUploadicon] = useState(true);

  const icontoggler = () => {
    setUploadicon(false);
  };

  const [description, setdescription] = useState("");
  const [location, setlocation] = useState("");

  const handlePost = async () => {
    // adding frontend validation
    if (!image) {
      return Swal.fire({
        icon: "error",
        title: "post image is required",
      });
    } else if (!description) {
      return Swal.fire({
        icon: "error",
        title: "description is required",
      });
    } else if (!location) {
      return Swal.fire({
        icon: "error",
        title: "location is required",
      });
    }
    const imageResponse = await handleImageUpload();
    const requestdata = {
      description: description,
      location: location,
      image: `${API_BASE_URL}files/${imageResponse.data.filename}`, // the rest part of the url is coming from the imageResponse.data.filename
    };

    // writing api call to create post

    try {
      const postResponse = await axios.post(
        `${API_BASE_URL}post`,
        requestdata,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      if (postResponse.status === 201) {
        // Reset states after successful upload
        setImage("");
        setImagePreview("");
        setdescription("");
        setlocation("");
        setUploadicon(true);
        Navigate("/posts");
        Swal.fire({
          icon: "success",
          title: postResponse.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      setImage("");
      setImagePreview("");
      setdescription("");
      setlocation("");
      setUploadicon(true);
      Swal.fire({
        icon: "error",
        title: error.response.data.error,
      });
    }
  };

  useEffect(() => {
    getmyposts();
  }, []);

  return (
    <div className="container shadow">
      <div className="row ">
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <img
            src={user.Image}
            alt="profile-pic"
            className="profile-pic ms-3 mt-4"
          ></img>
          <p className="ms-3 fs-5 fw-bold">{user.Fullname}</p>
          <p className="ms-3">{user.PhoneNumber}</p>
          <p className="ms-3">{user.Email}</p>
          <p className="ms-3">UI/UX designer {user.Fullname}</p>
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-between">
          <div className="d-flex mt-4 mb-sm-4 mb-4 justify-content-evenly">
            <div className="border-end border-3 pe-sm-4 pe-4 text-center fw-bold ">
              <p className="fs-4">{mypost.length}</p>
              <p>Posts</p>
            </div>
            <div className="border-end border-3 px-sm-4 px-4 text-center fw-bold">
              <p className="fs-4">20</p>
              <p>Followers</p>
            </div>
            <div className="ms-lg-4 ms-md-3 ms-3 text-center fw-bold">
              <p className="fs-4 ">20</p>
              <p>following</p>
            </div>
          </div>
          <div>
            <button className="custom-buttons shadow mb-3 ms-4">
              <span className="text-muted">Edit Profile</span>
            </button>
            <button className="custom-buttons ms-3 shadow mb-3">
              <span className="text-muted" onClick={handlePostShow}>
                Upload Post
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-12">
          <hr></hr>
        </div>
      </div>
      <div className="row my-2">
        {mypost.map((items) => {
          return (
            <div className="col-md-4 col-sm-12 mt-md-0 my-4">
              <div className="card" onClick={handleShow} key={items._id}>
                <img
                  src={items.image}
                  className="card-img-top"
                  alt={items.description}
                  height="350px"
                  onClick={() => setDetails(items)}
                  // items is an object (don't get cofused)
                />
              </div>
            </div>
          );
        })}
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 p-1">
              <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={details.image}
                      className="d-block w-100"
                      alt="image"
                      height="250px"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={details.image}
                      className="d-block w-100"
                      alt="image"
                      height="250px"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={details.image}
                      className="d-block w-100"
                      alt="image"
                      height="250px"
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div className="col-md-6 mt-sm-0 mt-3">
              <div className="shadow-sm">
                <div className="row">
                  <div className="col-6 d-flex">
                    <img
                      src={user.Image}
                      alt="profile-pic"
                      className="profile-pic"
                      p-2
                    ></img>

                    <div className="d-flex flex-column align-items-center ms-3">
                      <h5>{}</h5>
                      <p>{details.location} </p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div class="btn-group dropstart float-end">
                      <span data-bs-toggle="dropdown">
                        <BsThreeDots className="fs-5" />
                      </span>
                      <ul class="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            <FaEdit /> Edit Post
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={() => deletepost(details._id)}
                          >
                            <MdDelete /> Delete Post
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <small className="text-muted">Active 2 hours ago</small>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-12">
                    <p>{details.description}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 px-2">
                    <span>
                      <FaRegHeart className="fs-4 mx-1" />
                    </span>
                    <span>
                      <FaCommentDots className="fs-4 mx-1" />
                    </span>
                    <span>
                      <BiSolidNavigation className="fs-4   mx-1" />
                    </span>
                  </div>
                  <div className="col-12 mt-2">
                    <p className=" fw-bold">Likes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showPost} onHide={handlePostClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Upload Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <div className="uploadImagebox parent">
                <div className="child">
                  {uploadicon && <FaUpload className="upload-icon" />}
                  <input
                    type="file"
                    id="customize"
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={handleImagePreview} // this event will be fired when the user will select any file
                    onClick={icontoggler}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="image"
                      height="250px"
                      width="280px"
                      className="ms-2"
                    />
                  )}

                  {uploadicon && (
                    <p className="py-1 my-1 fw-bold fs-3 text-center">
                      Upload File
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 mt-lg-0 mt-sm-3 mt-3 d-flex flex-column justify-content-between">
              <div>
                <div className="form-floating mb-3 ">
                  <textarea
                    className="form-control"
                    id="caption"
                    onChange={(event) => setdescription(event.target.value)}
                  ></textarea>
                  <label for="caption">Add Caption</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="location"
                    onChange={(event) => setlocation(event.target.value)}
                  />
                  <label for="location">
                    <MdLocationPin /> Location
                  </label>
                </div>
              </div>
              <div className="mt-sm-0 mt-3">
                <button
                  className=" btn btn-danger w-25 float-end"
                  onClick={handlePost}
                >
                  post
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Profile;
