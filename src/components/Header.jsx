import UserMenu from "./UserMenu";
import useAuth from "../hooks/useAuth";
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useCartContext } from '../context/CartContext';
import CartIcon from '../assets/images/icons/cart-icon.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import MobileLogoWhite from '../assets/images/mobile-logo-white.png';
import LogoMk from '../assets/images/icons/mk-tech-store-logo.svg';

import './Header.css';

export function Header() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('search');
  const [search, setSearch] = useState(searchText || '');
  const { cart } = useCartContext();

  const updateSearchInput = (event) => {
    setSearch(event.target.value);
  };

  const searchProducts = () => {
    navigate(`/?search=${search}`);
  };

  let totalQuantity = 0;

  Array.isArray(cart) && cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" src={LogoMk} alt="MK Tech Store" />
          <img className="mobile-logo" src={MobileLogoWhite} alt="Mobile Logo" />
        </NavLink>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search"
          value={search} onChange={updateSearchInput} />

        <button className="search-button"
          onClick={searchProducts}>
          <img className="search-icon" src={SearchIcon} alt="Search" />
        </button>
      </div>

      <div className="right-section">

        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={CartIcon} alt="Cart" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>

        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <NavLink
            className="orders-link header-link"
            to="/login"
          >
            <span className="orders-text">
              Sign In
            </span>
          </NavLink>
        )}

      </div>
    </div>
  );
}
