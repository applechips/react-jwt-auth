const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define out model
const userSchema = new Schema({
  username: { type: String, unique: true, lowercase: true },
  password: String,
  activation: { type: String, unique: true }
});

//On Save Hook, encrpyt password
userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }
      bcrypt.hash(user.password, salt, null, function(err,hash) {
        if (err) { return next(err); }
          user.password = hash;
          next();
      })
  })
});
// Create the model class
const ModelClass = mongoose.model('user', userSchema);

//  Export the model
module.exports = ModelClass;
