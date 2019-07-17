const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  contact: Number,
  email: String,
  password: String,
  address: String
},{ collection: 'users'});

module.exports = mongoose.model('User',userSchema);
