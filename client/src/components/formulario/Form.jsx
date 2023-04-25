import React, {useState,useEffect} from "react";

import { useDispatch, useSelector } from "react-redux";
import {createGames, searchGenres } from "../../redux/actions.js"
import {platforms} from "./form.js"


function Form() {
  const dispatch = useDispatch()
  const forGenre = useSelector(state => state.forGenre)

  console.log(forGenre);
  // const [genres, ]
  const errorForm = useSelector(state  => state.errorForm)
  const [form, setForm] = useState({
    name: "",
    description: "",
    platforms: [],
    image: "",
    releaseDate: "",
    rating: 0,
    genres: []
  })
  const [error, setError] = useState({
    name: "",
    description: "",
    platforms: [],
    image: "",
    releaseDate: "",
    rating: 0,
    genres: []
  })

  useEffect(() => {
    
    dispatch(searchGenres())
  }, [dispatch])
  let errorValidate = () => {
    
    
    if (/^[a-zA-Z ]+$/.test(form.name)) {
      setError({
        ...error,
        name:  ""
      })      
    } else {
      setError({
        ...error,
        name: "Solo se permiten letras en este campo."
      })      
    }
     
  
    // if(/^\d{4}-\d{2}-\d{2}$/.test(form.releaseDate)) {
    //   error.releaseDate = "";
    // } else {
    //   error.releaseDate = "Ingresa una fecha valida YYYY-MM-DD";
    // }
  
    // if(form.rating < 0 && form.rating > 5) {
    //   error.rating = "Ingresa un número de 0 a 5";
    // }
  
    // setError(error);
  }

  let handleOnchange = (event) => {
    event.target.name === "platforms" ?
    setForm({
      ...form,
      platforms:[...form.platforms, event.target.value]
    })
    : event.target.name === "genres" ?
    setForm({
      ...form,
      genres:[...form.genres, event.target.value]
    })
    : setForm({
      ...form,
        [event.target.name]: event.target.value
      })
      errorValidate()
      
  };


  let handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createGames(form))
    resetForm()
  }

  // let handleGenre = () => {
    
  // }
const resetForm = () => {
  setForm({
    name: "",
    description: "",
    platforms: [],
    image: "",
    releaseDate: "",
    rating: 0,
    genres: []
  })
}


  return(
    <div>
      <form onSubmit={handleSubmit}>
      <label htmlFor="name" >name
        <input type="text" id="name" name="name" value={form.name} onChange={handleOnchange} placeholder="by name"/>
      {error.name && <p>{error.name}</p> }
      </label>
      <label htmlFor="description">description
        <input type="text" id="description" name="description" value={form.description} onChange={handleOnchange} />
      </label>
    
      <label htmlFor="platforms">platforms
          <select name="platforms" id="platforms"   onChange={handleOnchange}  >
            {platforms.map((platform, index) => (
              <option value={platform} key={index}>
                {platform}
              </option>
            ))}
          </select>
        </label>

      <label htmlFor="image">image
        <input type="url" id="image" name="image" value={form.image} onChange={handleOnchange} />
      </label>

      <label htmlFor="releaseDate">releaseDate
        <input type="date" id="releaseDate" name="releaseDate" value={form.releaseDate} onChange={handleOnchange} />
        {/* {error.releaseDate && <p>{error.releaseDate}</p> } */}
      </label>
      
      <label htmlFor="rating">rating
        <input type="text" id="rating" name="rating" value={form.rating} onChange={handleOnchange} />
        {/* {error.rating && <p>{error.rating}</p> } */}
      </label>
        
        <label htmlFor="genres">genres
          <select name="genres" id="genres"   onChange={handleOnchange}  >
            {forGenre.map((genre, index) => (
              <option value={genre.name} key={index}>
                {genre.name}
              </option>
            ))}
          </select>
        </label>
     
     <button type="submit">crear Receta</button>
          {/* {errorCreate !== "" ? <p>{errorCreate}</p> : ""} */}
          {errorForm && <p>{errorForm}</p>}
          {<p>{form.genres.map(genre => genre + ", " )}</p>}
          {<p>{form.platforms.map(platform => platform + ", " )}</p>}
      </form>
    </div> 
  )
}

export default Form;