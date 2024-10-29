"use client"; // Make sure this is added at the top

import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore"; // Import Firestore functions
import { db } from "../Database/Config"; // Adjust path as needed
import ProductForm from "../components/ProductForm"; // Adjust path as needed
import ProductList from "../components/ProductList"; // Adjust path as needed
import { useAddProduct } from "../hooks/useAddProduct"; // Adjust path as needed
import { useEditProduct } from "../hooks/useEditProducts"; // Adjust path as needed
import Link from "next/link"; // Import Next.js Link
import { useRouter } from "next/navigation"; // Import useRouter

export default function Admin() {
  const [products, setProducts] = useState([]); // State for holding products
  const [editingProduct, setEditingProduct] = useState(null); // State for tracking product being edited
  const { handleAddProduct, uploading } = useAddProduct(); // Use add product hook
  const { handleEditProduct } = useEditProduct(); // Use edit product hook
  const router = useRouter(); // Initialize the router

  // Function to fetch products from Firestore
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productsData); // Update state with fetched products
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form submission for adding or editing a product
  const handleSubmit = async (product, file) => {
    if (editingProduct) {
      await handleEditProduct(editingProduct.id, product, file);
      setEditingProduct(null); // Reset editing state
    } else {
      await handleAddProduct(product, file);
    }
    fetchProducts(); // Refresh product list after submission
  };

  // Handle clicking edit button to set the product for editing
  const handleEdit = (product) => {
    setEditingProduct(product); // Set product to be edited
  };

  return (
    <div>
      <h1>Product Management</h1>
      {/* Back to Home Button */}
      <button
        onClick={() => router.push("/")} // Adjust the path as needed
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Back to Home
      </button>
      <Link href="/orderlist">
        <button
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          View Order List
        </button>
      </Link>
      <ProductForm onSubmit={handleSubmit} initialData={editingProduct} />
      {uploading && <p>Uploading product...</p>} {/* Display upload message */}
      <h1>Products </h1>
      <ProductList products={products} onEdit={handleEdit} />{" "}
      {/* Render product list */}
    </div>
  );
}
