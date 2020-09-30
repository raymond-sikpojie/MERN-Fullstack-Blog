import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import PostContext from "../../context/Context";
import Loader from "../Loader/Loader";
import "./showallposts.css";
import Aos from "aos";
import "aos/dist/aos.css";

export default function PostList() {
  const { setPostPhoto } = useContext(PostContext);
  const [loading, setLoading] = useState(true);
  // all posts
  const [posts, setPosts] = useState([]);

  const history = useHistory();

  // Get all posts
  const getPosts = async () => {
    try {
      const response = await fetch("/posts");
      const data = await response.json();
      if (response.status === 200) {
        setPosts(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH POST PHOTO using post id
  const getPhoto = async (postId) => {
    const response = await fetch(`/posts/photo/${postId}`);
    if (response.status === 200) {
      const responseData = await response;
      // Sets the postPhoto to the url of responseData
      setPostPhoto(responseData.url);
      localStorage.removeItem("postPhoto");
      localStorage.setItem("postPhoto", responseData.url);
    }
  };

  // Get one post
  const getOnePost = async (postId) => {
    setLoading(true);
    const response = await fetch(`/posts/${postId}`);
    const data = await response.json();

    if (response.status === 200) {
      // Save data to local storage to ensure data persistence
      localStorage.removeItem("postItem"); // removes previously stored items
      localStorage.setItem("postItem", JSON.stringify(data));
      setLoading(false);
      history.push("/posts/open");
      // call function to fetch photo
      getPhoto(postId);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  const showPosts = () => {
    return posts.map((post) => {
      return (
        <div className="show__allposts" data-aos="fade-up">
          <div className="container" key={post._id}>
            {/* <img
                src="https://res.cloudinary.com/ds57wvvno/image/upload/v1584789093/phonelady_lrttvw.jpg"
                alt="post photo"
              /> */}
            <div className="content-container">
              <div className="content">
                <h3>{post.title}</h3>
                <p>{`${post.body.substring(0, 150)}...`}</p>
                <p>{`By ${post.postedBy.firstName} ${post.postedBy.lastName}`}</p>
                {/* At the click of the button, fetch that particular post */}
              </div>

              <a href="#" onClick={() => getOnePost(post._id)}>
                Read more
              </a>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <React.Fragment>
      <div className="showallposts-main">
        <h2>Latest Posts</h2>
        <div>{loading ? <Loader /> : <div>{showPosts()}</div>}</div>
      </div>
      {/* <Footer /> */}
    </React.Fragment>
  );
}
