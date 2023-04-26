import React from "react";
import { NavLink } from "react-router-dom";
import landingPage from "./Landing.module.css"

class Landing extends React.Component {

  render() {
    return (
      <div className={landingPage.container}>
        <NavLink to={"/videogames"} rel="noopener noreferrer">
          <button className={landingPage.boton}>Home</button>
        </NavLink>
        <div className={landingPage.content}>
          <h1>PI Videogames</h1>
          <p>"una landing page dedicada a los videojuegos más emocionantes y desafiantes del mercado. Estoy emocionado de presentarte mi proyecto y de compartir contigo mi pasión por los videojuegos.

encontrarás una amplia variedad de juegos de diferentes géneros y estilos. Desde juegos de aventuras hasta juegos de acción y estrategia, hemos recopilado los mejores juegos disponibles en línea.  y ofrecemos una experiencia de juego inolvidable a todos nuestros usuarios.

Proporcionamos reseñas detalladas y precisas sobre cada uno de los juegos que ofrecemos, para que los usuarios puedan tomar decisiones informadas sobre qué juego comprar o jugar. "</p>
        </div>
      </div>
    );
  }
}

export default Landing;