import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { User, LogOut, Package, ChevronDown } from "lucide-react";
import useAuth from "../hooks/useAuth";

import "./UserMenu.css";

export default function UserMenu() {
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  async function handleLogout() {
    await logout();
    setOpen(false);
  }

  const fullName =
    user?.user_metadata?.full_name ||
    user?.email ||
    "Account";

  return (
    <div className="user-menu" ref={menuRef}>

      <button
        className="user-button"
        onClick={() => setOpen(!open)}
      >
        <User size={18} />

        <span>
          {fullName.split(" ")[0]}
        </span>

        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="user-dropdown">

          <NavLink
            to="/profile"
            className="dropdown-item"
          >
            <User size={16} />
            My Profile
          </NavLink>

          <NavLink
            to="/orders"
            className="dropdown-item"
          >
            <Package size={16} />
            My Orders
          </NavLink>

          <button
            className="dropdown-item logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </button>

        </div>
      )}

    </div>
  );
}