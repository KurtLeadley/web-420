/***********************************
; Title:  authController.js
; Author: Kurt Leadley, Richard Krasso
; Date:   25 October 2019
; Description: Authentication Controller
***************************************/
// require the user model from user.js
var User = require('../models/user');
// Register a new user on POST
exports.user_register = function(req, res) {
 res.send('NOT IMPLEMENTED: User registration POST');
};
// Verify token on GET
exports.user_token = function(req, res) {
 res.send('NOT IMPLEMENTED: User token lookup GET');
};
