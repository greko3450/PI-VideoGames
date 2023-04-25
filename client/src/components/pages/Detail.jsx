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
      <h3>Title: {detail.name}</h3>
      <p>description: {detail.description}</p>
      {/* <p>Types of diet. {detail.platforms.map(plat => plat)}</p> */}
      <p>Healthy food level health score. {detail.genres?.map(genre => genre.name)}</p>
      <p>Healthy food level health score. {detail.releaseDate}</p>
      <p>Step by Step. {detail.rating}</p>
    </div>
    <img className={detalle.image} src={detail.image} alt={detail.name} />
  </div>
  )
}

export default Detail;
    
        
          
          
       

          
       


      
