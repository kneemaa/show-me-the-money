/*
module.exports = app => {
	app.get('/', (request, response) => {
		response.render("index")
	})

}*/
const express = require('express');
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();

/* GET user profile. */
router.get('/', ensureLoggedIn, function(req, res, next) {
  res.json({
    user: req.user ,
    userProfile: JSON.stringify(req.user, null, '  ')
  });
});

module.exports = router;
