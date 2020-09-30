import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import "./postitem.css";
import { useHistory } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

export default function PostItem() {
  const history = useHistory();
  // const [loading, setLoading] = useState(true);
  // const { postPhoto } = useContext(PostContext);
  const postPhoto = localStorage.getItem("postPhoto");
  const post = JSON.parse(localStorage.getItem("postItem")); // saved to localStorage from ShowAllPosts component
  const [commentAdded, setCommentAdded] = useState(false);
  const [comment, setComment] = useState("");

  // const { userData } = useContext(PostContext);
  // const user = userData.user;

  // get user from local storage
  const userData = JSON.parse(localStorage.getItem("auth-token"));
  // const { user } = userData;
  const user = userData ? userData.user : "";

  // Create a helper function which displays tags
  const renderTags = (tags) => {
    return tags.map((tag) => {
      return <span key={Math.random() + 1}>{tag}</span>;
    });
  };

  // Create a helper function which displays comments
  const renderComment = (comments) => {
    return comments.map((comment) => {
      if (comment !== []) {
        return (
          <div key={comment.id}>
            <p>
              <b>
                {comment.postedBy.firstName} {comment.postedBy.lastName}
              </b>
              <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
            </p>
            <p className="comment__body">{comment.body}</p>
          </div>
        );
      }
    });
  };

  // Post a comment
  const postComment = async () => {
    const data = { body: comment };
    if (comment === "") {
      return alert("Enter a comment");
    }
    const response = await fetch(`/comment/${post._id}/${user.id}`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response.status);
    if (response.status === 200) {
      const data = await response.json();
      alert(data.msg);
      setCommentAdded(!commentAdded);
    }
  };

  // Get the number of comments
  const numberOfComments = () => {
    return <h3>Comments {post.comment.length}</h3>;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      history.push("/login");
    }
    postComment();
    setComment("");
  };

  useEffect(() => {
    renderComment(post.comment);
    numberOfComments();
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000, easing: "ease-in-quad", once: true });
  }, []);

  return (
    <React.Fragment>
      {!post ? (
        <Loader />
      ) : (
        <div className="post__item" data-aos="fade-up">
          <h2 className="title">{post.title}</h2>
          <p className="author">{`By ${post.postedBy.firstName} ${post.postedBy.lastName}`}</p>
          <p className="date">{`Posted on ${new Date(
            post.createdAt
          ).toLocaleDateString()}`}</p>
          {postPhoto !== null ? (
            <img src={postPhoto} alt="post" width="500" height="500" />
          ) : (
            // <img
            //   src="https://res.cloudinary.com/ds57wvvno/image/upload/v1584789093/phonelady_lrttvw.jpg"
            //   alt="post photo"
            // />
            <div></div>
          )}
          <p className="body">{post.body}</p>

          <em>
            <div className="tags">tags: {renderTags(post.tags)}</div>
          </em>

          <div className="comments">
            {post.comment.length > 0 ? (
              <div>
                {/* <h3>Comments {post.comment.length}</h3> */}
                {numberOfComments()}
                <div className="comment__content">
                  {renderComment(post.comment)}
                </div>
              </div>
            ) : (
              // <div>{renderComment(post.comment)}</div>
              <h3>{post.comment.length} Comment</h3>
            )}

            {/* <AddComment /> */}

            <div className="addComment-main">
              <form onSubmit={onSubmit}>
                <input
                  className="textarea"
                  type="textarea"
                  name="comment"
                  placeholder="Enter comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <input
                  className="post-comment"
                  type="submit"
                  value="Post Comment"
                />
              </form>
            </div>
          </div>
        </div>
      )}
      {/* <Footer /> */}
    </React.Fragment>
  );
}
