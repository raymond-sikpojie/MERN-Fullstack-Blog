import React from "react";
import ShowAllPosts from "../ShowAllPosts/ShowAllPosts";
// import "../ShowAllPosts/showallposts.css";
import "./posts.css";

export default function Posts() {
  return (
    <div className="posts-main">
      <div className="posts">
        <ShowAllPosts />
      </div>
    </div>
  );
}
