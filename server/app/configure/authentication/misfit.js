'use strict';
var passport = require('passport');
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var MisfitStrategy = require('passport-misfit').Strategy;


module.exports = function (app) {

    var misfitConfig = app.getValue('env').MISFIT;

    passport.use(new MisfitStrategy({
        clientID: misfitConfig.clientID,
        clientSecret: misfitConfig.clientSecret,
        callbackURL: misfitConfig.callbackURL,
        scope: [
            'public',
            'birthday',
            'email'
            ]
        },

    function (accessToken, refreshToken, profile, done) {
        console.log('Got here. Profile :', profile)
        UserModel.findOne({'misfit.id' : profile.id}).exec()

        .then(user => console.log('console user: ', user))
        .then(null, err => console.error(err))
    }))


app.get('/auth/misfit',
  passport.authenticate('misfit'));

app.get('/auth/misfit/callback',
  passport.authenticate('misfit', { failureRedirect: '/auth/fitbit/failure' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
}
