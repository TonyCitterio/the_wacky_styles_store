import React from "react";
import classes from "./ModalCart.module.css";

const ModalCart = ({
  setView,
  setModalOpenCart,
  cart,
  setCart,
  removeProductFromCart,
  addProductToCart,
  groupedCart,
  calculateTotalPrice,
  shippingCost,
  handleShippingCostText,
  calculateTotalPriceWithShipping,
}) => {
  const cartIsEmpty = cart.length === 0;

  const handelViewChange = (newView) => {
    setView(newView);
    setModalOpenCart(false);
  };

  const {
    smallShippingText,
    freeShippingText,
    isFreeShippingAvailable,
    isSmallShippingAvailable,
  } = handleShippingCostText();

  return (
    <div className={classes.backdrop}>
      <div className={classes.cart}>
        <div className={classes.header}>
          <h3>Varukorg</h3>
          <button onClick={() => setModalOpenCart(false)}>Stäng</button>
        </div>
        {cartIsEmpty ? <p>Din varukorg är tom</p> : null}
        <div className={classes.products}>
          {groupedCart.map((product) => (
            <div className={classes.card} key={product.id}>
              <img
                src={product.picture}
                alt={` off coffee for a fake coffee shop`}
                height={90}
                width={65}
              />
              <p>{product.name}</p>
              <p>Styckpris: {product.price}</p>
              <p>Summa: {calculateTotalPrice(product)} kr</p>
              <div className={classes.buttonContainer}>
                <button onClick={() => removeProductFromCart(product)}>-</button>
                <div className={classes.quantity}><p>{product.quantity}</p></div>
                <button onClick={() => addProductToCart(product)}>+</button>
              </div>
            </div>
          ))}
          {!cartIsEmpty ? (
            <div>
              <div className={classes.totalPrice}>
                <p>Frakt: {shippingCost} kr</p>
                <p>Att betala: {calculateTotalPriceWithShipping()} kr</p>
              </div>
              <button onClick={() => setCart([])}>Tom varukorg</button>
              <button onClick={() => handelViewChange("checkout")}>
                Till kassan
              </button>
            </div>
          ) : null}
        </div>
        {!cartIsEmpty ? (
          <div>
            {!isSmallShippingAvailable && !isFreeShippingAvailable && (
              <p>{smallShippingText}</p>
            )}
            {isSmallShippingAvailable && !isFreeShippingAvailable && (
              <>
              <p style={{color: "green"}}>{smallShippingText}</p>
              <p>{freeShippingText}</p>
              </>
            )}
            {isSmallShippingAvailable && isFreeShippingAvailable && (
              <p style={{color: "green"}}>{freeShippingText}</p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ModalCart;

// If I might use a portal instead. If I do dont forget to add this <div id="modal-root"></div> in index.
/* import React, { useState } from "react";
import ReactDOM from "react-dom";
import classes from "./ModalCart.module.css";
import ModalCheckout from "./ModalCheckout";

const ModalCartOverlay = ({
  setModalOpenCart,
  setCart,
  removeProductFromCart,
  addProductToCart,
  groupedCart,
  cartIsEmpty,
  emptyCart,
  calculateTotalPrice,
  modalCheckoutOpen,
  setModalCheckoutOpen,
 
}) => {
  const handelModal = () => {
    setModalCheckoutOpen(true);

  }
  return (
    <div className={classes.backdrop}>
      <div className={classes.cart}>
        <div className={classes.header}>
          <h3>Varukorg</h3>
          <button onClick={() => setModalOpenCart(false)}>Close</button>
        </div>
        {cartIsEmpty ? <p>Din varukorg är tom</p> : null}
        <div className={classes.products}>
          {groupedCart.map((product) => (
            <div className={classes.card} key={product.id}>
              <img
                src={product.picture}
                alt={` off coffee for a fake coffee shop`}
                height={90}
                width={65}
              />
              <p>{product.name}</p>
              <p>{product.quantity}</p>
              <p>Price per st: {product.price} kr</p>
              <p>Summa {calculateTotalPrice(product)} kr</p>
              <div>
                <button onClick={() => addProductToCart(product)}>+</button>
                <button onClick={() => removeProductFromCart(product)}>
                  -
                </button>
              </div>
            </div>
          ))}
          {emptyCart ? (
            <div>
              <button onClick={() => setCart([])}>Tom varukorg</button>
              <button onClick={handelModal}>
                Checkout
              </button>
              {modalCheckoutOpen && (
                <ModalCheckout setModalCheckoutOpen={setModalCheckoutOpen} setModalOpenCart={setModalOpenCart} />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const ModalCart = ({
  setModalOpenCart,
  cart,
  setCart,
  removeProductFromCart,
  addProductToCart,
}) => {
  const [modalCheckoutOpen, setModalCheckoutOpen] = useState(false);
  const groupProductsByProductId = (cartProducts) => {
    const groupedProducts = {};

    cartProducts.forEach((product) => {
      if (groupedProducts[product.id]) {
        groupedProducts[product.id].quantity += 1;
      } else {
        groupedProducts[product.id] = { ...product, quantity: 1 };
      }
    });

    return Object.values(groupedProducts);
  };

  const groupedCart = groupProductsByProductId(cart);
  const cartIsEmpty = cart.length === 0;
  const emptyCart = cart.length >= 1;

  const calculateTotalPrice = (product) => {
    const price = parseFloat(product.price.replace(/[^\d.-]/g, ""));
    const totalPrice = product.quantity * price;

    return totalPrice;
  };



  return (
    <>
      {ReactDOM.createPortal(
        <ModalCartOverlay
          setModalOpenCart={setModalOpenCart}
          setCart={setCart}
          removeProductFromCart={removeProductFromCart}
          addProductToCart={addProductToCart}
          groupedCart={groupedCart}
          cartIsEmpty={cartIsEmpty}
          emptyCart={emptyCart}
          calculateTotalPrice={calculateTotalPrice}
          modalCheckoutOpen={modalCheckoutOpen}
          setModalCheckoutOpen={setModalCheckoutOpen}
       
        />,
        document.getElementById("modalCart-root")
      )}
    </>
  );
};

export default ModalCart; */
