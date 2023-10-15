const Word = require('../models/word.model.js');

// retrieve all words
exports.findAll = (req, res) => {
  Word.findAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving words.',
      });
    else res.send(data);
  });
};

// Find all words from learned table given user id
exports.findAllLearnedByUserId = (req, res) => {
  Word.findAllLearnedByUserId(req.params.userId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while retrieving learned words by user id.',
      });
    else res.send(data);
  });
};

// Find all words from words table that is not learned given user id
exports.findAllNotLearnedByUserId = (req, res) => {
  Word.findAllNotLearnedByUserId(req.params.userId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while retrieving not learned words by user id.',
      });
    else res.send(data);
  });
};

// Remove word from learnt table given user id
exports.delete = (req, res) => {
  Word.delete(req.body.userId, req.body.emotionId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found word with userId ${req.params.userId} and emotionId ${req.params.emotionId}.`,
        });
      } else {
        res.status(500).send({
          message:
            'Could not delete word with userId ' +
            req.params.userId +
            'and emotionId' +
            req.params.emotionId,
        });
      }
    } else res.send({ message: `Word was deleted successfully!` });
  });
};

exports.addToLearntTable = (req, res) => {
  Word.addToLearntTable(req.body.userId, req.body.emotionId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found word with userId ${req.params.userId} and emotionId ${req.params.emotionId}.`,
        });
      } else {
        res.status(500).send({
          message:
            'Could not add word with userId ' +
            req.params.userId +
            'and emotionId' +
            req.params.emotionId,
        });
      }
    } else res.send({ message: `Word was added successfully!` });
  });
};
