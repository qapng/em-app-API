const express = require("express");

const games = require("../controllers/game.controller.js");
const router = express.Router();

// Create a new game
router.post('/', games.create);

// Update a game with id
router.put('/:id', games.update);

// Delete a game with id
router.delete('/:id', games.delete);

// Retrieve all games
router.get("/", games.findAll);

module.exports = router;
