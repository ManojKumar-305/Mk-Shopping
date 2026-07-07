import { useState, useEffect } from 'react';
import { formatMoney } from '../../utils/money';
import { useCartContext } from '../../context/CartContext';

export function CartItemDetails({ cartItem }) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const { updateItem, removeItem } = useCartContext();

  useEffect(() => {
    setQuantity(cartItem.quantity);
  }, [cartItem.quantity]);

  const deleteCartItem = async () => {
    await removeItem(cartItem.productId);
  };

  const updateQuantity = async () => {
    if (!isUpdatingQuantity) {
      setIsUpdatingQuantity(true);
      return;
    }

    const quantityNumber = Number(quantity);
    if (quantityNumber < 1 || isNaN(quantityNumber)) return;

    await updateItem(cartItem.productId, { quantity: quantityNumber });
    setIsUpdatingQuantity(false);
  };

  const handleQuantityKeyDown = (event) => {
    if (event.key === 'Enter') {
      updateQuantity();
    } else if (event.key === 'Escape') {
      setQuantity(cartItem.quantity);
      setIsUpdatingQuantity(false);
    }
  };

  return (
    <>
      <img
        className="product-image"
        src={cartItem.product.image}
        alt={cartItem.product.name}
      />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>

        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>

        <div className="product-quantity">
          <span>
            Quantity:{' '}
            {isUpdatingQuantity ? (
              <input
                type="text"
                className="quantity-textbox"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                onKeyDown={handleQuantityKeyDown}
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>

          <span
            className="update-quantity-link link-primary"
            onClick={updateQuantity}
          >
            Update
          </span>

          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
