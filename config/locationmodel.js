const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: String,
  facilities: [String],
  rating: Number
});

module.exports = mongoose.model('locations', locationSchema);