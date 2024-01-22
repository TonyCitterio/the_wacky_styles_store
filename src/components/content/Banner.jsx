import React from "react";
import classes from "./Banner.module.css";
import picture from "../../pictures/coffeebanner.jpg";

const Banner = () => {
  return (
    <section className={classes.container}>
      <div className={classes.content}>
        <div>
          <img src={picture} alt="of coffee" />
          <div className={classes.imgText}></div>
        </div>
        <div>
          <p>
            <span>Välkommen</span> till The Wacky Coffee Shop. En unik,
            fantasifull värld där kaffe möter kreativitet. Observera att detta
            är en helt fiktiv webbshop. Här finns inga faktiska produkter eller
            riktiga priser. Men låt inte det hindra dig! Vi inbjuder dig att
            utforska vår virtuella butik, göra låtsasbeställningar och låta din
            fantasi ta över. Dröm dig bort i en värld av aromatiska smaker och
            upplev dina innersta önskningar om den perfekta koppen kaffe. Låt
            The Wacky Coffee Shop vara din lekplats för kaffedrömmar! <br></br>
            <br></br> Alla bilder på denna webbplats kommer från
            <a
              href="https://www.pexels.com/sv-se/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Bilder från Pexels (öppnas i ny flik)"
              className={classes.pexelsLink}
            >
              {" "}
              Pexels
            </a>
            . Tack till de begåvade fotograferna som har bidragit med dessa
            fantastiska bilder.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
