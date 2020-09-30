import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Posts from "../Posts/Posts";
import "./home.css";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    Aos.init({ duration: 1000, easing: "ease-in-quad", once: true });
  }, []);
  return (
    <React.Fragment>
      <div className="hero">
        <div className="hero-div">
          <div className="logo-div">
            {/* <div className="logo">Logo Here</div> */}
            <Link to="/login">Sign In</Link>
          </div>
          <div className="hero-container" data-aos="fade-down">
            <div className="description">
              <h1 className="hero-title">Daily Journal</h1>
              <p>
                Document your wildest thoughts. Write about things you love.
                Talk about those cool stuff that you are most passionate about.
                Share your ideas with the world. Ramble on about your exciting,
                new ideas.
              </p>
              <Link to="/login">Get Started</Link>
            </div>
            <div className="image floating" data-aos="fade-left">
              <img
                src="https://res.cloudinary.com/ds57wvvno/image/upload/v1600891158/hero_ghs3pe.svg"
                alt="hero-img"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="posts">
        <div>
          <Posts />
        </div>
      </div>
    </React.Fragment>
  );
}
