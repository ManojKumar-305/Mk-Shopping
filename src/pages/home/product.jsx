import axios from 'axios';
import { useState } from 'react';
import { StarRating } from '../../components/star-rating';
import { formatMoney } from '../../utils/money';
import CheckmarkIcon from '../../assets/images/icons/checkmark.png';
import { API_BASE_URL } from '../../utils/api';

export function Product({ product, loadCart }) {
  
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) return null;

  const addToCart = async () => {
    try {
      setIsAdding(true);

      await axios.post(`${API_BASE_URL}/api/cart-items`, {
        productId: product.id,
        quantity
      });

      if (typeof loadCart === 'function') {
        await loadCart();
      }

      setShowAddedMessage(true);
      setTimeout(() => setShowAddedMessage(false), 2000);

    } catch (error) {
      console.error('Add to cart failed:', error);
      alert('Failed to add product to cart');
    } finally {
      // ✅ THIS FIXES THE RED UNDERLINE
      setIsAdding(false);
    }
  };

  return (
    <div className="product-container" data-testid="product-container">

      <div className="product-image-container">
        <img
          className="product-image"
          data-testid="product-image"
          src={`${API_BASE_URL}/${product.image}`}
          alt={product.name}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">
        {product.name}
      </div>

      <div className="product-rating-container">
        <StarRating
          rating={(product.rating?.stars ?? 0) * 10}
          size={18}
        />
        <div className="product-rating-count link-primary">
          {product.rating?.count ?? 0}
        </div>
      </div>

      <div className="product-price">
        {formatMoney(product.priceCents)}
      </div>

      <div className="product-quantity-container">
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          data-testid="product-quantity-selector"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="product-spacer"></div>

      <div
        className="added-to-cart"
        style={{ opacity: showAddedMessage ? 1 : 0 }}
      >
        <img src={CheckmarkIcon} alt="Added" />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        data-testid="add-to-cart-button"
        onClick={addToCart}
        disabled={isAdding}
      >
        {isAdding ? 'Adding…' : 'Add to Cart'}
      </button>

    </div>
  );
}
