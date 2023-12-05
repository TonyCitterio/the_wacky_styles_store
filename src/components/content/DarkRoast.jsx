import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import classes from "./DarkRoast.module.css";

const DarkRoast = ({
  products,
  addProductToCart,
  removeProductFromCart,
  groupedCart,
}) => {
  const darkRoast = products.filter((a) => a.roast === "Mörkrost");

  const getProductInCart = (id) => {
    const numberOfProductsInCart = groupedCart.find(
      (product) => product.id === id
    );
    return numberOfProductsInCart ? numberOfProductsInCart.quantity : 0;
  };

  return (
    <div className={classes.container}>
    <div className={classes.content}>
      <div className={classes.productsGrid}>
        {darkRoast.map((product) => (
          <div key={product.id} className={classes.card}>
            <div className={classes.cardTop}>
              <div className={classes.imgContainer}>
                <div className={classes.roastContainer}>
                  <p>{product.roast}</p>
                </div>
                <img
                  src={product.picture}
                  alt={`off coffee for a fake coffee shop ${product.id}`}
                  height={200}
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
                  <button className={classes.onlyBuyButton} onClick={() => addProductToCart(product)}>Köp</button>
                ) : (
                  <>
                    <button className={classes.addAndRemoveButtons} onClick={() => removeProductFromCart(product)}><FaMinus size={12} /></button>
                    <div className={classes.quantity}>
                      <p>{getProductInCart(product.id)}</p>
                    </div>
                    <button className={classes.addAndRemoveButtons} onClick={() => addProductToCart(product)}><FaPlus size={12} /></button>
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

export default DarkRoast;
