const express = require('express');
const Basket = require('../models/Basket');
const router = express.Router();

// Add Item to Basket
router.post('/:username', async (req, res) => {
  const { name, description, image } = req.body;

  if (!name || !description || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    let basket = await Basket.findOne({ username: req.params.username });

    if (!basket) {
      basket = new Basket({ username: req.params.username, items: [] });
    }

    basket.items.push({ name, description, image });
    await basket.save();

    res.json({ message: `${name} added to your basket` });
  } catch (error) {
    console.error('Error adding item to basket:', error);
    res.status(500).json({ message: 'Error adding item to basket', error });
  }
});

// Get Basket
router.get('/:username', async (req, res) => {
  try {
    const basket = await Basket.findOne({ username: req.params.username });
    res.json(basket || { items: [] });
  } catch (error) {
    console.error('Error fetching basket:', error);
    res.status(500).json({ message: 'Error fetching basket', error });
  }
});

module.exports = router;
