const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  imageUrls: [String],
  payment: Number,
  productLocation: String,
  userLocation: String,
  region: String,
  requestedTime: String,
  requestedDate: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Request", requestSchema);
