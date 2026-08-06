import { memo } from 'react';
import { Product } from './Product';

const ProductsGridComponent = function ProductsGrid({ products = [] }) {
  if (!Array.isArray(products)) {
    console.error('ProductsGrid expected array, got:', products);
    return null;
  }

  if (products.length === 0) {
    return (
      <div className="products-empty">
        No products found.
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export const ProductsGrid = memo(ProductsGridComponent);
