'use strict';

var passport = require('passport');
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;
module.exports = function (app) {

    var fitbitConfig = app.getValue('env').FITBIT;



    passport.use(new FitbitStrategy({
        clientID:     fitbitConfig.clientID,
        clientSecret: fitbitConfig.clientSecret,
        callbackURL: fitbitConfig.callbackURL
      },
      function (accessToken, refreshToken, profile, done) {
        console.log("THIS IS THE PROFILE YOOOOOOOOO", profile);
        UserModel.findOne({'fitbit.id': profile.id}).exec()
            .then(function (user) {
                if (user) return user;
                else {
                    return UserModel.create({
                        fitbit: {
                            id: profile.id
                        }
                    });
                }
            })
            // .then(function (userFound) {
            //     UserModel.findOneAndUpdate(
            //         {'fitbit.id': userFound.fitbit.id},
            //         {})
            // })
            .then(function (userToLogin) {
                done(null, userToLogin);
            }, function (err, user) {
                console.error('This is a major error');
                done(err);
        });
      }
    ));
    app.get('/auth/fitbit', passport.authenticate('fitbit', { 
        scope: ['activity','heartrate','location','profile'] }
    ));

    app.get( '/auth/fitbit/callback', passport.authenticate( 'fitbit', {
            successRedirect: '/auth/fitbit/success',
            failureRedirect: '/auth/fitbit/failure'
    }));
    // var FitbitClient = require('fitbit-client-oauth2');

    // var client = new FitbitClient(fitbitConfig.clientID, fitbitConfig.clientSecret );
    // var redirect_uri = fitbitConfig.callbackURL;

    // // retrieve previously saved user's token from db or somewhere
    // var tokens = existingUser.fitbitTokens;

    // var options = { /* TIME_SERIES_OPTIONS */ };

    // client.getTimeSeries(tokens, options)
    //     .then(function(res) {
    //         console.log('results: ', res);
    //     }).catch(function(err) {
    //         console.log('error getting user data', err);
    //     });

    // var scope =  [ 'activity', 'nutrition', 'profile', 'settings', 'sleep', 'social', 'weight' ];

    // app.get('/auth/fitbit', function(req, res, next) {

    //     var authorization_uri = client.getAuthorizationUrl(redirect_uri, scope);

    //     res.redirect(authorization_uri);
    // });

    // // If /auth/fitbit/callbac is your redirec_uri

    // app.get('/auth/fitbit/callback', function(req, res, next) {

    //     var code = req.query.code;

    //     client.getToken(code, redirect_uri)
    //         .then(function(token) {

    //             // ... save your token on db or session... 

    //             // then redirect
    //             res.redirect(302, '/user');

    //         })
    //         .catch(function(err) {
    //             // something went wrong.
    //             res.send(500, err);

    //         });

    // });
};