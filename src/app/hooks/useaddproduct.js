// hooks/useAddProduct.js

import { useState } from "react";
import { addProduct, uploadImage } from "../Database/firebaseProduct";

export const useAddProduct = () => {
  const [uploading, setUploading] = useState(false);

  const handleAddProduct = async (product, file) => {
    setUploading(true);
    try {
      // Upload the image to Firebase Storage
      const imageUrl = await uploadImage(file);

      // Add the product to Firestore with the image URL
      await addProduct({
        ...product,
        sizes: product.sizes.split(",").map((size) => size.trim()), // Convert sizes to an array
        imageUrl,
      });

      // Optionally show a success message or reset the form state
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    } finally {
      setUploading(false);
    }
  };

  return { handleAddProduct, uploading };
};
