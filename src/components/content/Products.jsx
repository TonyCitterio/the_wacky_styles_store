import React from "react";
import classes from "./Products.module.css";
/* import { pictures } from "../data/Pictures";

const Products = ({ products }) => {
  const getProduct = (product) => {
    alert(`Produkt: ${product.name} Pris: ${product.price} <img>${product.picture}</img>`);
  };

  const combinedData = products.map((product, index) => ({
    ...product,
    picture: pictures[index]
  }))

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.products}>
          {combinedData.map((item) => (
            <div key={item.id} className={classes.card}>
              <img src={item.picture} alt={`off coffee for a fake coffee site ${item.id}`} height={300} width={200} />
              <h3>{item.name}</h3>
              <p>{item.price}</p>
              <p>{item.description}</p>
              <p>{item.roast}</p>
              <button onClick={() => getProduct(item)}>Get me</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; */

const Products = ({ products }) => {
  const getProduct = (product) => {
    alert(
      `Produkt: ${product.name} Pris: ${product.price} ${product.picture}`
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.products}>
          {products.map((product) => (
            <div key={product.id} className={classes.card}>
              <img
                src={product.picture}
                alt={`off coffee for a fake coffee site ${product.id}`}
                height={300}
                width={220}
              />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <p>{product.description}</p>
              <p>{product.roast}</p>
              <button onClick={() => getProduct(product)}>Get me</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
