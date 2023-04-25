const express = require("express");
const genreRouter = express.Router()
const {savedGenre} = require("../controler/index.js")
const { Genre } = require("../db.js")
savedGenre()


genreRouter.get("/", async(req, res) => {
  try {
    let genreAll = await Genre.findAll()
  if (genreAll) {
    res.status(200).json(genreAll);
  } else {
    res.status(404).json({message: "genre not found"})
  }
  } catch (error) {
    res.status(500).json({message: "Error al buscar géneros en la base de datos.", details: error.message})
  }
  
})
module.exports = genreRouter