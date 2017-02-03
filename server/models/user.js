const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define out model
const userSchema = new Schema({
  username: { type: String, unique: true, lowercase: true },
  password: String,
  activation: { type: String, unique: true }
});

//On Save Hook, encrpyt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
  // get access to the user model
  const user = this;

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }
    // hash (encrpyt) our password using the salt
      bcrypt.hash(user.password, salt, null, function(err,hash) {
        if (err) { return next(err); }

        // overwrite plain text password with encrypted password
          user.password = hash;
          next();
      })
  })
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); } 

    callback(null, isMatch);
  });
}
// Create the model class
const ModelClass = mongoose.model('user', userSchema);

//  Export the model
module.exports = ModelClass;
