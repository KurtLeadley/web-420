/***********************************
; Title:  api-catalog.js
; Author: Kurt Leadley, Richard Krasso
; Date:   25 November 2019
; Description: API Routes Catalog
***************************************/

//API Routes
var express = require('express');
// require the check token function
var checkToken = require('../check-token');
var router = express.Router();

// require the authentication controller
var auth_controller = require('../controllers/authController');


// POST request for registering a user
router.post('/auth/register', auth_controller.user_register);
// POST request for user log in. Find the user_login function in the authController
router.post('/auth/login', auth_controller.user_login);
// GET request for verifying user tokens
router.get('/auth/token', checkToken, auth_controller.user_token);
// GET request for user log out. Find the user_logout function in the authController
router.get('/auth/logout', auth_controller.user_logout);
// export this router
module.exports = router;
