import React, { useState } from "react";
import { FaBasketShopping } from "react-icons/fa6";
import classes from "./Navbar.module.css";
import ModalCart from "../cart/ModalCart";

const Navbar = ({ setView, cart }) => {
  const [modalOpenCart, setModalOpenCart ] = useState(false)
  const handleViewChange = (newView) => {
    setView(newView);
  }
  const openCart = () => {
    setModalOpenCart(true)
  }

  return (
    <nav className={classes.navbar}>
      <div>
        <h1>The Wacky Coffee Shop</h1>
        <p>{cart.length}</p>
        <FaBasketShopping size={30} className={classes.cartIcon} onClick={openCart}  />
      {modalOpenCart && <ModalCart setModalOpenCart={setModalOpenCart} cart={cart}/> }
      </div>
      <div>
        <ul className={classes.bigUl}>
          <li onClick={() => handleViewChange("products")}>Hem</li>
          <li onClick={() => handleViewChange("lightRoast")}>Ljusrost</li>
          <li onClick={() => handleViewChange("mediumRoast")}>Mellanrost</li>
          <li onClick={() => handleViewChange("darkRoast")}>Mörkrost</li>
          <li onClick={() => handleViewChange("extraDarkRoast")}>Extra Mörkrost</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
