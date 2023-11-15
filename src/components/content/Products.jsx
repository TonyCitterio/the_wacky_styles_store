import React from "react";
import classes from "./Products.module.css";

const Products = ({ products, addProductToCart, removeProductFromCart }) => {
  const topCoffee = products.slice(1, 5);
  const recommendation = products.slice(7, 9);

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
              <button onClick={() => addProductToCart(product)}>Get me</button>
              <button onClick={() => removeProductFromCart(product)}>
                Ta bort
              </button>
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
                  <button onClick={() => addProductToCart(product)}>
                    Get Me
                  </button>
                  <button onClick={() => removeProductFromCart(product)}>
                    Ta bort
                  </button>
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
