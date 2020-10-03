import React, { useState, useContext } from "react";
import UserContext from "../../context/Context";
import { useHistory, Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  let { setLoggedIn } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  // Login user
  const loginUser = async () => {
    const user = { email, password };

    if (!email || !password) {
      return alert("All fields are required");
    }

    // Login user
    const response = await fetch("/user/login", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const responseData = await response.json();

    if (response.status === 200) {
      // Update userData in the App component
      setUserData({
        token: responseData.token,
        user: responseData.user,
      });
      // set loggedIn to true
      setLoggedIn(true);

      // save token in local storage. Use stringify to convert the object into a string
      localStorage.setItem("auth-token", JSON.stringify(responseData));

      // setTimeout(() => {
      history.push("/posts");
      // }, 2000);
    } else if (response.status === 400) {
      alert(responseData.msg);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser();
    // clear form fields
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login">
      <div className="main">
        <p className="sign" align="center">
          Sign in
        </p>
        <form className="form1" onSubmit={onSubmit}>
          <input
            className="email"
            type="text"
            align="center"
            placeholder="Email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="pass"
            type="password"
            align="center"
            placeholder="Password"
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#" className="submit" align="center" onClick={onSubmit}>
            Sign in
          </a>
          <p className="cta" align="center">
            <Link to="/register">Don't have an account? Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
