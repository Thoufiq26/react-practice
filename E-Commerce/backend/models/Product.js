const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String } // Stores the path (e.g., "/uploads/image.jpg") or URL
});

module.exports = mongoose.model('Product', productSchema);