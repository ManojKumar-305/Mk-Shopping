import { Link } from "react-router-dom";
import CheckoutLockIcon from "../assets/images/icons/checkout-lock-icon.png";
import Logo from "../assets/images/logo.png";
import MobileLogo from "../assets/images/mobile-logo.png";
import './CheckoutHeader.css';

export function CheckoutHeader({ cart = [] }) {
  let totalQuantity = 0;
  cart.forEach(item => {
    if (item && typeof item.quantity === 'number') {
      totalQuantity += item.quantity;
    }
  });

  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/">
            <img className="logo" src={Logo} alt="Logo" />
            <img className="mobile-logo" src={MobileLogo} alt="Mobile Logo" />
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (
          <Link className="return-to-home-link" to="/">
            {totalQuantity} items
          </Link>
          )
        </div>

        <div className="checkout-header-right-section">
          <img src={CheckoutLockIcon} alt="Secure checkout" />
        </div>
      </div>
    </div>
  );
}
