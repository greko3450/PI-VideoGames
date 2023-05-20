import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { searchGenres } from '../redux/actions';
import buttonStyle from "./Buttons.module.css"
// import {generos} from "./formulario/form.js"

function Buttons(props) {
 
  const dispatch = useDispatch()
  const forGenre = useSelector(state => state.forGenre)
  const { handleGenres, value, handleGames, createdValue, order , handlerSorted} = props;
  
  useEffect(() => {
    dispatch(searchGenres())
  }, [dispatch])

  return (
    <div>
      <label  htmlFor="genres"><strong className={buttonStyle.labelText}>Genres: </strong></label>
      <select className={buttonStyle.botons} id="genres" value={value} onChange={ handleGenres}>
        <option className={buttonStyle.selector} value="">All</option>
        {forGenre.map((genre, index) => (
          <option className={buttonStyle.selector} key={index} value={genre.name} >{genre.name}</option>
        ))}
      </select>

      <label  htmlFor="genres"><strong className={buttonStyle.labelText}> Api And Db: </strong></label>
        <select className={buttonStyle.botons} value={createdValue} onChange={handleGames}>
          <option className={buttonStyle.selector} value="All">All games</option>
          <option className={buttonStyle.selector} value="created">Created</option>
          <option className={buttonStyle.selector} value="Api">Api</option>
        </select>
      
      <label className={buttonStyle.labelText} htmlFor="rating"><strong>For Ordered: </strong></label>
      <select className={buttonStyle.botons}   value={order} onChange={handlerSorted}>
        <option className={buttonStyle.selector} value="ASC">Asc</option>
        <option className={buttonStyle.selector} value="DESC">Desc</option>
        <option className={buttonStyle.selector} value="RATING">For Rating</option>
        <option className={buttonStyle.selector} value="ALL">All</option>
      </select>
      
    </div>
  );
}

export default Buttons;
