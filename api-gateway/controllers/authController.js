/***********************************
; Title:  authController.js
; Author: Kurt Leadley, Richard Krasso
; Date:   November 25, 2019
; Description: Authentication Controller
***************************************/
// require the user model from user.js
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

// Register a new user on POST
exports.user_register = function(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email
    });

    User.add(newUser, (err, user) => {
        if (err)
            return res.status(500).send('There was a problem registering the user.');
        var token = jwt.sign({ id: user._id}, config.web.secret, {
            expiresIn: 86400 // 24 hours
        });
        res.status(200).send({ auth: true, token: token });
    });
};
// Verify token on GET
exports.user_token = function(req, res) {
  // get the userId from the request
  User.getById(req.userId, function(err, user) {
      if (err) return res.status(500).send('There was a problem finding the user.');

      if (!user) return res.status(404).send('No user found.');

      res.status(200).send(user);
  });
};
// user login controller function
exports.user_login = function(req,res) {
  // User.getOne takes two params, the email and the handler function
  User.getOne(req.body.email, function(err,user) {
    if (err) return res.status(500).send("500: Error on Server.");
    if (!user) return res.status(404).send("404: User not found.");
    // compare the typed in pw with the real pw using compareSync
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    // denied!
    if (!passwordIsValid) return res.status(401).send({auth: false, token: null});
    var token = jwt.sign({id: user.id},config.web.secret, {
      expiresIn: 86400 // 24 hour token
    });
    // made it this far? 200, send off the token, set auth to true
    res.status(200).send({auth:true, token:token});
  })
};
// user logout controller function
exports.user_logout = function(req,res) {
  // just set the auth to false and remove the token
  res.status(200).send({auth:false, token:null});
}
