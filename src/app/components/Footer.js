// components/Footer.js

import React from "react";
import { FaInstagram } from "react-icons/fa"; // Import the icon for Instagram
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>Get Help</h4>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/lebhope?igsh=YWFkMTdqODl6MjIx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Customer Service
                </a>
              </li>
              <li>
                <a
                  href="https://itunes.apple.com/us/app/apple-store/id1284243483"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Payment Options iOS
                </a>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=money.whish.android"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Payment Options Android
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Online Shop</h4>
            <ul>
              <li>
                <a href="#">T-shirts</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a
                href="https://www.instagram.com/lebhope?igsh=YWFkMTdqODl6MjIx"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="social-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
