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
          <h1>************PIVideogames*****************</h1>
          <p>""</p>
        </div>
      </div>
    );
  }
}

export default Landing;