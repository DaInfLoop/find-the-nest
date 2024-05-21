const express = require('express');
require('dotenv').config()

const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');

const app = express();

passport.use('nest', new OAuth2Strategy({
    authorizationURL: 'https://oauth.hackclub.app/oauth2/authorize',
    tokenURL: 'https://oauth.hackclub.app/oauth2/token',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://findthenest.haroon.hackclub.app/"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken, refreshToken, profile)
    cb(null, {})
  }
));

app.use(passport.initialize())

app.get('/', passport.authenticate('nest'), (req, res) => {
    res.json({ ok: true })
})

app.listen(50353)