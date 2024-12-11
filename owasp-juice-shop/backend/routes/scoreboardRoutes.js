const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.achievements.includes('scoreboard')) {
      user.achievements.push('scoreboard');
      await user.save();
    }
    res.json({ achievements: user.achievements || [] });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ message: 'Error fetching achievements' });
  }
});


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

  
    user.achievements.push(achievement);
    await user.save();

    res.json({ message: 'Achievement added successfully' });
  } catch (error) {
    console.error('Error saving achievement:', error);
    res.status(500).json({ message: 'Error saving achievement' });
  }
});

module.exports = router;
