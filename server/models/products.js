const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  brand: String,
  category: String,
  sub_category: String,
  gender: String,
  image: { data: Buffer, contentType: String },
  price: Number,
  description: String
},{ collection: 'products'});

module.exports = mongoose.model('Product',productSchema);
