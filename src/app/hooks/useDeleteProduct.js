import { deleteProduct } from "../Database/firebaseProduct"; // Adjust import based on your structure

export const useDeleteProduct = () => {
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id); // Call the delete function
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  return { handleDeleteProduct };
};
