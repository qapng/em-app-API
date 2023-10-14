const express = require('express');

const word = require('../controllers/word.controller.js');
const router = express.Router();

// Retrieve all words
router.get('/', word.findAll);

// Find all words from learned table given user id
router.get('/learned/:userId', word.findAllLearnedByUserId);

// Find all words from words table that is not learned given user id
router.get('/notlearned/:userId', word.findAllNotLearnedByUserId);

// Remove word from learnt table given word id and user id
router.delete('/learned', word.delete);

// Add word from not learnt to learnt
router.post('/learned', word.addToLearntTable);

module.exports = router;
