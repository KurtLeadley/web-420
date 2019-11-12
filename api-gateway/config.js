/***********************************
; Title:  config.js
; Author: Kurt Leadley, Richard Krasso
; Date:    11 November 2019
; Description: API configuration file
***************************************/
var config = {};
config.web = {};
config.web.secret = 'topsecret';
config.web.port = process.env.PORT || '3000';
// export our configuration
module.exports = config;
