import React, { useEffect, useState  } from "react";
import {useParams, NavLink} from "react-router-dom"
import detalle from "./Detail.module.css"
function Detail() {
  const {idGame} = useParams()
  const [detail, setDetail] = useState("")

  useEffect(() => {
    let gameById = (idGame) => {
      fetch(`http://localhost:3001/videogames/${idGame}`)
      .then(res => res.json())
      .then(data => {setDetail(data)
        console.log(data);
      })

      .catch(error => console.log(error))
    } 
    gameById(idGame)
  }, [idGame])
        
  return(
    <div className={detalle.container}>

    <NavLink to="/videogames">
    <button className={detalle.boton}>Home</button>
    </NavLink>
    {/* <div className={detalle.letter}>{detail.name?.charAt(0).toUpperCase()}</div> */}
    <div className={detalle.text}>
      <h3><strong>Name: </strong> {detail.name}</h3>
      <p><strong>Description: </strong> {detail.description}</p>
      <p><strong>Platforms: </strong> {detail.platforms?.map(plat => plat).join(", ")}</p>
      <p><strong>Genres: </strong> {detail.genres?.map(genre => genre.name).join(", ")}</p>
      <p><strong>Release Date: </strong> {detail.releaseDate}</p>
      <p><strong>Rating: </strong> {detail.rating}</p>
    </div>
    <img className={detalle.image} src={detail.image} alt={detail.name} />
  </div>
  )
}

export default Detail;
    
        
          
          
       

          
       


      