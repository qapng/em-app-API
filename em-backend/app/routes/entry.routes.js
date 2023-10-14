const express = require('express');
const entries = require('../controllers/entry.controller.js');

const router = express.Router();

// Retrieve all Users
router.get('/', entries.findAll);

// Retrieve all Users
router.get('/user/:userId', entries.findAllByUserId);

// Create a new User
router.post('/', entries.create);

// Retrieve a single User with id
router.get('/:id', entries.findById);

// Update a User with id
router.put('/:id', entries.update);

// Delete a User with id
router.delete('/:id', entries.delete);

// Delete all Users
router.delete('/', entries.deleteAll);

module.exports = router;
