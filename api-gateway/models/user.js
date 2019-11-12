/***********************************
; Title:  user.js
; Author: Kurt Leadley, Richard Krasso
; Date:   11 November 2019
; Description: User model and schema
***************************************/
/**
 Fields username, password, and email
 */
// require mongoose
var mongoose = require('mongoose');
// create our schema
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});
// User will by default become users as a collection in Compass / MongoDB when adding the first entry
const User = module.exports = mongoose.model('User', userSchema);
// save user to db via module.exports.a
module.exports.add = (user, callback) => {
    user.save(callback);
}
// query to get user by id
module.exports.getById = (id, callback) => {
    var query = {_id: id};
    User.findById(query, callback);
}
