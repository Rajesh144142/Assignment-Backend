const express = require('express');
const router = express.Router();
const suggestionsServices = require('../services/suggestionsServices'); 

router.get('/', suggestionsServices.getAllSuggestions);
router.post('/', suggestionsServices.createSuggestion);
router.post('/:id/vote', suggestionsServices.upvoteSuggestion);

module.exports = router;
