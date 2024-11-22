const mongoose = require('mongoose');

const basketSchema = mongoose.Schema({
  username: { type: String, required: true },
  items: [
    {
      name: String,
      description: String,
      image: String,
    },
  ],
});

module.exports = mongoose.model('Basket', basketSchema);
