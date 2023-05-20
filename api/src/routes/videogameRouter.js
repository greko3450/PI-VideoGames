const express = require("express");
const {Op} = require("sequelize")
const videogameRouter = express.Router();
const {Videogame, Genre} = require("../db.js")

const { getIdDb, getIdApi, apiName, apiGame} = require("../controler/index.js");


videogameRouter.get("/all", async(req, res) => {
  try {
    let videoGameApi = await apiGame()
    let videoGameDb = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    })
     let videogameAll = [...videoGameApi, ...videoGameDb.map(game => {
            return {
              id: game.id,
              name: game.name,
              description: game.description,
              platforms: game.platforms,
              image: game.image,
              releaseDate: game.releaseDate,
              rating: game.rating,
              genres: game.genres.map(genre => genre.name),
              created: game.created
            }
           })]
    if(videogameAll.length > 0) {
      
      res.status(200).json(videogameAll)
    } else {
      res.status(404).json({message: "video game all not found"})
    }
  } catch (error) {
    res.status(500).json({message: error +"not found"})
  }
})


videogameRouter.get("/:idVideogame", async (req, res) => {
  const { idVideogame } = req.params;

  if (!isNaN(Number(idVideogame))) {
    try {
      const gameData = await getIdApi(idVideogame);
      if (gameData) {
        res.status(200).json(gameData);
      } else {
        res.status(404).json({ message: "Game not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    try {
      const gameData = await getIdDb(idVideogame);
      console.log(gameData);
      if (gameData) {
        res.status(200).json(gameData);
      } else {
        res.status(404).json({ message: "Game not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});
///**********************POR QUERY************************************ */


videogameRouter.get("/", async (req, res) => {
  let { name } = req.query;
  try {
    if (name) {
      // let gamesFromApi = await apiName(name);
      let gamesFromApi = await apiGame(name);
      let gamesFromDb = await Videogame.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        },
        include: {
          model: Genre,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      });
  
      let allGames = [...gamesFromApi, ...gamesFromDb.map(game => {
        return {
          id: game.id,
          name: game.name,
          description: game.description,
          platforms: game.platforms,
          image: game.image,
          releaseDate: game.releaseDate,
          rating: game.rating,
          genres: game.genres.map(genre => genre.name),
          
        }
       })];
      // console.log(allGames);
      
      let matchingGames = allGames.filter(game => game.name.toLowerCase().includes(name.toLowerCase()));
  
      if (matchingGames.length > 0) {
        return res.status(200).json(matchingGames.slice(0, 15));
      } else {
        return res.status(404).json({ message: "No se encontraron juegos con ese nombre" });
      }
       
    } else {
      return res.status(400).json({ message: "Debes proporcionar un nombre de juego" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }

});
///****************************************************** */
videogameRouter.post('/', async (req, res) => {
  const { name, description, platforms, image, releaseDate, rating, created, genres } = req.body;
  try {
    const newVideoGame = await Videogame.create({
      name,
      description,
      platforms,
      image,
      releaseDate,
      rating,
      created
    });
    if (Array.isArray(genres)) {
      let genreInstances = await Promise.all(genres.map(async (genre) => {
        const [genreInstance] = await Genre.findOrCreate({
          where: { name: genre },
          defaults: { name: genre }
        });
        return genreInstance;
      }));
      await newVideoGame.addGenres(genreInstances);
      res.status(200).json(newVideoGame);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});


// videogameRouter.post('/', async (req, res) => {
//   const {name, description, platforms, image, releaseDate, rating, created, genres} = req.body;
//   try {
//     // if (name && description && platforms && image && releaseDate && rating && genres) {
//       const newVideoGame = await Videogame.create({
//         name,
//         description,
//         platforms,
//         image,
//         releaseDate,
//         rating,
//         created
//       });
//       if(Array.isArray(genres)) {
//         let genreInstances = await Promise.all(genres.map(async(genre) => {
//           const [genreInstance] = await Genre.findOrCreate({ where: {name: genre}})
//           return genreInstance
//         } ))
//         await newVideoGame.addGenres(genreInstances)
//         res.status(200).json(newVideoGame)
//       }
    
//   } catch (error) {
//     // console.log(error);
//     res.status(500).send('Internal server error' + error);
//   }
// });

videogameRouter.delete("/:idVideogame", (req, res) => {
  let {idVideogame} = req.params;
  try {
    if(idVideogame) {
    let deletedGame = Videogame.destroy({
      where: {
        id: idVideogame
      }
    })
    res.status(200).json(deletedGame)
  } else {
    res.status(404).json({message: "el id por game no fue borrado"})
  }
  } catch (error) {
    res.status(500).json({message: "error interno de la ruta " + error})
  }
})
  
    

module.exports = videogameRouter;