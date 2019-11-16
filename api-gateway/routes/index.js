/***********************************
; Title:  index.js
; Author: Kurt Leadley, Richard Krasso
; Date:   16 November 2019
; Description: Gets the home page
***************************************/
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express API' });
});

module.exports = router;
