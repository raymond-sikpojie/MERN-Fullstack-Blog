import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/Context";
import "./navbar.css";

export default function Navbar() {
  const history = useHistory();

  let { loggedIn, setLoggedIn } = useContext(UserContext);

  // get token from local storage
  let userData =
    localStorage !== null
      ? JSON.parse(localStorage.getItem("auth-token"))
      : null;

  // if userData is null let token be an empty string, otherwise set the token.
  let token = userData ? userData.token : "";

  //   const token = userData.token;

  // Navigate to home page
  const navigateToHomePage = () => {
    history.push("/");
    // window.location.reload(false);
  };

  // Navigate to new post
  const navigateToNewPost = () => {
    history.push("/posts/new");
  };

  // Navigate to user post
  const navigateToUserPost = () => {
    history.push("/user/post");
  };

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    // userData = {};
    history.push("/");
  };

  return (
    <div className="nav-main">
      <div className="menu-wrap">
        <input type="checkbox" class="toggler" />
        <div className="hamburger">
          <div></div>
        </div>
        <div className="menu">
          <div>
            {loggedIn === true || token ? (
              <div>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/posts/new">New Post</Link>
                  </li>
                  <li>
                    <Link to="/user/post">Manage My Posts</Link>
                  </li>
                  <li>
                    <Link to="#" onClick={handleLogout}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="menu-noToken">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/login">Login</a>
                </li>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
