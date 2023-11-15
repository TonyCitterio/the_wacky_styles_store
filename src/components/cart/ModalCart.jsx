import React from "react";
import classes from "./ModalCart.module.css";

const ModalCart = ({
  setModalOpenCart,
  cart,
  setCart,
  removeProductFromCart,
  addProductToCart,
}) => {

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
                <button onClick={() => removeProductFromCart(product)}>-</button>
              </div>
            </div>
          ))}
          {emptyCart ? (
            <button onClick={() => setCart([])}>Tom varukorg</button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ModalCart;

// If I might use a portal instead. If I do dont forget to add this <div id="modal-root"></div> in index.
/* import React from "react";
import ReactDOM from "react-dom";
import classes from "./ModalCart.module.css";

const ModalOverlay = ({
  setModalOpenCart,
  setCart,
  removeProductFromCart,
  addProductToCart,
  groupedCart,
  cartIsEmpty,
  emptyCart,
  calculateTotalPrice,
}) => {
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
            <button onClick={() => setCart([])}>Tom varukorg</button>
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
                <button onClick={() => removeProductFromCart(product)}>-</button>
              </div>
            </div>
          ))}
          {emptyCart ? (
            <button onClick={() => setCart([])}>Tom varukorg</button>
          ) : null}
        </div>
      </div>
    </div> 
  );
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay
          setModalOpenCart={setModalOpenCart}
          setCart={setCart}
          removeProductFromCart={removeProductFromCart}
          addProductToCart={addProductToCart}
          groupedCart={groupedCart}
          cartIsEmpty={cartIsEmpty}
          emptyCart={emptyCart}
          calculateTotalPrice={calculateTotalPrice}
        />, document.getElementById('modal-root')
      )}
    </>
  );
};

export default ModalCart; */