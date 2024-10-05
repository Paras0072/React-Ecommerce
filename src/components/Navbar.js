import React from "react";
import { useNavigate } from "react-router-dom"; // for navigating 
import { useSelector } from "react-redux";
const NavBar = () => {
  const navigate = useNavigate();
  const navigateHandle = (path) => {
    navigate(path);
  };
  
  // Access the cart items from Redux store
  const cart = useSelector((state) => state.cart);

  // Calculate the total number of items in the cart
  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <ul>
          <li style={{ fontWeight: "600", fontSize: 21 }}>eCommerce</li>
          <li
            onClick={() => {
              navigateHandle("/"); // for navigating to all products page
            }}
          >
            Products
          </li>
          <li
            onClick={() => {
              navigateHandle("/cart"); // for navigating to cart
            }}
          >
            Cart ({cartCount})
          </li>
          <li
            onClick={() => {
              navigateHandle("/create"); // for navigating to the form for adding product
            }}
          >
            Add a Product +
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <span>Hii, John Doe</span>
        <img src="https://picsum.photos/200" alt="Profile" />
      </div>
    </nav>
  );
};

export default NavBar;








