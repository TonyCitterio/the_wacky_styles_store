import React, { useState } from "react";
import { FaBasketShopping } from "react-icons/fa6";
import classes from "./Navbar.module.css";
import ModalCart from "../cart/ModalCart";

const Navbar = ({
  view,
  setView,
  cart,
  setCart,
  removeProductFromCart,
  addProductToCart,
  groupedCart,
  calculateTotalPrice,
  shippingCost,
  handelShippingCostText,
  calculateTotalPriceWithShipping,
}) => {
  const [modalOpenCart, setModalOpenCart] = useState(false);
  const isClickable = cart.length >= 1;

  const openCart = () => {
    setModalOpenCart(true);
  };

  return (
    <nav className={classes.navbar}>
      <div>
        <h1 onClick={() => setView("products")}>The Wacky Coffee Shop</h1>
        {view !== "checkout" && view !== "confirmation" ? (
          <div>
            <p>{cart.length}</p>
            <FaBasketShopping
              size={30}
              className={classes.cartIcon}
              onClick={openCart}
            />
            {modalOpenCart && (
              <ModalCart
                setView={setView}
                setModalOpenCart={setModalOpenCart}
                cart={cart}
                setCart={setCart}
                removeProductFromCart={removeProductFromCart}
                addProductToCart={addProductToCart}
                groupedCart={groupedCart}
                calculateTotalPrice={calculateTotalPrice}
                shippingCost={shippingCost}
                handelShippingCostText={handelShippingCostText}
                calculateTotalPriceWithShipping={calculateTotalPriceWithShipping}
              />
            )}
            <button
              onClick={() => setView("checkout")}
              disabled={!isClickable}
              style={{ opacity: isClickable ? 1 : 0.5 }}
            >
              Till kassan
            </button>
          </div>
        ) : null}
      </div>
      {view !== "checkout" && view !== "confirmation" ? (
        <div>
          <ul className={classes.bigUl}>
            <li onClick={() => setView("products")}>Hem</li>
            <li onClick={() => setView("lightRoast")}>Ljusrost</li>
            <li onClick={() => setView("mediumRoast")}>Mellanrost</li>
            <li onClick={() => setView("darkRoast")}>Mörkrost</li>
            <li onClick={() => setView("extraDarkRoast")}>Extra Mörkrost</li>
          </ul>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
