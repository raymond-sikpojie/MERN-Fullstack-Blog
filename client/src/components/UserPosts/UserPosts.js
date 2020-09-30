import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/Context";
import Loader from "../Loader/Loader";
// import "./userposts.css";
import Aos from "aos";
import "aos/dist/aos.css";

export default function UserPosts() {
  const [loading, setLoading] = useState("");
  const [completeUserData, setCompleteUserData] = useState("");
  const [postDeleted, setPostDeleted] = useState(false);
  const { setPostPhoto } = useContext(UserContext);
  // const { user, token } = userData;

  // get user from local storage
  const userData = JSON.parse(localStorage.getItem("auth-token"));
  const { user, token } = userData;

  const history = useHistory();

  // Get user's posts by finding the user and getting it's "posts" value.
  // Add token to the authorization header.
  const getUserPost = async () => {
    setLoading(true);
    const response = await fetch(`/user/${user.id}`, {
      headers: {
        "x-auth-token": token,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      setCompleteUserData(data);
      setLoading(false);
    }
  };

  // FETCH POST PHOTO using post id
  const getPhoto = async (postId) => {
    const response = await fetch(`/posts/photo/${postId}`);
    if (response.status === 200) {
      const responseData = await response;

      // Sets the postPhoto to the url of responseData
      setPostPhoto(responseData.url);
      // localStorage.setItem("postPhoto", responseData.url);
    }
  };

  // Get one post
  const getOnePost = async (postId) => {
    setLoading(true);
    const response = await fetch(`/posts/${postId}`);
    const data = await response.json();

    if (response.status === 200) {
      setLoading(false);
      // Save data to local storage to ensure data persistence
      localStorage.removeItem("postItem"); // removes previously stored items
      localStorage.setItem("postItem", JSON.stringify(data));
      history.push("/posts/open");

      // call function to fetch photo
      getPhoto(postId);
    }
  };

  // Delete post by getting the user id and the post id
  const deletePost = async (postId) => {
    setLoading(true);
    const response = await fetch(`/posts/${postId}/${user.id}`, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      setPostDeleted(!postDeleted);
      setLoading(false);
      alert(data.msg);
    }
  };

  // When the user's data changes, re-run function
  useEffect(() => {
    getUserPost();
  }, [postDeleted]);

  useEffect(() => {
    Aos.init({ duration: 1000, easing: "ease-in-quad", once: true });
  }, []);

  function showUserPost() {
    return (
      <div>
        {completeUserData !== "" && completeUserData.posts.length > 0 ? (
          completeUserData.posts.map((post) => {
            return (
              <div className="show__allposts" key={post._id} data-aos="fade-up">
                <div className="container">
                  <div className="content-container">
                    <div className="content">
                      <div>
                        <h3>{post.title}</h3>
                        <p>{`${post.body.substring(0, 108)}...`}</p>
                        <p>{`Posted by ${post.postedBy.firstName} ${post.postedBy.lastName}`}</p>
                      </div>

                      {/* At the click of the button, fetch or delete that particular post */}
                      <div className="links">
                        <a
                          href="#"
                          className="read"
                          onClick={() => getOnePost(post._id)}
                        >
                          Open
                        </a>
                        <a
                          href="#"
                          className="delete"
                          onClick={() => deletePost(post._id)}
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No Posts</p>
        )}
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="userposts__main">
        {loading ? (
          <Loader />
        ) : (
          <div>
            <h2 className="title">Your Posts</h2>
            <div>{showUserPost()}</div>
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </React.Fragment>
  );
}
