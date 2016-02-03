'use strict';
var passport = require('passport');
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
// var FitbitClient = require('fitbit-client-oauth2');
var helper = require('./helper');

module.exports = function (app) {

    var fitbitConfig = app.getValue('env').FITBIT;

    passport.use(new FitbitStrategy({
        clientID: fitbitConfig.clientID,
        clientSecret: fitbitConfig.clientSecret,
        callbackURL: fitbitConfig.callbackURL
    },

    function (accessToken, refreshToken, profile, done) {
        UserModel.findOne({'fitbit.id': profile.id}).exec()
            .then(function (user) {
                if (user) return user;
                else {
                    return UserModel.create({
                        name: profile._json.user.fullName,
                        avatar: profile._json.user.avatar,
                        fitbit: {
                            id: profile.id,
                            tokens: {
                                access_token: accessToken,
                                refresh_token: refreshToken
                            }
                        }
                    });
                }
            })
            .then(function (userToLogin) {
                // the tokens may change after a certain amount of time
                // here we are reassigning the refresh and access tokens
                userToLogin.fitbit.tokens.access_token = accessToken;
                userToLogin.fitbit.tokens.refresh_token = refreshToken;
                helper.getDailyActivitySummary(userToLogin.fitbit.tokens, {})
                .then(function (res) {
                    userToLogin.fitbit.steps = res.summary.steps;
                    userToLogin.animal.totalSteps += res.summary.steps;
                    return userToLogin;
                })
                .then(function (userSteps) {
                    return helper.getSleepSummary(userSteps.fitbit.tokens, {})
                    .then(function (userSleep) {
                        userSteps.fitbit.sleep = userSleep.summary.totalMinutesAsleep;
                        return userSteps;
                    });
                })
                .then(function (user) {
                    UserModel.findOneAndUpdate({ _id: user._id }, { fitbit: user.fitbit, animal: user.animal })
                    .then(function () {
                        console.log('User has been saved!');
                    });
                })
                .then(null, function (err) {
                    console.error(err);
                });
                done(null, userToLogin);
            }, function (err) {
                console.error('This is a major error');
                done(err);
        });
    }

    ));

    app.get('/auth/fitbit', passport.authenticate('fitbit', { 
        scope: ['activity','heartrate','location','profile','sleep','social'] }
    ));

    app.get( '/auth/fitbit/callback', passport.authenticate( 'fitbit', {
        successRedirect: '/welcome',
        failureRedirect: '/auth/fitbit/failure'
    }));

};