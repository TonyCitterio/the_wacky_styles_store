import React from "react";
import classes from "./MediumRoast.module.css";

const MediumRoast = ({ products }) => {
  const mediumRoast = products.filter((a) => a.roast === "Mellanrost");

  const getProduct = (product) => {
    alert(`Produkt: ${product.name} ${product.picture}`);
  };
  console.log("Medium")
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.productsGrid}>
          {mediumRoast.map((product) => (
            <div key={product.id} className={classes.card}>
              <img
                src={product.picture}
                alt={`off coffee for a fake coffee shop ${product.id}`}
                height={300}
                width={220}
              />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <p>{product.description}</p>
              <p>{product.roast}</p>
              <button onClick={() => getProduct(product)}>Get Me</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediumRoast;
