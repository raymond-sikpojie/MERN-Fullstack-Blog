import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  // const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const registerUser = async () => {
    // Register new user
    const user = { email, firstName, lastName, password };
    if (!email || !firstName || !lastName || !password) {
      return alert("All fields are required");
    }
    const response = await fetch("/user/register", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const responseData = await response.json();
    if (response.status === 200) {
      history.push("/login");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    registerUser();

    // clear form fields
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };

  return (
    <div className="register">
      <div className="main">
        <p className="sign" align="center">
          Sign up
        </p>
        <form className="form1" onSubmit={onSubmit}>
          <input
            className="firstname"
            type="text"
            align="center"
            placeholder="First name"
            name="firstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            className="lastname"
            type="text"
            align="center"
            placeholder="Last name"
            name="firstName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

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
            Register
          </a>
          <p className="cta" align="center">
            <Link to="/login">Already have an account? Sign In</Link>
          </p>
          <p className="msg">(E-mail will not be verified)</p>
        </form>
      </div>
    </div>
  );
}
