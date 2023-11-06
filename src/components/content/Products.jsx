import React from "react";
import classes from "./Products.module.css"

const Products = ({ products }) => {

const getProduct = (product) => {
    alert(`Produkt: ${product.name} Pris: ${product.price}`)
}

  return (
    <div className={classes.container}>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <p>{product.description}</p>
          <p>{product.roast}</p>
          <button onClick={() => getProduct(product)}>Get me</button>
        </div>
      ))}
    </div>
  );
};

export default Products;
