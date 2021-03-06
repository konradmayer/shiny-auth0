var express = require('express');
var passport = require('passport');
var httpProxy = require('http-proxy');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()
var router = express.Router();

var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/shiny-private/reports/');
});

router.get('/login',
  function(req, res){
    res.render('login', { env: env });
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/shiny-private/login');
});

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/shiny-private/login' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/shiny-private/reports/');
  });


module.exports = router;
