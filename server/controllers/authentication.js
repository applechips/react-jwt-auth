const User = require('../models/user');

exports.signup = function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const activation = req.body.activation;
  console.log(username, password, activation);
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
      res.json({ success: true });
    });
  });

  // respond to request indicating the user was created
}
