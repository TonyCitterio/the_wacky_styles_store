import React, { useState, useEffect } from "react";
import classes from "./MainPage.module.css";
import Navbar from "./general/Navbar";
import Banner from "./content/Banner";
import Products from "./content/Products";

/* const MainPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  console.log("renders");
    useEffect(() => {
    if (products.length > 0) {
      console.log("First product title:", products[0].title);
    }
  }, [products]);

   fetch("https://fakestoreapi.com/products/1")
  .then((res) => res.json())
  .then((json) => setProducts(json));

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);
console.log(products)

  useEffect(() => {
    fetch("https://coffee-store-api-default-rtdb.europe-west1.firebasedatabase.app/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);


console.log(products[3].price)
  return (
    <>
      <Navbar />
      <main className={classes.main}>
        <img>{products.image}</img>
        <Banner />
        <Products products={products} />
      </main>
    </>
  );
};

export default MainPage; */

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <>
      <Navbar />
      <main className={classes.main}>
        <Banner />
        <Products products={products} />
      </main>
    </>
  );
};

export default MainPage;
