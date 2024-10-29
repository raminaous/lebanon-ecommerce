import { useState } from "react";
import "../styles/Product.css";
import Image from "next/image";

const Product = ({ products, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState({});

  const handleSizeChange = (productId, size) => {
    setSelectedSize((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <div className="product-section">
      <h2 className="product-title">Products</h2>
      <div className="product-row">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Image
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
              width={500} // Set the desired width
              height={500}
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-price">{`Price: $${product.price}`}</div>

            <select
              value={selectedSize[product.id] || ""}
              onChange={(e) => handleSizeChange(product.id, e.target.value)}
              className="size-select"
              required
            >
              <option value="">Select a size</option>
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <button
              onClick={() => onAddToCart(product, selectedSize[product.id])}
              className="add-button"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
