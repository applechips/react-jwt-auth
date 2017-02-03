const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // User already had their username, password & activation code auth'd
  // We just need to give them a token
}

exports.signup = function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const activation = req.body.activation;
  console.log(username, password, activation);

  if (!username || !password || !activation) {
    return res.status(422).send({ error: 'You must provide username, password, and activation code'});
  }
  // see if a user with given username exists
  User.findOne({ username: username }, function(err, existingUser) {
     if (err) { return next(err); }
     console.log(existingUser);
     // if username already exists, return error
    if (existingUser) {
      return res.status(422).send({ error: 'Username in use' });
    }
    // if username does not exist. create and save user record.
    const user = new User({
      username: username,
      password: password,
      activation: activation
    });

    user.save(function(err) {
      if (err) { return next(err); }
      // respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });

}
