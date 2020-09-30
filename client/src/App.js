import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostItem from "./components/PostItem/PostItem";
import Home from "./components/Home/Home";
import Posts from "./components/Posts/Posts";
import PostForm from "./components/PostForm/PostForm";
import PostContext from "./context/Context";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserPosts from "./components/UserPosts/UserPosts";
import Loader from "./components/Loader/Loader";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";
import "./App.css";

export default function App() {
  // user
  const [userData, setUserData] = useState({
    token: "",
    user: "",
  });

  // one post
  const [postItem, setPostItem] = useState({});

  // one photo
  const [postPhoto, setPostPhoto] = useState(null);

  // Trigger change in when user logs in
  const [loggedIn, setLoggedIn] = useState(false); // Used in the navbar component

  return (
    <div className="app-main">
      <Router>
        <PostContext.Provider
          value={{
            userData,
            setUserData,
            // posts,
            postItem,
            setPostItem,
            postPhoto,
            setPostPhoto,
            loggedIn,
            setLoggedIn,
          }}
        >
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/loader" component={Loader} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/posts/open" component={PostItem} />
            <PrivateRoute exact path="/posts" component={Posts} />
            <PrivateRoute path="/posts/new" component={PostForm} />
            <PrivateRoute path="/user/post" component={UserPosts} />
            <Route path="*" component={NotFound} />
          </Switch>
        </PostContext.Provider>
      </Router>
      <Footer />
    </div>
  );
}
