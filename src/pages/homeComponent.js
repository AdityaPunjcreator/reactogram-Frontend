import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../constant";

const Home = () => {
  const [image, setImage] = useState("");
  const [imagepreview, setImagepreview] = useState("");

  const handlePost = async () => {
    try {
      const formdata = new FormData();
      formdata.append("image", image);
      console.log(formdata);
      const uploadData = await axios.post(`${API_BASE_URL}upload`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(uploadData);
      console.log(uploadData.status);
    } catch (error) {
      console.log(error);
    }
  };

  const handlepreview = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    if (selectedImage) {
      const previewURL = URL.createObjectURL(selectedImage);
      setImagepreview(previewURL);
    } else {
      setImagepreview("");
    }
  };

  return (
    <div style={{ marginTop: "9rem" }}>
      <label for="formFile" className="form-label">
        Default file input example
      </label>
      <input
        className="form-control"
        type="file"
        id="formFile"
        onChange={handlepreview}
      />
      <div className="my-3">
        {imagepreview && (
          <img
            src={imagepreview}
            alt="headSnapshot"
            height="250px"
            width="250px"
          />
        )}
      </div>
      <button onClick={handlePost} className="btn btn-danger">
        Post
      </button>
    </div>
  );
};

export default Home;
