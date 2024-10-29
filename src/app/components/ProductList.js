import ProductItem from "./ProductItem";

export default function ProductList({ products, onEdit }) {
  return (
    <div>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} onEdit={onEdit} />
      ))}
    </div>
  );
}
