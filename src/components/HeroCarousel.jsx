import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import slide1 from "../assets/images/carousalImage1.jpg";
import slide2 from "../assets/images/carousalImage2.jpg";
import slide3 from "../assets/images/carousalImage3.jpg";

import "../styles/style.css";

export default function HeroCarousel() {
  return (
    <section id="home" className="hero-section p-0 m-0">
      <Carousel fade interval={4000} pause={false} className="hero-carousel">
        <Carousel.Item>
          <img src={slide1} alt="Students" className="hero-img" />
          <Carousel.Caption>
            <div className="hero-overlay text-white">
              <h2>Welcome to Government School for Girls</h2>
              <p>Empowering the next generation with education and excellence.</p>
              <a href="#student-admission" className="hero-btn">Apply Now</a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img src={slide2} alt="Quality Education" className="hero-img" />
          <Carousel.Caption>
            <div className="hero-overlay text-white">
              <h2>Quality Education</h2>
              <p>Nurturing confidence, discipline, and lifelong learning for every girl.</p>
              <a href="#faculty-section" className="hero-btn">Meet Our Teachers</a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img src={slide3} alt="Bright Future" className="hero-img" />
          <Carousel.Caption>
            <div className="hero-overlay text-white">
              <h2>Bright Future Begins Here</h2>
              <p>Join a community that inspires growth, creativity, and confidence.</p>
              <a href="#contact" className="hero-btn">Contact Us</a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
}
