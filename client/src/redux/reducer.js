import {VIDEO_GAMES_ALL, FILTERED_GENRES, SEARCH_GAMES, SEARCH_ERROR, CREATED_GAMES, SORTED_GAMES, SEARCH_GENRES, CREATE_GAMES, FORM_ERROR} from "./actions.js";
    
const initialState = {
  videoGameAll: [],
  videoGamesByGenreAll: [],
  // sortAll: [],

  errorName: null,
  forGenre: [],
  gameCreate: [],
  errorForm: null
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case VIDEO_GAMES_ALL:
          return {
              ...state,
              videoGameAll: action.payload,
              videoGamesByGenreAll: action.payload,
             
            }
        case FILTERED_GENRES:
          const filteredGenre = [...state.videoGamesByGenreAll];
          const videoGamesByGenre = action.payload === "" ? filteredGenre : filteredGenre.filter(game => game.genres.includes(action.payload));
          return {
            ...state,
            videoGameAll: videoGamesByGenre,
          }
        case CREATED_GAMES:
          const gamesAll = [...state.videoGamesByGenreAll];
          const createdGames = action.payload === "All" ? gamesAll : action.payload === "created" ?  gamesAll.filter(games => games.created) :
          gamesAll.filter(games => !games.created)
          console.log(createdGames);
          return {
             ...state,
             videoGameAll: createdGames
           }
        case SORTED_GAMES:
          const sortAll = [...state.videoGamesByGenreAll];
          const sortedName = action.payload === "ASC" ? sortAll.sort((a, b) => {
            return a.name.toUpperCase() < b.name.toUpperCase() ? -1
          : a.name.toUpperCase() > b.name.toUpperCase() ? 1
          : 0 }) :
            action.payload === "DESC" ? sortAll.sort((a, b) => {
            return a.name.toUpperCase() > b.name.toUpperCase() ? -1
          : a.name.toUpperCase() < b.name.toUpperCase() ? 1 
          : 0 }) : action.payload === "RATING" ? sortAll.sort((a, b) => {
            return a.rating < b.rating ? -1
          : a.rating > b.rating ? 1 
          : 0 }) : sortAll
          
            
          return {
            ...state,
            // videoGameAll: state.videoGamesByGenreAll
            videoGameAll: sortedName 
          }
        case SEARCH_GENRES:
          const  forGenr = action.payload
          console.log(forGenr);
          return {
            ...state,
            forGenre: forGenr
          }
        case SEARCH_GAMES:
          return {
              ...state,
              videoGameAll: action.payload
            }
        case SEARCH_ERROR:
          // const cardsAll = state.videoGamesByGenreAll
          // const filteredError = action.payload ===  "Games encontrado" ? cardsAll : action.payload
          return {
            ...state,
            errorName: action.payload
          }
        case CREATE_GAMES:
          return {
            ...state,
            gameCreate: [...state.videoGamesByGenreAll, action.payload]
          }    
        case FORM_ERROR:
          // const errorData = state.gameCreate
          // const errorFiltered = action.payload === "" ? errorData : action.payload
          return {
            ...state,
            errorForm: action.payload
            
          }
               default: {
                   return state
                 }
             }
           }
  
       
export default reducer;
          
