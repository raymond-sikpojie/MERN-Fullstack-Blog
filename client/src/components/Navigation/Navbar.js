import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import UserContext from "../../context/Context";
import "./navbar.css";

export default function Navbar() {
  const history = useHistory();

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

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
    history.push("/");
  };

  return (
    <React.Fragment>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div>

      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          <div className="nav-links">
            {loggedIn === true || token ? (
              <div>
                <ul>
                  <li className="nav-text">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="nav-text">
                    <Link to="/posts/new">New Post</Link>
                  </li>
                  <li className="nav-text">
                    <Link to="/user/post">Manage My Posts</Link>
                  </li>
                  <li className="nav-text">
                    <Link to="/" onClick={handleLogout}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="menu-noToken">
                <li className="nav-text">
                  <Link to="/">Home</Link>
                </li>
                <li className="nav-text">
                  <Link to="/login">Login</Link>
                </li>
              </div>
            )}
          </div>
        </ul>
      </nav>
    </React.Fragment>
  );
}
