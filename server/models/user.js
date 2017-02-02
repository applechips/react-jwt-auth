const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define out model
const userSchema = new Schema({
  username: { type: String, unique: true, lowercase: true },
  password: String,
  activation: { type: String, unique: true }
});
// Create the model class
const ModelClass = mongoose.model('user', userSchema);

//  Export the model
module.exports = ModelClass;
