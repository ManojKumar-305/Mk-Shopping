import { useState } from 'react';
import { StarRating } from '../../components/StarRating';
import { Button } from '../../components/ui/Button';
import { formatMoney } from '../../utils/money';
import CheckmarkIcon from '../../assets/images/icons/checkmark.png';
import { API_BASE_URL } from '../../utils/api';
import { useCartContext } from '../../context/CartContext';

export function Product({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCartContext();

  if (!product) return null;

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      await addToCart(product.id, quantity);
      setShowAddedMessage(true);
      setTimeout(() => setShowAddedMessage(false), 2000);
    } catch (error) {
      console.error('Add to cart failed:', error);
      alert('Failed to add product to cart');
    } finally {
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
          loading="lazy"
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

      <Button
        className="add-to-cart-button"
        data-testid="add-to-cart-button"
        variant="primary"
        size="md"
        onClick={handleAddToCart}
        disabled={isAdding}
      >
        {isAdding ? 'Adding…' : 'Add to Cart'}
      </Button>

    </div>
  );
}
