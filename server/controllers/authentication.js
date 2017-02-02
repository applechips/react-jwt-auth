exports.signup = function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const activation = req.body.activation;

  // See if a user with a given email exists
  User.findOne({ user: user }, function(err, existingUser) {
    
  })
  //  If a user with email does exist, return an error

  // If a user with email does NOT, create and save user record

  // Respond to request indicating the user was created
}
