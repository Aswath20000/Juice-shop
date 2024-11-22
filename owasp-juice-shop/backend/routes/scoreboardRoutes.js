const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user's achievements
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ achievements: user.achievements || [] });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ message: 'Error fetching achievements' });
  }
});

// Add an achievement to a user's record
router.post('/:username', async (req, res) => {
  const { achievement } = req.body;
  if (!achievement) {
    return res.status(400).json({ message: 'Achievement is required' });
  }

  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the new achievement to the user's achievements list
    user.achievements.push(achievement);
    await user.save();

    res.json({ message: 'Achievement added successfully' });
  } catch (error) {
    console.error('Error saving achievement:', error);
    res.status(500).json({ message: 'Error saving achievement' });
  }
});

module.exports = router;
