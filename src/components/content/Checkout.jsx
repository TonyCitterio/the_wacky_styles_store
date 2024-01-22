import React, { useState, useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import classes from "./Checkout.module.css";

const Checkout = ({
  setView,
  setActiveView,
  cart,
  groupedCart,
  calculateTotalPrice,
  addProductToCart,
  removeProductFromCart,
  shippingCost,
  handleShippingCostText,
  calculateTotalPriceWithShipping,
  userData,
  setUserData,
}) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    email: false,
    firstName: false,
    lastName: false,
    phoneNumber: false,
    street: false,
    zip: false,
    city: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handelSubmit = (event) => {
    event.preventDefault();
  };

  const {
    smallShippingText,
    freeShippingText,
    isFreeShippingAvailable,
    isSmallShippingAvailable,
  } = handleShippingCostText();

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
            errorMessage = "Vänligen fyll i en giltig e-postadress";
          }
          break;
        case "phoneNumber":
          if (
            !/^\d+$/.test(value) ||
            !(value.length === 9 || value.length === 10)
          ) {
            errorMessage = "Vänligen fyll i ett giltigt telefonnummmer";
          }
          break;
        case "street":
          if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
            errorMessage = "Vänligen fyll i adress/gatunamn och husnummer";
          }
          break;
        case "zip":
          if (!/^\d+$/.test(value) || value.length !== 5) {
            errorMessage = "Vänligen ange ett giltigt postnummer";
          }
          break;
        default:
          break;
      }
    }

    if (errorMessage) {
      tempErrors[fieldName] = errorMessage;
    } else {
      delete tempErrors[fieldName];
    }

    setErrors(tempErrors);
    setTouched((prevTouched) => ({ ...prevTouched, [fieldName]: true }));
  };

  const handleFocus = (fieldName) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    setTouched((prevTouched) => ({ ...prevTouched, [fieldName]: false }));
  };

  const isFormValid = () => {
    const allFieldsFilled = Object.values(userData).every(
      (value) => value.trim() !== ""
    );
    const noErrors = Object.keys(errors).every((key) => errors[key] === "");

    return allFieldsFilled && noErrors;
  };

  const getInputClassName = (fieldName) => {
    if (touched[fieldName] && !errors[fieldName]) {
      return `${classes.input} ${classes.inputValid}`;
    }
    return classes.input;
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.header}>
          <h2>Granska din order</h2>
          <button
            onClick={() => {
              setView("products");
              setActiveView("products");
            }}
            aria-label="Gå tillbaka till produkter och fortsätt handla"
          >
            Fortsätt handla
          </button>
        </div>
        {cart.length !== 0 ? (
          <>
            <div className={classes.shippingCostContainer}>
              {!isSmallShippingAvailable && !isFreeShippingAvailable && (
                <p>{smallShippingText}</p>
              )}
              {isSmallShippingAvailable && !isFreeShippingAvailable && (
                <>
                  <p
                    style={{
                      color: "#a663cc",
                      fontWeight: "bold",
                      marginRight: "0.35rem",
                    }}
                  >
                    {smallShippingText}
                  </p>
                  <p>{freeShippingText}</p>
                </>
              )}
              {isFreeShippingAvailable && (
                <p style={{ color: "#a663cc", fontWeight: "bold" }}>
                  {freeShippingText}
                </p>
              )}
            </div>
            <div className={classes.products}>
              {groupedCart.map((product) => (
                <div key={product.id} className={classes.card}>
                  <img
                    src={product.picture}
                    alt=" of a coffee for a fake coffee shop"
                    height={75}
                    width={64}
                  />
                  <div className={classes.productInfo}>
                    <p>{product.name}</p>
                    <p>Styckpris: {product.price}</p>
                    <p>Summa: {calculateTotalPrice(product)} kr</p>
                  </div>
                  <div className={classes.buttonContainer}>
                    <button
                      onClick={() => removeProductFromCart(product)}
                      aria-label="Ta bort produkt från varukorg"
                    >
                      <FaMinus size={12} />
                    </button>
                    <div className={classes.quantity}>
                      <p>{product.quantity}</p>
                    </div>
                    <button
                      onClick={() => addProductToCart(product)}
                      aria-label="Lägg till produkt i varukorg"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>
              ))}
              <div className={classes.totalPrice}>
                <p>Frakt: {shippingCost} kr</p>
                <p>
                  <span>Att betala:</span> {calculateTotalPriceWithShipping()}{" "}
                  kr
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className={classes.empty}>Din varukorg är tom</p>
        )}
        {cart.length !== 0 ? (
          <>
            <div className={classes.fakeTextExplanation}>
              <p>
                Ingen riktig beställning görs utan detta är bara en simulerad
                beställning i en fiktiv onlinekaffebutik!
              </p>
            </div>
            <div className={classes.formContainer}>
              <div className={classes.formHeading}>
                <h3>Leveransuppgifter</h3>
              </div>
              <form onSubmit={handelSubmit} className={classes.form}>
                <div className={classes.inputContainer}>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={getInputClassName("email")}
                    placeholder="E-post *"
                    value={userData.email}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("email")}
                    onFocus={() => handleFocus("email")}
                  />
                  {errors.email && (
                    <p className={classes.errorMessage}>{errors.email}</p>
                  )}
                </div>
                <div className={classes.nameField}>
                  <div className={classes.firstNameField}>
                    {errors.firstName && (
                      <p className={classes.errorMessage}>{errors.firstName}</p>
                    )}
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className={getInputClassName("firstName")}
                      placeholder="Förnamn *"
                      value={userData.firstName}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("firstName")}
                      onFocus={() => handleFocus("firstName")}
                    />
                  </div>
                  <div className={classes.lastNameField}>
                    {errors.lastName && (
                      <p className={classes.errorMessage}>{errors.lastName}</p>
                    )}
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      className={getInputClassName("lastName")}
                      placeholder="Efternamn *"
                      value={userData.lastName}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("lastName")}
                      onFocus={() => handleFocus("lastName")}
                    />
                  </div>
                </div>
                <div className={classes.inputContainer}>
                  {errors.phoneNumber && (
                    <p className={classes.errorMessage}>{errors.phoneNumber}</p>
                  )}
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    className={getInputClassName("phoneNumber")}
                    placeholder="Telefon *"
                    value={userData.phoneNumber}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("phoneNumber")}
                    onFocus={() => handleFocus("phoneNumber")}
                  />
                </div>
                <div className={classes.inputContainer}>
                  {errors.street && (
                    <p className={classes.errorMessage}>{errors.street}</p>
                  )}
                  <input
                    type="text"
                    name="street"
                    id="street"
                    className={getInputClassName("street")}
                    placeholder="Adress *"
                    value={userData.street}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("street")}
                    onFocus={() => handleFocus("street")}
                  />
                </div>
                <div className={classes.areaField}>
                  <div className={classes.zipField}>
                    {errors.zip && (
                      <p className={classes.errorMessage}>{errors.zip}</p>
                    )}
                    <input
                      type="text"
                      name="zip"
                      id="zip"
                      className={getInputClassName("zip")}
                      placeholder="Postnummer *"
                      value={userData.zip}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("zip")}
                      onFocus={() => handleFocus("zip")}
                    />
                  </div>
                  <div className={classes.cityField}>
                    {errors.city && (
                      <p className={classes.errorMessage}>{errors.city}</p>
                    )}
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className={getInputClassName("city")}
                      placeholder="Ort *"
                      value={userData.city}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("city")}
                      onFocus={() => handleFocus("city")}
                    />
                  </div>
                </div>
              </form>
              <div className={classes.order}>
                <button
                  onClick={() => setView("confirmation")}
                  disabled={!isFormValid()}
                  style={{ opacity: isFormValid() ? 1 : 0.5 }}
                  aria-label="Skicka beställning"
                >
                  Beställ
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Checkout;
