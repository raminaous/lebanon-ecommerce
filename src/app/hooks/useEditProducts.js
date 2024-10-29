import { useState } from "react";
import { editProduct, uploadImage } from "../Database/firebaseProduct"; // Adjust import based on your structure

export const useEditProduct = () => {
  const [uploading, setUploading] = useState(false);

  const handleEditProduct = async (id, updatedProduct, file) => {
    setUploading(true);
    try {
      // If there's a new file, upload the image
      if (file) {
        const imageUrl = await uploadImage(file);
        updatedProduct.imageUrl = imageUrl; // Update the image URL in the product object
      }

      // Check if sizes is an array or string before splitting
      const sizesArray = Array.isArray(updatedProduct.sizes)
        ? updatedProduct.sizes // If it's already an array, use it as is
        : updatedProduct.sizes.split(",").map((size) => size.trim()); // Split string into an array

      await editProduct(id, {
        ...updatedProduct,
        sizes: sizesArray, // Assign the sizes array
      });

      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error editing product:", error);
      alert("Failed to update product.");
    } finally {
      setUploading(false);
    }
  };

  return { handleEditProduct, uploading };
};
