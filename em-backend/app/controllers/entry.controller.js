const Entry = require('../models/entry.model.js');

// create new entry
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Create a User
  const entry = new Entry({
    emotion: req.body.emotion,
    description: req.body.description,
    userId: req.body.userId,
  });

  // Save User in the database
  Entry.create(entry, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    else res.send(data);
  });
};

// retrieve all entries
exports.findAll = (req, res) => {
  Entry.findAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving entries.',
      });
    else res.send(data);
  });
};

// retrieve all entries given user id
exports.findAllByUserId = (req, res) => {
  Entry.findAllByUserId(req.params.userId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while retrieving entries by user id.',
      });
    else res.send(data);
  });
};

// retrieve entry by id
exports.findById = (req, res) => {
  Entry.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Entry not found with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving entry with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// update an entry
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  console.log(req.body);

  const updatedEntry = {
    emotion: req.body.emotion,
    description: req.body.description,
  };

  Entry.updateById(req.params.id, updatedEntry, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating User with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// delete an entry
exports.delete = (req, res) => {
  Entry.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found entry with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete entry with id ' + req.params.id,
        });
      }
    } else res.send({ message: `Entry was deleted successfully!` });
  });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  Entry.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all Users.',
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};
