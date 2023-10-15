const Game = require("../models/game.model.js");

// create new game
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Create a game
  const game = new Game({
    gameName : req.body.gameName,
    gameAlias : req.body.gameAlias,
    appstore_link : req.body.appstore_link,
    image : req.body.image,
    max_level : req.body.max_level,
    levels_beaten : req.body.levels_beaten,
    hearts_earned : req.body.hearts_earned,
    seconds_played : req.body.seconds_played
  });

  // Save game in the database
  Game.create(game, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    else res.send(data);
  });
};

// update an game
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  console.log(req.body);

  const updatedGame = {
    gameName : req.body.gameName,
    gameAlias : req.body.gameAlias,
    appstore_link : req.body.appstore_link,
    image : req.body.image,
    max_level : req.body.max_level,
    levels_beaten : req.body.levels_beaten,
    hearts_earned : req.body.hearts_earned,
    seconds_played : req.body.seconds_played
  };

  Game.updateById(req.params.id, updatedGame, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Game with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating Game with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// delete an game
exports.delete = (req, res) => {
  Game.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found game with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete game with id ' + req.params.id,
        });
      }
    } else res.send({ message: `Game was deleted successfully!` });
  });
};

exports.findAll = (req, res) => {
  Game.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving games.",
      });
    else res.send(data);
  });
};
