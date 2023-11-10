import React from "react";
import classes from "./Products.module.css";

const Products = ({ products }) => {
  
  const getProduct = (product) => {
    alert(`Produkt: ${product.name} Pris: ${product.price} ${product.picture}`);
  };
console.log(products)
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
                width={200}
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
