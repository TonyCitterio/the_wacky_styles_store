import React from "react";
import classes from "./LightRoast.module.css";

const LightRoast = ({ products }) => {
  const lightRoast = products.filter((a) => a.roast === "Ljusrost");

  const getProduct = (product) => {
    alert(`Produkt: ${product.name} Pris: ${product.price} ${product.picture}`)
    console.log("hej")
  }
  console.log(products);
  console.log(lightRoast);
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.productGrid}>
          {lightRoast.map((product) => (
            <div key={product.id} className={classes.card}>
              <img
                src={product.picture}
                alt={`off coffee for a fake coffee shop ${product.id}`}
                height={300}
                width={200}
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

export default LightRoast;
