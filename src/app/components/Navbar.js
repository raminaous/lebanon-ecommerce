import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "../styles/NavBar.css";

const Navbar = ({ cartItemCount }) => {
  const [color, setColor] = useState(false);

  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return () => window.removeEventListener("scroll", changeColor);
  }, []);

  return (
    <div className={color ? "header header-bg" : "header"}>
      <nav className="navbar">
        <div className="brand-text"></div>
        <Link href="/cart">
          <div className="cart-icon">
            <AiOutlineShoppingCart size={30} style={{ color: "#ffffff" }} />
            {cartItemCount > 0 && (
              <span className="cart-counter">{cartItemCount}</span>
            )}
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
