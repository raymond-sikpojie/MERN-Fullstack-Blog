import React, { useContext } from "react";
import UserContext from "../../context/Context";
import "./navbar.css";

export default function Navbar() {
  let { loggedIn, setLoggedIn } = useContext(UserContext);

  // get token from local storage
  let userData =
    localStorage !== null
      ? JSON.parse(localStorage.getItem("auth-token"))
      : null;

  // if userData is null let token be an empty string, otherwise set the token.
  let token = userData ? userData.token : "";

  //   const token = userData.token;

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    // userData = {};
    // history.push("/");
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
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/posts/new">New Post</a>
                  </li>
                  <li>
                    <a href="/user/post">Manage My Posts</a>
                  </li>
                  <li>
                    <a href="/" onClick={handleLogout}>
                      Sign Out
                    </a>
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
