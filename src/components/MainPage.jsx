import React from "react";
import classes from "./MainPage.module.css"
import Navbar from "./general/Navbar";
import Banner from "./content/Banner";

const MainPage = () => {
  return (
    <>
    <Navbar />
    <main className={classes.main}>
      <Banner />
    </main>
    </>
  );
};

export default MainPage;
