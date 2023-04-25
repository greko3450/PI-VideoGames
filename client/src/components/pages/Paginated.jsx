import React from "react";
import {NavLink} from "react-router-dom"
import pageStyle from "./Paginated.module.css"
function Paginated({gamesPerPage, totalGames, paginated}) {

 

  let pageNumbers = [];
  for(let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
    pageNumbers.push(i)
  }
  return(
    <div className={pageStyle.pagination}>
    <ul className={pageStyle.listBoton}>
      {pageNumbers.map((number) => (
        <li key={number}>
          <NavLink  onClick={() => paginated(number)} to="#">
            <button className={pageStyle.pageBoton}>{number}</button>
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
)
}

export default Paginated