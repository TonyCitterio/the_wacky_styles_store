import React from "react";
import { FaTruckFast } from "react-icons/fa6";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <p className={classes.shippingCostText}>
        {" "}
        <FaTruckFast size={16} className={classes.truckIcon} /> Frakt från 99 kr
        - fri frakt över 499 kr
      </p>
      <h3>The Wacky Coffee Shop</h3>
      <p>Från oss alla till er alla, En riktig god kop kaffe!</p>
    </footer>
  );
};

export default Footer;
