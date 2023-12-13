import React from "react";
import classes from "./Confirmation.module.css";

const Confirmation = ({
  setView,
  setActiveView,
  groupedCart,
  setCart,
  calculateTotalPrice,
  calculateTotalPriceWithShipping,
  shippingCost,
  userData,
  setUserData,
}) => {
  const CurrentDate = new Date().toLocaleDateString();

  const handleClose = () => {
    setCart([]);
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      street: "",
      zip: "",
      city: "",
    });
    setView("products")
    setActiveView("products")
  };

  const formatStrings = (str) => {
    if (str && typeof str === "string") {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    return "";
  };

  const formatEmail = (email) => {
    return email.toLowerCase();
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.intro}>
          <p>
            Detta är ingen riktig orderbekräflelse så ingen order är lagd och
            inga varor är beställda. Detta är bara en låtsas orderbekräftelse
            från en låtsas online kaffe shop.
          </p>
        </div>
        <div className={classes.orderConfirmation}>
          <div className={classes.header}>
            <h2>Orderbekräftelse</h2>
            <h3>The Wacky Coffee Shop</h3>
          </div>
          <div className={classes.customerInfo}>
            <div>
              <p className={classes.bold}>Beställare:</p>
              <p>
                Namn: {formatStrings(userData.firstName)}{" "}
                {formatStrings(userData.lastName)}
              </p>
              <p>Telefon: {userData.phoneNumber}</p>
              <p>E-post: {formatEmail(userData.email)}</p>
              <p>Orderdatum: {CurrentDate}</p>
            </div>
            <div>
              <p className={classes.bold}>Leveransaddres:</p>
              <p>
                {formatStrings(userData.firstName)}{" "}
                {formatStrings(userData.lastName)}
              </p>
              <p>{formatStrings(userData.street)}</p>
              <p>
                {userData.zip} {formatStrings(userData.city)}
              </p>
            </div>
          </div>
          <table className={classes.productTable}>
            <thead>
              <tr>
                <th>Namn</th>
                <th>Antal</th>
                <th>Styckpris</th>
                <th>Belopp</th>
              </tr>
            </thead>
            <tbody>
              {groupedCart.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td>{calculateTotalPrice(product)} kr</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={classes.totalPriceContainer}>
            <p>Frakt: {shippingCost} kr</p>
            <p>
              <span className={classes.totalPrice}>Totaltbelopp: </span>
              {calculateTotalPriceWithShipping()} kr
            </p>
          </div>
        </div>
        <div className="">
          <p>Tack för att du valt att handla hos The Wacky Coffee Shop</p>
          <p>Välkommen åter!</p>
          <button onClick={handleClose}>Stäng</button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
