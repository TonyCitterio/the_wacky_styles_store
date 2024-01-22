import React, { useEffect, useRef, useState, useCallback } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
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
  const cartRef = useRef();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setModalOpenCart(false);
      setIsClosing(false);
    }, 1000);
  }, [setIsClosing, setModalOpenCart]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [handleClose]);

  const cartIsEmpty = cart.length === 0;

  const handleViewChange = (newView) => {
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
    <div
      className={`${classes.backdrop} ${
        isClosing ? classes.fadeOutBackdrop : classes.fadeInBackdrop
      }`}
    >
      <div
        className={`${classes.cart} ${
          isClosing ? classes.fadeOutCart : classes.fadeInCart
        }`}
        ref={cartRef}
      >
        <div className={classes.header}>
          <div>
            <h3>Varukorg</h3>
          </div>
          <button
            className={classes.closeButton}
            onClick={handleClose}
            aria-label="Stäng kundvagn"
          >
            <IoCloseSharp size={26} />
          </button>
        </div>
        {cartIsEmpty ? (
          <p className={classes.emptyCartText}>Din varukorg är tom</p>
        ) : null}
        {!cartIsEmpty ? (
          <div className={classes.shippingCostContainer}>
            {!isSmallShippingAvailable && !isFreeShippingAvailable && (
              <p>{smallShippingText}</p>
            )}
            {isSmallShippingAvailable && !isFreeShippingAvailable && (
              <>
                <p style={{ color: "#a663cc", fontWeight: "bold" }}>
                  {smallShippingText}
                </p>
                <p>{freeShippingText}</p>
              </>
            )}
            {isSmallShippingAvailable && isFreeShippingAvailable && (
              <p style={{ color: "#a663cc", fontWeight: "bold" }}>
                {freeShippingText}
              </p>
            )}
          </div>
        ) : null}
        <div className={classes.products}>
          {groupedCart.map((product) => (
            <div className={classes.card} key={product.id}>
              <img
                src={product.picture}
                alt={` off coffee for a fake coffee shop`}
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
        </div>
        {!cartIsEmpty ? (
          <>
            <div className={classes.emptyCartContainer}>
              <button
                onClick={() => setCart([])}
                aria-label="Ta bort alla produkter från varukorg"
              >
                Töm varukorg <FaTrash />
              </button>
            </div>
            <div className={classes.totalPriceContainer}>
              <p>Frakt: {shippingCost} kr</p>
              <p>
                <span className={classes.totalPrice}>Att betala:</span>{" "}
                {calculateTotalPriceWithShipping()} kr
              </p>
              <button
                onClick={() => handleViewChange("checkout")}
                aria-label="Gå till kassan"
              >
                Till kassan
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ModalCart;
