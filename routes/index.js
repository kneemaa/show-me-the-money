const express = require('express');
const passport = require('passport');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()
const flash = require('connect-flash')

const env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL:
    process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req.user);
  res.render('index.handlebars');
});

router.get('/login', passport.authenticate('auth0', {
  clientID: env.AUTH0_CLIENT_ID,
  domain: env.AUTH0_DOMAIN,
  redirectUri: env.AUTH0_CALLBACK_URL,
  responseType: 'code',
  audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
  scope: 'openid profile'}),
  (req, res) => {
    res.redirect("/");
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/failure'
  }),
  (req, res) => {
    res.redirect(req.session.returnTo || '/user');
  }
);

router.get('/user', ensureLoggedIn, (req, res, next) => {
  res.json({
    user: req.user ,
    userProfile: JSON.stringify(req.user, null, '  ')
  });
});


router.get('/failure', (req, res) => {
  let error = req.flash("error");
  let error_description = req.flash("error_description");
  req.logout();
  res.render('failure', {
    error: error[0],
    error_description: error_description[0],
  });
});

module.exports = router;
