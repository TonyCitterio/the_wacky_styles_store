import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import classes from "./MediumRoast.module.css";

const MediumRoast = ({
  products,
  addProductToCart,
  removeProductFromCart,
  groupedCart,
}) => {
  const mediumRoast = products.filter((a) => a.roast === "Mellanrost");

  const getProductInCart = (id) => {
    const numberOfProductsInCart = groupedCart.find(
      (product) => product.id === id
    );
    return numberOfProductsInCart ? numberOfProductsInCart.quantity : 0;
  };

  console.log("Medium");
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h2>Smakresa med våra mellanrost kaffe</h2>
        <div className={classes.productsGrid}>
          {mediumRoast.map((product) => (
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

export default MediumRoast;
