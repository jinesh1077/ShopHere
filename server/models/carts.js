const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  email: String,
  productid: String,
  quantity: Number
},{ collection: 'carts'});

module.exports = mongoose.model('Cart',cartSchema);
