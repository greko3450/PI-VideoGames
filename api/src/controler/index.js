const axios = require("axios");
const {Op} = require("sequelize")
const {Videogame, Genre} = require("../db");
require("dotenv").config();
const {API_KEY} = process.env

  const getIdApi = async (id) => {
    try {
      const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
      const game = response.data;
      const gameData = {
        id: game.id,
        name: game.name,
        description: game.description.replace(/(<([^>]+)>|\n)/ig, ''),
        platforms: game.platforms.map(pl => pl.platform.name),
        image: game.background_image,
        releaseDate: game.released,
        rating: game.rating,
        genres: game.genres
      };
      return gameData;
    } catch (error) {
      console.log(error);
    }
  };

  let getIdDb = async(id) => {
    try {
 
        const savedGame = await Videogame.findOne({
          where: { id: id },
          include: Genre
          }
        );
        return savedGame

     
      
    } catch (error) {
      console.log(error)
    }
  }

  //****************************************************************************** */
  //   ORIGINALLLLLLLLLLLLLLLLLLLLL
  const apiGame = async() => {
    try {
      let pageApi = 5
      const dataGames = []
      let response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
      for(let i = 0; i < pageApi; i++) {
        const dataGame = await Promise.all(response.data.results.map(game => {
          return {
            id: game.id,
            name: game.name,
            platforms: game.platforms.map(pl => pl.platform.name),
            image: game.background_image,
            releaseDate: game.released,
            rating: game.rating,
            // description: detailData.description,
            genres: game.genres.map(genre => genre.name)
          }
        }))
        // console.log(dataGame);
        dataGames.push(...dataGame)
        response = await axios.get(response.data.next)
      }
      return dataGames
    } catch (error) {
      console.log(error);
    }
  
    }
            

///********************************************************** */
const apiName= async(name) => {
      try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`);
        // console.log(response);
        const gamesName = response.data.results.map(game => {
          return {
            id: game.id,
            name: game.name,
            image: game.background_image,
            genres: game.genres.map(genre => genre.name)
            // platforms: game.platforms.map(pl => pl.platform.name),
            // description: game.description.replace(/(<([^>]+)>|\n)/ig, ''),
          }
        }); 
        return gamesName
        
      } catch (error) {
        console.log(error);
      }
    }

//****************************************************************************************************************************************************** */
const savedGenre = async () => {
  try {
    const data = await apiGame();

    if (data) {
      const saved = [];
      for (let i = 0; i < data.length; i++) {
        try {
          const { genres } = data[i];

          if (Array.isArray(genres)) {
            for (let j = 0; j < genres.length; j++) {
              const existingGenre = await Genre.findOne({ where: { name: genres[j] } });
              if (existingGenre) {
                // console.log(`El género ${genres[j]} ya existe en la base de datos`);
              } else {
                const newGenre = await Genre.create({ name: genres[j] });
                saved.push(newGenre);
              }
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
      return saved;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { apiGame, apiName, getIdDb, getIdApi, savedGenre};

