import React from "react";
import classes from "./Banner.module.css";
import picture from "../../pictures/coffeebanner.jpg";

const Banner = () => {
  return (
    <section className={classes.container}>
      <div className={classes.content}>
        <div>
          <img src={picture} alt="of coffee" />
        </div>
        <div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Perferendis assumenda ipsum vero ab alias voluptate perspiciatis ad
            blanditiis ea, provident quas pariatur quam sed commodi ullam,
            deserunt, minima molestias tenetur!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
