import React from "react";
import Heading from "../components/Heading"; 
import "../styles/style.css";

export default function Vision() {
  return (
    <section id="vision" className="py-5 vision-section">
      <div className="container text-center">
        <Heading title="Our Vision" />
        
        <div className="vision-content mx-auto mt-4 p-4">
          <p className="vision-text">
            At <strong>GSG School</strong>, our vision is to empower every student
            with the knowledge, creativity, and confidence to become compassionate
            leaders of tomorrow. We aim to nurture excellence through quality
            education, character development, and a lifelong passion for learning.
          </p>
        </div>
      </div>
    </section>
  );
}
