import React, { useState } from "react";
import "./card.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import API_BASE_URL from "../constant";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Card = (props) => {
  const user = useSelector((state) => state.userReducer.user);

  console.log(props.postdata.author._id === user._id);

  const [commentBox, setCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const likepost = async () => {
    try {
      const requestbody = { postId: props.postdata._id };
      const response = await axios.put(`${API_BASE_URL}like`, requestbody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      debugger;
      if (response.status === 201) {
        props.getallpost();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.error,
      });
    }
  };

  const dislikepost = async () => {
    try {
      const requestbody = { postId: props.postdata._id };
      const response = await axios.put(`${API_BASE_URL}dislike`, requestbody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      debugger;
      if (response.status === 201) {
        props.getallpost();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.error,
      });
    }
  };

  const addComment = async () => {
    if (!comment) {
      return Swal.fire({
        icon: "error",
        title: "please enter a comment",
      });
    }
    const requestbody = {
      commentText: comment,
      postId: props.postdata._id,
    };
    try {
      const response = await axios.put(`${API_BASE_URL}comment`, requestbody, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.status === 201) {
        setCommentBox(false);
        Swal.fire({
          icon: "success",
          title: response.data.message,
        });
        props.getallpost();
      }
    } catch (error) {
      console.log(error);
      setCommentBox(false);
    }
  };

  const showCommentBox = () => {
    setCommentBox(true);
  };

  return (
    <div className="card shadow-sm" style={{ marginTop: "9rem" }}>
      <div className="card-body px-2">
        <div className="row">
          <div className="col-6 d-flex">
            <img
              src="https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="profile-pic"
              className="profile-pic"
              p-2
            ></img>
            <div className="d-flex flex-column align-items-center ms-2">
              <Link to={`/userprofile/${props.postdata.author._id}`}>
                <h5>{props.postdata.author.Fullname}</h5>
              </Link>
              <p>{props.postdata.location}</p>
            </div>
          </div>
          <div className="col-6">
            {props.postdata.author._id === user._id && (
              <span className="float-end info">
                <BsThreeDotsVertical
                  className="fs-2"
                  onClick={() => props.deletePost(props.postdata._id)}
                />
              </span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <img
              className="img-fluid custom-size"
              src={props.postdata.image}
              alt="post-photo"
              style={{ borderRadius: "15px" }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6 mt-2 p-2">
            {props.postdata.author._id !== user._id && (
              <>
                <span>
                  <FaRegThumbsUp className="fs-4 mx-1" onClick={likepost} />
                </span>
                <span>
                  <FaRegThumbsDown
                    className="fs-4 mx-1"
                    onClick={dislikepost}
                  />
                </span>
              </>
            )}

            <span>
              <FaCommentDots className="fs-4 mx-1" onClick={showCommentBox} />
            </span>

            {commentBox && (
              <div className="row mt-2">
                <div className="col-8">
                  <textarea
                    className="form-control"
                    onChange={(event) => setComment(event.target.value)}
                  ></textarea>
                </div>
                <div className="col-4">
                  <button
                    className="btn btn-primary rounded-5"
                    onClick={addComment}
                    // onClick={() => setCommentBox(false)}
                    // ye wala onclick function wahi kaam kar raha hai ho ye fn kar raha hai onClick={showCommentBox}, bas likhne ka tarika alag hai
                  >
                    comment
                  </button>
                </div>
              </div>
            )}
            <div className="row">
              {props.postdata.comments.map((items) => {
                return (
                  <div className="col-12" key={items._id}>
                    <p>
                      {items.commentText} @ {items.commentedBy.Fullname}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-6">
            <h5 className=" float-end fw-bold  mt-2 p-2">
              {props.postdata.likes.length} Likes
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
