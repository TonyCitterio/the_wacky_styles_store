import React, { useState, useEffect } from "react";
import classes from "./MainPage.module.css";
import Navbar from "./general/Navbar";
import Banner from "./content/Banner";
import Products from "./content/Products";
import LightRoast from "./content/LightRoast";
import MediumRoast from "./content/MediumRoast";
import DarkRoast from "./content/DarkRoast";
import ExtraDarkRoast from "./content/ExtraDarkRoast";
import Checkout from "./content/Checkout";
import { pictures } from "./data/Pictures";
import defaultImage from "../pictures/coffee1.jpg";

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState("products");
  const [cart, setCart] = useState([]);
  const shippingBig = 99;
  const shippingSmall = 49;

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

  useEffect(() => {
    if (cart.length === 0) {
      setView("products");
    }
  }, [cart.length]);

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

  // Grouping products for the cart
  const groupProductsByProductId = (cartProducts) => {
    const groupedProducts = {};

    cartProducts.forEach((product) => {
      if (groupedProducts[product.id]) {
        groupedProducts[product.id].quantity += 1;
      } else {
        groupedProducts[product.id] = { ...product, quantity: 1 };
      }
    });

    return Object.values(groupedProducts);
  };

  const groupedCart = groupProductsByProductId(cart);

  //Handles adding prices
  const calculateTotalPrice = (product) => {
    const price = parseFloat(product.price.replace(/[^\d.-]/g, ""));
    const totalPrice = product.quantity * price;

    return totalPrice;
  };

  const calculateTotalCartPrice = () => {
    return groupedCart.reduce((total, product) => {
      return total + calculateTotalPrice(product);
    }, 0);
  };

  const calculateShippingCost = (totalCartPrice) => {
    if (totalCartPrice >= 499) {
      return 0;
    } else if (totalCartPrice >= 250) {
      return shippingSmall;
    } else {
      return shippingBig;
    }
  };

  const totalCartPrice = calculateTotalCartPrice();
  const shippingCost = calculateShippingCost(totalCartPrice);
  
//Check for how much shipping should cost
  const handelShippingCostText = () => {
    const totalCartPrice = calculateTotalCartPrice();
    const leftToSmallShippingCost = 250 - totalCartPrice;
    const leftToFreeShipping = 500 - totalCartPrice;

    const shippingInfo = {
      smallShippingText:
        leftToSmallShippingCost <= 0
          ? "Frakt för 49 kr tillgänglig"
          : `Handla för ${leftToSmallShippingCost} kr till för att få frakt för 49 kr`,
      freeShippingText:
        leftToFreeShipping <= 0
          ? "Fri frakt tillgänglig"
          : `Handla för ${leftToFreeShipping} kr till för att få gratis frakt`,
      isSmallShippingAvailable: leftToSmallShippingCost <= 0,
      isFreeShippingAvailable: leftToFreeShipping <= 0,
    };
    return shippingInfo;
  };

  return (
    <>
      <Navbar
        view={view}
        setView={setView}
        cart={cart}
        setCart={setCart}
        removeProductFromCart={removeProductFromCart}
        addProductToCart={addProductToCart}
        groupedCart={groupedCart}
        calculateTotalPrice={calculateTotalPrice}
        calculateTotalCartPrice={calculateTotalCartPrice}
        handelShippingCostText={handelShippingCostText}
      />
      <main className={classes.main}>
        {view !== "checkout" ? <Banner /> : null}
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
        ) : view === "checkout" ? (
          <Checkout
            cart={cart}
            groupedCart={groupedCart}
            calculateTotalPrice={calculateTotalPrice}
            setCart={setCart}
            removeProductFromCart={removeProductFromCart}
            addProductToCart={addProductToCart}
            setView={setView}
            calculateTotalCartPrice={calculateTotalCartPrice}
            shippingCost={shippingCost}
            handelShippingCostText={handelShippingCostText}
          />
        ) : null}
      </main>
    </>
  );
};

export default MainPage;
