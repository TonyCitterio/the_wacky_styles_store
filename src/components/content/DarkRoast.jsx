import React from "react";
import classes from "./DarkRoast.module.css";

const DarkRoast = ({ products }) => {
  const darkRoast = products.filter((a) => a.roast === "Mörkrost");

  const getProduct = (product) => {
    alert(`Produkt: ${product.name} Pris: ${product.price} ${product.picture} `)
  }

  console.log(darkRoast);

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.productGrid}>
          {darkRoast.map((product) => (
            <div key={product.id} className={classes.card}>
              <img
                src={product.picture}
                alt={` off coffee for a fake coffee shop ${product.id}`}
                height={300}
                width={200}
              />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <p>{product.description}</p>
              <p>{product.roast}</p>
              <button onClick={(() => getProduct(product))}>Get Me</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DarkRoast;
