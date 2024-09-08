const suggestionsRepo = require('../repository/suggestionsRepository');
const getAllSuggestions = async (req, res) => {
    try {
      const suggestions = await suggestionsRepo.getAllSuggestions();
      res.status(200).json(suggestions);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving suggestions.' });
    }
  };
  
  const createSuggestion = async (req, res) => {
    const { title, description } = req.body;
    try {
      if (!title) {
        return res.status(400).json({ error: 'Title is required.' });
      }
      const id = await suggestionsRepo.createSuggestion(title, description);
      res.status(201).json({ id, title, description,votes:0});
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the suggestion.' });
    }
  };
  
  const upvoteSuggestion = async (req, res) => {
    const { id } = req.params;
    try {
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Suggestion id is not present or invalid' });
      }
      const response = await suggestionsRepo.upvoteSuggestion(id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while upvoting the suggestion.' });
    }
  };
  
  module.exports = {
    getAllSuggestions,
    createSuggestion,
    upvoteSuggestion
  };