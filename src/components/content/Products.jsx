import React, { useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import classes from "./Products.module.css";
import picture from "../../pictures/recommendations.jpg";

const Products = ({
  products,
  addProductToCart,
  removeProductFromCart,
  groupedCart,
}) => {
  const topCoffee = products.slice(1, 5);
  const recommendation = products.slice(9, 13);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getProductInCart = (id) => {
    const numberOfProductsInCart = groupedCart.find(
      (product) => product.id === id
    );
    return numberOfProductsInCart ? numberOfProductsInCart.quantity : 0;
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <hr className={classes.hr} />
        <h2 className={classes.bestSellerHeading}>Månadens bästsäljare</h2>
        <div className={classes.productsGridBestSeller}>
          {topCoffee.map((product) => (
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
                    <button
                      className={classes.onlyBuyButton}
                      onClick={() => addProductToCart(product)}
                      aria-label="Köp"
                    >
                      Köp
                    </button>
                  ) : (
                    <>
                      <button
                        className={classes.addAndRemoveButtons}
                        onClick={() => removeProductFromCart(product)}
                        aria-label="Ta bort produkt från varukorg"
                      >
                        <FaMinus />
                      </button>
                      <div className={classes.quantity}>
                        <p>{getProductInCart(product.id)}</p>
                      </div>
                      <button
                        className={classes.addAndRemoveButtons}
                        onClick={() => addProductToCart(product)}
                        aria-label="Lägg till produkt i varukorg"
                      >
                        <FaPlus />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className={classes.hr} />
        <div className={classes.recommendations}>
          <div>
            <h2>Handplockade för dig!</h2>
            <p>
              Välkommen till en värld av utsökta smaker och aromer! Vi på The
              Wacky Coffee Shop har noggrant valt ut dessa fyra kaffesorter för
              att erbjuda dig en unik och minnesvärd upplevelse. Varje kaffe är
              utvalt för sin distinkta karaktär och kvalitet. Ta en stund att
              utforska och njuta av dessa noggrant utvalda kaffesorter. Vi är
              övertygade om att du kommer att finna din nya favorit bland dem!
            </p>
          </div>
          <div>
            <img src={picture} alt=" of a laptop and a nota that says Coffee" />
          </div>
        </div>
        <div className={classes.productsGridRecommendations}>
          {recommendation.map((product) => (
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
                    <button
                      className={classes.onlyBuyButton}
                      onClick={() => addProductToCart(product)}
                      aria-label="Köp"
                    >
                      Köp
                    </button>
                  ) : (
                    <>
                      <button
                        className={classes.addAndRemoveButtons}
                        onClick={() => removeProductFromCart(product)}
                        aria-label="Ta bort produkt från varukorg"
                      >
                        <FaMinus />
                      </button>
                      <div className={classes.quantity}>
                        <p>{getProductInCart(product.id)}</p>
                      </div>
                      <button
                        className={classes.addAndRemoveButtons}
                        onClick={() => addProductToCart(product)}
                        aria-label="Lägg till produkt i varukorg"
                      >
                        <FaPlus />
                      </button>
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

export default Products;
