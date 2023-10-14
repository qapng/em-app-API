const sql = require("../db.js");

// constructor
const Game = function (game) {
  this.gameName = game.gameName;
  this.gameAlias = game.gameAlias;
  this.appstore_link = game.appstore_link;
  this.image = game.image;
  this.max_level = game.max_level;
  this.levels_beaten = game.levels_beaten;
  this.hearts_earned = game.hearts_earned;
  this.seconds_played = game.seconds_played;
};

Game.create = (newGame, result) => {
  const { gameName, gameAlias, appstore_link, image, max_level, levels_beaten, hearts_earned, seconds_played } = newGame;
  sql.query(
    "INSERT INTO game (gameName, gameAlias, appstore_link, image, max_level, levels_beaten, hearts_earned, seconds_played) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [gameName, gameAlias, appstore_link, image, max_level, levels_beaten, hearts_earned, seconds_played],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      console.log('created game: ', { id: res.insertId, ...newGame});
      result(null, { id: res.insertId, ...newGame });
    },
  );
};

Game.updateById = (id, updatedGame, result) => {
  const { gameName, gameAlias, appstore_link, image, max_level, levels_beaten, hearts_earned, seconds_played } = updatedGame;
  sql.query(
    "UPDATE game SET gameName = ?, gameAlias = ?, appstore_link = ?, image = ?, max_level = ?, levels_beaten = ?, hearts_earned = ?, seconds_played = ? WHERE gameId = ?",
    [gameName, gameAlias, appstore_link, image, max_level, levels_beaten, hearts_earned, seconds_played, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('updated game: ', { id: id, ...updatedGame });
      result(null, { id: id, ...updatedGame });
    },
  );
};

Game.remove = (id, result) => {
  sql.query('DELETE FROM game WHERE gameId  = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted game with id: ', id);
    result(null, res);
  });
};

Game.getAll = (result) => {
  let query = "SELECT * FROM game";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("games: ", res);
    result(null, res);
  });
};

module.exports = Game;
