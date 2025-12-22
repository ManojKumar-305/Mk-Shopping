import { Product } from "./product";

export function ProductsGrid({ products, loadCart })  {
  if (products.length === 0) {
    return (
      <div className="products-empty">
        <h3>No products found</h3>
      </div>
    )
  }
  return (
    <div className="products-grid">
      {products.map((product) => (
        <Product 
        key={product.id} 
        product={product} 
        loadCart={loadCart} 
        />
      ))}
    </div>
  );
}