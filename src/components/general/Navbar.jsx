import React, { useState } from "react";
import { FaBasketShopping } from "react-icons/fa6";
import classes from "./Navbar.module.css";
import ModalCart from "../cart/ModalCart";

const Navbar = ({
  view,
  setView,
  activeView,
  setActiveView,
  cart,
  setCart,
  removeProductFromCart,
  addProductToCart,
  groupedCart,
  calculateTotalPrice,
  calculateTotalCartPrice,
  shippingCost,
  handleShippingCostText,
  calculateTotalPriceWithShipping,
}) => {
  const [modalOpenCart, setModalOpenCart] = useState(false);

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMiddle}>
        <h1 onClick={() => {setView("products"); setActiveView("products")}}>The Wacky Coffee Shop</h1>
        {view !== "checkout" && view !== "confirmation" ? (
          <div>
            <ul className={classes.bigUl}>
              <li className={activeView === "products" ? classes.active : ""} onClick={() => {setView("products"); setActiveView("products");}}>Hem</li>
              <li className={activeView === "lightRoast" ? classes.active : ""} onClick={() => {setView("lightRoast"); setActiveView("lightRoast");}}>Ljusrost</li>
              <li className={activeView === "mediumRoast" ? classes.active : ""} onClick={() => {setView("mediumRoast"); setActiveView("mediumRoast");}}>Mellanrost</li>
              <li className={activeView === "darkRoast" ? classes.active : ""} onClick={() => {setView("darkRoast"); setActiveView("darkRoast");}}>Mörkrost</li>
              <li className={activeView === "extraDarkRoast" ? classes.active : ""} onClick={() => {setView("extraDarkRoast"); setActiveView("extraDarkRoast");}}>Extra Mörkrost</li>
            </ul>
          </div>
        ) : null}
      </div>
      {view !== "checkout" && view !== "confirmation" ? (
        <div className={classes.navbarRightSide}>
          <div className={classes.shoppingCartContainer}>
            <FaBasketShopping
              size={35}
              className={classes.cartIcon}
              onClick={() => setModalOpenCart(true)}
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
                handleShippingCostText={handleShippingCostText}
                calculateTotalPriceWithShipping={
                  calculateTotalPriceWithShipping
                }
              />
            )}
            <div className={classes.itemsInCart}>
              <p>{cart.length}</p>
            </div>
          </div>
          <div className={classes.totalPrice}>
            {cart.length !== 0 ? (
              <>
                <p>Varukorg</p>
                <p>{calculateTotalCartPrice()} kr</p>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
