import React, { useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import classes from "./ExtraDarkRoast.module.css";

const ExtraDarkRoast = ({
  products,
  addProductToCart,
  removeProductFromCart,
  groupedCart,
}) => {
  const extraDarkRoast = products.filter((a) => a.roast === "Extra Mörkrost");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getProductInCart = (id) => {
    const numberOfProductsInCart = groupedCart.find(
      (product) => product.id === id
    );
    return numberOfProductsInCart ? numberOfProductsInCart.quantity : 0;
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <hr className={classes.hr} />
        <h2>Upptäck magin med Extra Mörkrost</h2>
        <div className={classes.productsGrid}>
          {extraDarkRoast.map((product) => (
            <div key={product.id} className={classes.card}>
              <div className={classes.cardTop}>
                <div className={classes.imgContainer}>
                  <div className={classes.roastContainer}>
                    <p>{product.roast}</p>
                  </div>
                  <img
                    src={product.picture}
                    alt={`off coffee for a fake coffee shop ${product.id}`}
                    height={185}
                    width={162}
                  />
                  <div className={classes.priceContainer}>
                    <p>{product.price}</p>
                  </div>
                </div>
              </div>
              <div className={classes.cardMiddle}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
              <div className={classes.cardBottom}>
                <div className={classes.buttonContainer}>
                  {getProductInCart(product.id) === 0 ? (
                    <button
                      className={classes.onlyBuyButton}
                      onClick={() => addProductToCart(product)}
                      aria-label="Köp"
                    >
                      Köp
                    </button>
                  ) : (
                    <>
                      <button
                        className={classes.addAndRemoveButtons}
                        onClick={() => removeProductFromCart(product)}
                        aria-label="Ta bort produkt från varukorg"
                      >
                        <FaMinus />
                      </button>
                      <div className={classes.quantity}>
                        <p>{getProductInCart(product.id)}</p>
                      </div>
                      <button
                        className={classes.addAndRemoveButtons}
                        onClick={() => addProductToCart(product)}
                        aria-label="Lägg till produkt i varukorg"
                      >
                        <FaPlus />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExtraDarkRoast;
