"use client"; // Enable client-side functionality

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For navigating to the order page
import { AiOutlineLeft } from "react-icons/ai"; // Import the left arrow icon
import "../styles/Cart.css";
import Image from "next/image";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const calculatedTotal = storedCart.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
      0
    );
    setTotal(calculatedTotal);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const newTotal = updatedCart.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
      0
    );
    setTotal(newTotal);
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = [...cart];

    if (newQuantity <= 0) {
      // Remove the item if the quantity is 0 or less
      handleRemoveItem(index);
    } else {
      updatedCart[index].quantity = newQuantity;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      const newTotal = updatedCart.reduce(
        (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
        0
      );
      setTotal(newTotal);
    }
  };

  const handleProceedToOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const cartData = JSON.stringify(cart);
    router.push(`/order?cart=${encodeURIComponent(cartData)}&total=${total}`);
  };

  return (
    <div className="cart">
      <div className="card">
        <div className="row">
          <div className="col-md-8 cart">
            <div className="title">
              <div className="row">
                <div className="col">
                  <h4>
                    <b>Shopping Cart</b>
                  </h4>
                </div>
                <div className="col align-self-center text-right text-muted">
                  {cart.length} items
                </div>
              </div>
            </div>

            {/* Cart items */}
            {cart.map((item, index) => (
              <div className="row border-top border-bottom" key={index}>
                <div className="row main align-items-center">
                  <div className="col-2">
                    <Image
                      className="img-fluid"
                      src={item.imageUrl}
                      alt={item.name}
                      width={500} // Set the desired width
                      height={500}
                    />
                  </div>
                  <br />
                  <div className="col">
                    <div className="row text-muted">{item.category}</div>
                    <br />
                    <div className="row">{item.name}</div>
                    <br />
                  </div>
                  <div className="col">
                    <a
                      href="#"
                      onClick={() =>
                        handleQuantityChange(
                          index,
                          Math.max(item.quantity - 1, 0) // Prevent going below 0
                        )
                      }
                    >
                      -
                    </a>
                    <a href="#" className="border">
                      {item.quantity}
                    </a>
                    <a
                      href="#"
                      onClick={() =>
                        handleQuantityChange(index, item.quantity + 1)
                      }
                    >
                      +
                    </a>
                  </div>
                  <div className="col">
                    ${Number(item.price).toFixed(2)}{" "}
                    <span
                      className="close"
                      onClick={() => handleRemoveItem(index)}
                    >
                      &#10005;
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="back-to-shop">
              <a
                href="#"
                onClick={() => router.back()}
                style={{ display: "flex", alignItems: "center" }}
              >
                <AiOutlineLeft size={20} style={{ marginRight: "5px" }} />
                Back to shop
              </a>
            </div>
          </div>
          <div className="col-md-4 summary">
            <div>
              <h5>
                <b>Summary</b>
              </h5>
            </div>
            <hr />
            <div
              className="row"
              style={{
                borderTop: "1px solid rgba(0,0,0,.1)",
                padding: "2vh 0",
              }}
            >
              <div className="col">TOTAL PRICE</div>
              <div className="col text-right">${total.toFixed(2)}</div>
            </div>
            <button className="btn" onClick={handleProceedToOrder}>
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
