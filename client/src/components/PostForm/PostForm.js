import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./postform.css";

export default function PostForm() {
  const [loading, setLoading] = useState("");
  // Get user
  // const { userData } = useContext(UserContext);

  // get user from local storage
  const userData = JSON.parse(localStorage.getItem("auth-token"));
  // const { user } = userData;
  const user = userData ? userData.user : "";
  // const user = userData.user;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");

  // for selected photo file
  const [selectedFile, setSelectedFile] = useState();

  const history = useHistory();

  // Run this funtion to update selectedFile state when the user selects a photo
  const selectPhoto = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // send post
  const sendPost = async () => {
    setLoading(true);

    const formData = new FormData(); // A boilerplate function
    formData.append("title", title);
    formData.append("body", body);
    formData.append("tags", tags);
    formData.append("photo", selectedFile, selectedFile.name);

    const response = await fetch(`/posts/${user.id}`, {
      method: "POST",
      credentials: "same-origin",
      body: formData,
    });

    if (response.status === 200) {
      const responseData = await response.json();
      console.log(responseData.msg);
      setLoading(false);
      alert(responseData.msg);
      history.push("/posts");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendPost();
    // clear form fields
    setTitle("");
    setBody("");
    setTags("");
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="form-container">
          <h2 className="addPost__title">Add New Post</h2>
          <form
            id="post"
            className="form"
            onSubmit={onSubmit}
            encType="multipart/form-data"
            method="POST"
            action="/posts/:userId"
          >
            <label htmlFor="title">Title</label>
            <input
              id="post__title"
              type="text"
              name="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="body">Body</label>
            <textarea
              id="post__body"
              name="body"
              value={body}
              required
              onChange={(e) => setBody(e.target.value)}
            ></textarea>

            <label htmlFor="body">Tags</label>
            <input
              id="post__tags"
              type="text"
              name="tags"
              placeholder="separate tags with a comma e.g love, light"
              value={tags}
              required
              onChange={(e) => setTags(e.target.value)}
            />
            <label htmlFor="body">Add Photo</label>
            <input
              id="add__photo"
              type="file"
              name="photo"
              accept="image/*"
              onChange={selectPhoto}
            />

            <input className="send-post" type="submit" value="Send Post" />
          </form>
        </div>
      )}
    </React.Fragment>
  );
}
