import React, { useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = ({
  groupedCart,
  calculateTotalPrice,
  addProductToCart,
  removeProductFromCart,
  setView,
  shippingCost,
  handelShippingCostText,
  calculateTotalPriceWithShipping,
  userData,
  setUserData,
}) => {
  const [errors, setErrors] = useState({});
  const handelSubmit = (event) => {
    event.preventDefault();
  };

  const {
    smallShippingText,
    freeShippingText,
    isFreeShippingAvailable,
    isSmallShippingAvailable,
  } = handelShippingCostText();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleBlur = (fieldName) => {
    let tempErrors = { ...errors };
    let errorMessage = "";

    const value = userData[fieldName];

    if (!value) {
      errorMessage = "Fältet får inte vara tomt";
    } else {
      switch (fieldName) {
        case "email":
          if (!/^\S+@\S+\.\S+$/.test(value)) {
            errorMessage =
              "Vänligen fyll i en giltig e-postadress (exempelvis johndoe@email.com";
          }
          break;
        case "phoneNumber":
          if (
            !/^\d+$/.test(value) ||
            !(value.length === 9 || value.length === 10)
          ) {
            errorMessage =
              "Vänligen fyll i ett giltigt telefonnummmer (exempelvis 0770123456)";
          }
          break;
        case "street":
          if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
            errorMessage = "Vänligen fyll i adress/gatunamn och husnummer";
          }
          break;
        case "zip":
          if (!/^\d+$/.test(value) || value.length !== 5) {
            errorMessage =
              "Vänligen ange ett 5-siffrigt postnummer (exempelvis 12345)";
          }
          break;
      }
    }

    if (errorMessage) {
      tempErrors[fieldName] = errorMessage;
    } else {
      delete tempErrors[fieldName];
    }

    setErrors(tempErrors);
  };

  const handleFocus = (fieldName) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };

  const isFormValid = () => {
    const allFieldsFilled = Object.values(userData).every(
      (value) => value.trim() !== ""
    );
    const noErrors = Object.keys(errors).every((key) => errors[key] === "");

    return allFieldsFilled && noErrors;
  };

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
              <img
                src={product.picture}
                alt=" of a coffee for a fake coffee shop"
              />
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
            <p>Att betala: {calculateTotalPriceWithShipping()} kr</p>
          </div>
        </div>
        <div>
          <p>
            Det är ingen riktig beställning som görs utan det är bara en fake
            beställning på en fake online kaffe shop
          </p>
        </div>
        <div className={classes.formContainer}>
          <form onSubmit={handelSubmit} className={classes.form}>
            <label htmlFor="email">Epost</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="T.ex. johndoe@email.com"
              value={userData.email}
              onChange={handleInputChange}
              onBlur={() => handleBlur("email")}
              onFocus={() => handleFocus("email")}
            />
            {errors.email && <p>{errors.email}</p>}
            <div className={classes.nameField}>
              <div className={classes.firstNameField}>
                <label htmlFor="firstName">Förnamn</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="T.ex. John"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("firstName")}
                  onFocus={() => handleFocus("firstName")}
                />
                {errors.firstName && <p>{errors.firstName}</p>}
              </div>
              <div className={classes.lastNameField}>
                <label htmlFor="lastName">Efternamn</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="T.ex. Doe"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("lastName")}
                  onFocus={() => handleFocus("lastName")}
                />
                {errors.lastName && <p>{errors.lastName}</p>}
              </div>
            </div>
            <label htmlFor="phoneNumber">Telefon</label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="T.ex. +46 770-123 456"
              value={userData.phoneNumber}
              onChange={handleInputChange}
              onBlur={() => handleBlur("phoneNumber")}
              onFocus={() => handleFocus("phoneNumber")}
            />
            {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
            <label htmlFor="street">Adress</label>
            <input
              type="text"
              name="street"
              id="street"
              placeholder="T.ex. Gatunamn 1"
              value={userData.street}
              onChange={handleInputChange}
              onBlur={() => handleBlur("street")}
              onFocus={() => handleFocus("street")}
            />
            {errors.street && <p>{errors.street}</p>}
            <div className={classes.areaField}>
              <div className={classes.zipField}>
                <label htmlFor="zip">Postnummer</label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  placeholder="T.ex. 12345"
                  value={userData.zip}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("zip")}
                  onFocus={() => handleFocus("zip")}
                />
                {errors.zip && <p>{errors.zip}</p>}
              </div>
              <div className={classes.cityField}>
                <label htmlFor="city">Ort</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="T.ex. Malmö"
                  value={userData.city}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("city")}
                  onFocus={() => handleFocus("city")}
                />
                {errors.city && <p>{errors.city}</p>}
              </div>
            </div>
          </form>
        </div>
        <div className={classes.order}>
          <button
            onClick={() => setView("confirmation")}
            disabled={!isFormValid()}
            style={{ opacity: isFormValid() ? 1 : 0.5 }}
          >
            Beställ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
