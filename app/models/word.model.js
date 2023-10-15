const sql = require('../db.js');

// constructor
const Word = function (word) {
  this.name = word.name;
};

Word.findAll = (result) => {
  let query = 'SELECT * FROM emotionlibrary';

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('words: ', res);
    result(null, res);
  });
};

// Find all words from learned table given user id
Word.findAllLearnedByUserId = (userId, result) => {
  let query = `SELECT *
    FROM budgerigar.learned_emotion
    JOIN emotionlibrary ON learned_emotion.emotionId = emotionlibrary.emotionId
    WHERE learned_emotion.userId = ${userId}`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('words: ', res);
    result(null, res);
  });
};

// Find all words from words table that is not learned given user id
Word.findAllNotLearnedByUserId = (userId, result) => {
  let query = `SELECT budgerigar.emotionlibrary.*
        FROM budgerigar.emotionlibrary
        LEFT JOIN learned_emotion ON emotionlibrary.emotionId = learned_emotion.emotionId
        WHERE learned_emotion.userId IS NULL OR learned_emotion.userId !=  ${userId}`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('words: ', res);
    result(null, res);
  });
};

//Remove word from learnt table given user id
Word.delete = (userId, emotionId, result) => {
  sql.query(
    'DELETE FROM learned_emotion WHERE userId = ? and emotionId = ?',
    [userId, emotionId],
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

      console.log(
        'deleted word from learnt table given user id: ',
        userId,
        emotionId,
      );
      result(null, res);
    },
  );
};

Word.addToLearntTable = (userId, emotionId, result) => {
  sql.query(
    'INSERT INTO learned_emotion (userId, emotionId) VALUES (?, ?)',
    [userId, emotionId],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        return;
      }

      console.log('added word: ', { userId, emotionId });
      result(null, { userId, emotionId });
    },
  );
};

Word.addToLearntTable = (userId, emotionId, result) => {
  sql.query(
    'INSERT INTO learned_emotion (userId, emotionId) VALUES (?, ?)',
    [userId, emotionId],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      console.log('added word: ', { userId, emotionId });
      result(null, { userId, emotionId });
    },
  );
};

module.exports = Word;
