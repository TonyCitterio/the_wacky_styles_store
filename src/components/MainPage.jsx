import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  // const navigate = useNavigate();

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
      <Navbar setView={setView} />
      <main className={classes.main}>
        <Banner />
        {view === "products" ? (
          <Products products={combinedData} />
        ) : view === "lightRoast" ? (
          <LightRoast products={combinedData} />
        ) : view === "mediumRoast" ? (
          <MediumRoast products={combinedData} />
        ) : view === "darkRoast" ? (
          <DarkRoast products={combinedData} />
        ) : view === "extraDarkRoast" ? (
          <ExtraDarkRoast products={combinedData} />
        ) : null}
      </main>
    </>
  );
};

export default MainPage;
