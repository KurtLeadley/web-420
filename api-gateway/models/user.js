/***********************************
; Title:  user.js
; Author: Kurt Leadley, Richard Krasso
; Date:   25 October 2019
; Description: User model and schema
***************************************/

// Fields username, password, and email
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
 username: String,
 password: String,
 email: String
});
// export this model as User
module.exports = mongoose.model('User', userSchema);
