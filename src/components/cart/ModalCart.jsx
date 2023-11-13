import React from "react";
import classes from "./ModalCart.module.css";
const ModalCart = ({ setModalOpenCart, cart }) => {
  console.log(cart);
  return (
    <div className={classes.backdrop}>
      <div className={classes.cart}>
        <div className={classes.header}>
          <h3>Varukorg</h3>
          <button onClick={() => setModalOpenCart(false)}>Close</button>
        </div>
        <div className={classes.products}>
          {cart.map((product) => (
            <div className={classes.card} key={product.id}>
              <img
                src={product.picture}
                alt={` off coffee for a fake coffee shop`}
                height={90}
                width={65}
              />
              <p>{product.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalCart;
