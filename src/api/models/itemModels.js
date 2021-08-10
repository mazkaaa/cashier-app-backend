const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  quantity: Number,
  price: Number,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Items', ItemSchema);
