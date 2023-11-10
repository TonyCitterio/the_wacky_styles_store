import React from "react";
import classes from "./Navbar.module.css";

const Navbar = ({ setView }) => {
  const handleViewChange = (newView) => {
    setView(newView);
  }

  return (
    <nav className={classes.navbar}>
      <div>
        <h1>The Wacky Coffee Shop</h1>
      </div>
      <div>
        <ul className={classes.bigUl}>
          <li onClick={() => handleViewChange("products")}>Hem</li>
          <li onClick={() => handleViewChange("lightRoast")}>Ljusrost</li>
          <li onClick={() => handleViewChange("mediumRoast")}>Mellanrost</li>
          <li onClick={() => handleViewChange("darkRoast")}>Mörkrost</li>
          <li onClick={() => handleViewChange("extraDarkRoast")}>Extra Mörkrost</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
