/***********************************
; Title:  check-token.js
; Author: Kurt Leadley, Richard Krasso
; Date:    9 December 2019
; Description: checks for a token in the HTTP request
***************************************/
var jwt = require('jsonwebtoken');
var config = require('./config');
// function to check the HTTP request for a valid token
function checkToken(req, res, next) {
    // get the token from the HTTP GET request
    var token = req.headers['x-access-token'];
    console.log(token);
    // if the token does not exist
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.'});
    // if the token does exist, try to verify
    jwt.verify(token, config.web.secret, function(err, decoded) {
        // if either the token or web secret are bad, throw this error
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'});
        // if it works, assign the id
        req.userId = decoded.id;
        // this next is required because it is asynchronous
        next();
    });
}
// send off checkToken
module.exports = checkToken;
