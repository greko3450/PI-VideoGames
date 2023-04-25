import axios from "axios"
export const VIDEO_GAMES_ALL = "VIDEO_GAMES_ALL";
//*************************************************** */
export const SEARCH_GAMES = "SEARCH_GAMES";
export const SEARCH_ERROR = "SEARCH_ERROR";
//******************************************************* */
export const FILTERED_GENRES = "FILTERED_GENRES";
//*************************************************** */
export const CREATED_GAMES = "CREATED_GAMES";
//********************************************* */
export const SORTED_GAMES = "SORTED_GAMES";
//************************************************* */
export const SEARCH_GENRES = "SEARCH_GENRES";
//***************************************************** */
export const CREATE_GAMES = "CREATE_GAMES";
export const FORM_ERROR = "FORM_ERROR";

//********TODOS LOS JUEGOS**********/ 
export const videoGamesAll = () => {
  return async (dispatch) => {
    try {
      let response = await fetch(`http://localhost:3001/videogames/all`)
    let data = await response.json()
    dispatch({
      type: VIDEO_GAMES_ALL,
      payload: data
    })
    } catch (error) {
      console.log("not found ", error.message)
    }
  }
}
/***********************FILTRADOS************* */

export const filteredGenres = (genre) => {
  console.log(genre);
  return {
    type: FILTERED_GENRES,
    payload: genre,
  }
};

export const createdGames = (games) => {
  console.log(games);
  return {
    type: CREATED_GAMES,
    payload: games,
  }
};

export const sortedGames = (name) => {
  return {
    type: SORTED_GAMES,
    payload: name
  }
}



//****BÚSQUEDA POR NOMBRE ******/   
export const searchGames = (name) => {
  return async (dispatch) => {
    try {
       
    const response = await fetch(`http://localhost:3001/videogames?name=${name}`);
    const data = await response.json();
    
      if(data.length > 0) {
        dispatch({
          type: SEARCH_GAMES,
          payload: data
        })
        dispatch({
          type: SEARCH_ERROR,
          payload: "Games encontrado"
        })
      } else {
        dispatch({
          type: SEARCH_ERROR,
          payload: "No Fount Games"
        })
      }
    } catch (error) {
      // console.log(error.message)
      alert("NO HAY NOMBRE  " + error.message)
    }
  }
}

export const createGames = (form) => {
  return async(dispatch) => {
    try {
      
      let response = await axios.post('http://localhost:3001/videogames', form);
      let formData = await response.data;
      if(formData.length) {
        dispatch({
          type: CREATE_GAMES,
          payload: formData   
        })
        dispatch({
          type: FORM_ERROR,
          payload: "Game create"
        })
      } else {
        dispatch({
          type: FORM_ERROR,
          payload: "Game not found"
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
}

//***********SELECIONAR POR GENEROS ********/


export const searchGenres = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/genres`);
      const data = await response.json();
      // console.log(data)
      return dispatch({
        type: SEARCH_GENRES,
        payload: data,
      });
    } catch (err) {
      console.log(err.message);
      alert("Error requesting the data from the API");
    }
  };
};