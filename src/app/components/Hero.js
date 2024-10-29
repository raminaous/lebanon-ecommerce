// components/Hero.js
import React from "react";
import Link from "next/link"; // Import Link from next/link
import "../styles/Hero.css";

const Hero = () => {
  return (
    <div name="about-section" className="full-background-container">
      <div className="text-overlay">
        <h1>Lebanon</h1>
        <p>
          A stylish tee featuring the iconic Lebanese cedar, blending heritage
          with modern design. Perfect for casual wear with a cultural twist.
        </p>

        <Link href="/cart">
          <span className="button">Shop now</span> {/* Link to Cart */}
        </Link>
      </div>
      <div className="scrolldown-wrapper">
        <div className="scrolldown">
          <svg height="30" width="10">
            <circle className="scrolldown-p1" cx="5" cy="15" r="2" />
            <circle className="scrolldown-p2" cx="5" cy="15" r="2" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
