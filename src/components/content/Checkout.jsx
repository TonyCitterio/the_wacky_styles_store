import React from "react";
import classes from "./Checkout.module.css";

const Checkout = ({
  cart,
  groupedCart,
  calculateTotalPrice,
  setCart,
  addProductToCart,
  removeProductFromCart,
  setView,
  calculateTotalCartPrice,
  shippingCost,
  handelShippingCostText,
}) => {
  const handelSubmit = (event) => {
    event.preventDefault();
  };

  const {
    smallShippingText,
    freeShippingText,
    isFreeShippingAvailable,
    isSmallShippingAvailable,
  } = handelShippingCostText();

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.header}>
          <h2>Varukorg</h2>
          <button onClick={() => setView("products")}>Fortsätt handla</button>
        </div>
        <div className={classes.products}>
          {groupedCart.map((product) => (
            <div key={product.id} className={classes.card}>
              <h3>{product.name}</h3>
              <p>{product.roast}</p>
              <p>{product.quantity}</p>
              <p>{product.price}</p>
              <p>{calculateTotalPrice(product)} kr</p>
              <button onClick={() => addProductToCart(product)}>+</button>
              <button onClick={() => removeProductFromCart(product)}>-</button>
            </div>
          ))}
          <div>
            {!isSmallShippingAvailable && !isFreeShippingAvailable && (
              <p>{smallShippingText}</p>
            )}
            {isSmallShippingAvailable && !isFreeShippingAvailable && (
              <>
                <p style={{ color: "green" }}>{smallShippingText}</p>
                <p>{freeShippingText}</p>
              </>
            )}
            {isFreeShippingAvailable && (
              <p style={{ color: "green" }}>{freeShippingText}</p>
            )}
          </div>
          <div className={classes.total}>
            <p>Frakt: {shippingCost} kr</p>
            <p>Summa: {calculateTotalCartPrice()} kr</p>
          </div>
        </div>
        <div className={classes.formContainer}>
          <form onSubmit={handelSubmit} className={classes.form}>
            <label htmlFor="email">Epost</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="T.ex. johndoe@email.com"
            />
            <div className={classes.nameField}>
              <div className={classes.firstNameField}>
                <label htmlFor="firstName">Förnamn</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="T.ex. John"
                />
              </div>
              <div className={classes.lastNameField}>
                <label htmlFor="lastName">Efternamn</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="T.ex. Doe"
                />
              </div>
            </div>
            <label htmlFor="phoneNumber">Telefon</label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="T.ex. +46 770-123 456"
            />
            <label htmlFor="street">Adress</label>
            <input
              type="text"
              name="street"
              id="street"
              placeholder="T.ex. Gatunamn 1"
            />
            <div className={classes.areaField}>
              <div className={classes.zipField}>
                <label htmlFor="zip">Postnummer</label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  placeholder="T.ex. 12345"
                />
              </div>
              <div className={classes.cityField}>
                <label htmlFor="city">Ort</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="T.ex. Malmö"
                />
              </div>
            </div>
          </form>
        </div>
        <div className={classes.order}>
          <button>Beställ</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
