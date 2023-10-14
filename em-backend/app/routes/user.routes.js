const express = require('express');
const users = require('../controllers/user.controller.js');

const router = express.Router();

// Create a new User
router.post('/', users.create);

// Retrieve all Users
router.get('/', users.findAll);

// Retrieve a single User with id
router.get('/:id', users.findOne);

router.get('/email/:email', users.findByEmail);

// Update a User with id
router.put('/:id', users.update);

// Delete a User with id
router.delete('/:id', users.delete);

// Delete all Users
router.delete('/', users.deleteAll);

module.exports = router;
