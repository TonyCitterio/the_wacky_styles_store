import React, { useState, useEffect } from "react";
import classes from "./MainPage.module.css";
import Navbar from "./general/Navbar";
import Banner from "./content/Banner";
import Products from "./content/Products";
import LightRoast from "./content/LightRoast";
import MediumRoast from "./content/MediumRoast";
import DarkRoast from "./content/DarkRoast";
import ExtraDarkRoast from "./content/ExtraDarkRoast";
import { pictures } from "./data/Pictures";
import defaultImage from "../pictures/coffee1.jpg";

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState("products");
  const [cart, setCart] = useState([]);

  // Fetching the products
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchProducts() {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://coffee-store-api-default-rtdb.europe-west1.firebasedatabase.app/products.json",
          {
            signal: abortController.signal,
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();

    return () => {
      abortController.abort();
    };
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Combining the products array whit the pictures
  const combinedData = products.map((product, index) => {
    const picture = pictures.length > index ? pictures[index] : defaultImage;
    return { ...product, picture };
  });

  // Adding and removing products to the shopping cart
  const addProductToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeProductFromCart = (productToRemove) => {
    const indexToRemove = cart.findIndex(
      (product) => product.id === productToRemove.id
    );
    if (indexToRemove !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(indexToRemove, 1);
      setCart(updatedCart);
    }
  };

  console.log(cart);

  return (
    <>
      <Navbar
        setView={setView}
        cart={cart}
        setCart={setCart}
        removeProductFromCart={removeProductFromCart}
        addProductToCart={addProductToCart}
      />
      <main className={classes.main}>
        <Banner />
        {view === "products" ? (
          <Products
            products={combinedData}
            addProductToCart={addProductToCart}
            removeProductFromCart={removeProductFromCart}
          />
        ) : view === "lightRoast" ? (
          <LightRoast
            products={combinedData}
            addProductToCart={addProductToCart}
            removeProductFromCart={removeProductFromCart}
          />
        ) : view === "mediumRoast" ? (
          <MediumRoast
            products={combinedData}
            addProductToCart={addProductToCart}
            removeProductFromCart={removeProductFromCart}
          />
        ) : view === "darkRoast" ? (
          <DarkRoast
            products={combinedData}
            addProductToCart={addProductToCart}
            removeProductFromCart={removeProductFromCart}
          />
        ) : view === "extraDarkRoast" ? (
          <ExtraDarkRoast
            products={combinedData}
            addProductToCart={addProductToCart}
            removeProductFromCart={removeProductFromCart}
          />
        ) : null}
      </main>
    </>
  );
};

export default MainPage;
