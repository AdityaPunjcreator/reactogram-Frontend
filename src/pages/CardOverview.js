import React, { useState, useEffect } from "react";
import Card from "../component/card";
import axios from "axios";
import Swal from "sweetalert2";
import API_BASE_URL from "../constant";

const CardOverview = () => {
  const [post, setPost] = useState([]);

  const getallpost = async () => {
    const response = await axios.get(`${API_BASE_URL}allposts`);
    debugger;
    console.log(response);
    if (response.status === 200) {
      setPost(response.data.allposts);
    }
  };

  const deletePost = async (postId) => {
    const response = await axios.delete(`${API_BASE_URL}delete/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    });
    if (response.status === 200) {
      getallpost();
      Swal.fire({
        icon: "success",
        title: response.data.message,
      });
    }
  };

  useEffect(() => {
    getallpost();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row mx-1">
        {/* "Each child in a list should have a unique 'key' prop" warning, you should provide a unique key to each child element inside the map function. In your case, the Card component is the child element, and you should add the key prop to it. */}
        {post.map((items) => {
          return (
            <div className="col-md-4" key={items._id}>
              {/* here we are passing the fucntion as props, we simply need to write the name of the function and not all it -- eg- deletePost() - this is wrong , only write - deletePost   */}
              <Card
                postdata={items}
                deletePost={deletePost}
                getallpost={getallpost}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardOverview;
