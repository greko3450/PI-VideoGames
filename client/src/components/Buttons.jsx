import React from 'react';

function Buttons(props) {
  const genres = [
    "Action",
    "Adventure",
    "RPG",
    "Shooter",
    "Puzzle",
    "Indie",
    "Platformer",
    "Massively Multiplayer",
    "Sports",
    "Racing",
    "Simulation",
    "Arcade",
    "Casual",
    "Fighting",
    "Strategy",
    "Family"
  ]

  const { handleGenres, value, handleGames, createdValue, order , handlerSorted} = props;
  

  return (
    <div>
      <label htmlFor="genres">Genres:</label>
      <select id="genres" value={value} onChange={ handleGenres}>
        <option value="">All</option>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>{genre}</option>
        ))}
      </select>

      
        <select value={createdValue} onChange={handleGames}>
          <option value="All">All games</option>
          <option value="created">Created</option>
          <option value="Api">Api</option>
        </select>
      
      <label htmlFor="rating">For Ordered
      <select   value={order} onChange={handlerSorted}>
        <option value="ASC">Asc</option>
        <option value="DESC">Desc</option>
        <option value="RATING">For Rating</option>
        <option value="ALL">All</option>
      </select>
      </label>
    </div>
  );
}

export default Buttons;
