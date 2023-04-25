import React from "react";
import cardStyle from "./Cards.module.css"
import {Link} from "react-router-dom"

class Card extends React.Component{
  // eslint-disable-next-line
  constructor(props) {
    super(props)
  }
 

  render() {
    let {name, image, genres, rating, idGames} = this.props
    return(
      <div className={cardStyle.container}>
        <div className={cardStyle.divText}>
        <h2 className={cardStyle.text}>{name}</h2>
        </div>
        <Link to={`/videogames/${idGames}`}>
        <img className={cardStyle.img} src={image} alt={name} />
        </Link>
        <div className={cardStyle.genreContainer}>
        {genres?.map((genre, index) => (
          <span className={cardStyle.genre} key={index}>{genre}</span>
          )) }
        </div>  
          {/* <h3>{genres}</h3> */}
        <h3>{rating}</h3>
      
      </div>
    )
  }
}







export default Card
