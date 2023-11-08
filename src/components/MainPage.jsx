import React, { useState, useEffect } from "react";
import classes from "./MainPage.module.css";
import Navbar from "./general/Navbar";
import Banner from "./content/Banner";
import Products from "./content/Products";
import { pictures } from "./data/Pictures";
import MediumRoast from "./content/MediumRoast";
import defaultImage from "../pictures/coffee1.jpg";

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

  const combinedData = products.map((product, index) => {
    const picture = pictures.length > index ? pictures[index] : defaultImage;
    return { ...product, picture };
  });

  return (
    <>
      <Navbar />
      <main className={classes.main}>
        <Banner />
        <Products products={combinedData} />
        <MediumRoast products={combinedData} />
      </main>
    </>
  );
};

export default MainPage;
