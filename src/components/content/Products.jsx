import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import classes from "./Products.module.css";

const Products = ({
  products,
  addProductToCart,
  removeProductFromCart,
  groupedCart,
}) => {
  const topCoffee = products.slice(1, 5);
  const recommendation = products.slice(7, 9);

  const getProductQuantity = (id) => {
    const productInCart = groupedCart.find((product) => product.id === id);
    return productInCart ? productInCart.quantity : 0;
  };
  console.log("Hej från Products");
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h2>Månadens bästsäljare</h2>
        <div className={classes.products}>
          {topCoffee.map((product) => (
            <div key={product.id} className={classes.card}>
              <img
                src={product.picture}
                alt={`off coffee for a fake coffee site ${product.id}`}
                height={300}
                width={200}
              />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <p>{product.description}</p>
              <p>{product.roast}</p>
              <div className={classes.buttonContainer}>
              {getProductQuantity(product.id) === 0 ? (
                  <button className={classes.onlyBuyButton} onClick={() => addProductToCart(product)}>Köp</button>) : (
                  <>
                    <button className={classes.addAndRemoveButtons} onClick={() => removeProductFromCart(product)}><FaMinus size={12}/></button>
                    <div className={classes.quantity}>
                      <p>{getProductQuantity(product.id)}</p>
                    </div>
                    <button className={classes.addAndRemoveButtons} onClick={() => addProductToCart(product)}><FaPlus size={12} /></button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className={classes.recommendations}>
          <div>
            <h2>Tjabba</h2>
          </div>
          <div>
            <div className={classes.products}>
              {recommendation.map((product) => (
                <div key={product.id} className={classes.card}>
                  <img
                    src={product.picture}
                    alt={`off coffee for a fake coffee site ${product.id}`}
                    height={300}
                    width={200}
                  />
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                  <p>{product.description}</p>
                  <p>{product.roast}</p>
                  <div className={classes.buttonContainer}>
                  {getProductQuantity(product.id) === 0 ? (
                  <button className={classes.onlyBuyButton} onClick={() => addProductToCart(product)}>Köp</button>) : (
                  <>
                    <button className={classes.addAndRemoveButtons} onClick={() => removeProductFromCart(product)}><FaMinus size={12}/></button>
                    <div className={classes.quantity}>
                      <p>{getProductQuantity(product.id)}</p>
                    </div>
                    <button className={classes.addAndRemoveButtons} onClick={() => addProductToCart(product)}><FaPlus size={12} /></button>
                  </>
                )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
