"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import { useFetchProducts } from "./hooks/useFetchProduct";

export default function Home() {
  const { products, loading, error } = useFetchProducts();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleAddToCart = (product, selectedSize) => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    const existingItemIndex = cart.findIndex(
      (item) => item.id === product.id && item.selectedSize === selectedSize
    );

    let updatedCart;
    if (existingItemIndex >= 0) {
      const updatedItem = {
        ...cart[existingItemIndex],
        quantity: cart[existingItemIndex].quantity + 1,
      };
      updatedCart = [...cart];
      updatedCart[existingItemIndex] = updatedItem;
    } else {
      const cartItem = {
        ...product,
        selectedSize,
        quantity: 1,
      };
      updatedCart = [...cart, cartItem];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert(`${product.name} (Size: ${selectedSize}) added to cart.`);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <Navbar cartItemCount={cartItemCount} />
      <Hero />
      <Product products={products} onAddToCart={handleAddToCart} />
      <Footer />
    </div>
  );
}
