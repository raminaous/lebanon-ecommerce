// firebaseProducts.js
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "./Config"; // Import Firestore and Storage instances

// Upload Image
export const uploadImage = async (file) => {
  if (!file) return null;
  const storageRef = ref(storage, `products/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: Progress tracking (snapshot.bytesTransferred / snapshot.totalBytes)
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};

// Add Product with Image URL
export const addProduct = async (product) => {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Edit Product
export const editProduct = async (id, updatedProduct) => {
  const productRef = doc(db, "products", id);
  try {
    await updateDoc(productRef, updatedProduct);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

// Delete Product
export const deleteProduct = async (id) => {
  const productRef = doc(db, "products", id);
  try {
    await deleteDoc(productRef);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};
