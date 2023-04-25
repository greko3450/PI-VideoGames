import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { videoGamesAll, filteredGenres , createdGames, sortedGames } from "../redux/actions.js";
import Paginated from "./pages/Paginated.jsx";
import Card from "./Card.jsx";
import Buttons from "./Buttons.jsx";
import cardsStyle from "./Cards.module.css"

function Cards() {
  const dispatch = useDispatch();
  const videoGameAll = useSelector(state => state.videoGameAll);
  
 
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [created, setCreated] = useState("");
  // const [number, setNumber] = useState("");
  const [orderedSort, setOrderedSort] = useState("")
 
  useEffect(() => {
    dispatch(videoGamesAll());
  }, [dispatch]);


  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //*******HANDLERS *****************/
  const handleGenreFilter = (event) => {
    setSelectedGenre(event.target.value);
    dispatch(filteredGenres(event.target.value));
    // setCurrentPage(1)
  };
  
  const handlerCreatedGames = (event) => {
    setCreated(event.target.value)
    dispatch(createdGames(event.target.value))
  }
  
  const handlerSorted= (event) => {
    dispatch(sortedGames(event.target.value))
    setCurrentPage(1)
    setOrderedSort(event.target.value)

  }

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames =  videoGameAll.slice(indexOfFirstGame, indexOfLastGame);

  return (
    <div>
      <div>
        <Buttons 
        handleGenres={handleGenreFilter} 
        value={selectedGenre} 
        handleGames={handlerCreatedGames} 
        createdValue={created}
        order={orderedSort}
        handlerSorted={handlerSorted}

        />
      
      </div>
     
      <div className={cardsStyle.cards}>
        {currentGames?.map(game => {
          const { name, image, genres, rating, id } = game;
          return (
            
              <Card
                key={id}
                name={name}
                image={image}
                genres={genres?.map(genre => genre)}
                rating={rating}
                idGames={id}
              />
            
          );
        })}
      </div>
       <div>
        <Paginated
          gamesPerPage={gamesPerPage}
          totalGames={videoGameAll.length}
          paginated={paginated}
        />
      </div>
      <div>
      </div>
    </div>
  );
}

export default Cards;
 