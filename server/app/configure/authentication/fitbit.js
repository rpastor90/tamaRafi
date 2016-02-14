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
                        fitness: 'fitbit',
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

                helper.getActivityTimeSeries(userToLogin.fitbit.tokens, {}, '7d', 'steps')
                .then(function (data) {
                    var stepsData = data['activities-tracker-steps'];
                    stepsData.forEach(function (day) {
                        var dayData = {};
                        dayData.steps = Number(day.value);
                        var oneDay = day.dateTime.split('-');
                        var year = Number(oneDay[0]);
                        var month = Number(oneDay[1]) - 1;
                        var day = Number(oneDay[2]);
                        dayData.date = new Date(year, month, day);
                        userToLogin.fitbit.weekSteps.push(dayData);
                    })
                    userToLogin.fitbit.weekSteps = userToLogin.fitbit.weekSteps.reverse().slice(0, 7);
                    var todaysSteps = userToLogin.fitbit.weekSteps[0].steps;
                    userToLogin.fitbit.steps = todaysSteps;

                    var currentDate = new Date();
                    // update money only once per day
                    if (userToLogin.animal.lastLoggedIn.getFullYear() !== currentDate.getFullYear() 
                        || userToLogin.animal.lastLoggedIn.getDate() !== currentDate.getDate() 
                        || userToLogin.animal.lastLoggedIn.getMonth() !== currentDate.getMonth()) {
                            userToLogin.animal.lastLoggedIn = currentDate;
                            userToLogin.animal.lastLoggedInSteps = userToLogin.fitbit.steps;
                            userToLogin.animal.totalSteps += userToLogin.fitbit.steps;
                            userToLogin.animal.money += 10;
                    }
                    // update steps every time user logs in for that day
                    if (userToLogin.animal.lastLoggedIn.getFullYear() === currentDate.getFullYear()
                        && userToLogin.animal.lastLoggedIn.getDate() === currentDate.getDate()
                        && userToLogin.animal.lastLoggedIn.getMonth() === currentDate.getMonth()) {
                            if (userToLogin.animal.totalSteps === 0) {
                                userToLogin.animal.totalSteps += userToLogin.fitbit.steps;
                                userToLogin.animal.lastLoggedInSteps = userToLogin.fitbit.steps
                            } else {
                                var newDifference = userToLogin.fitbit.steps - userToLogin.animal.lastLoggedInSteps;
                                userToLogin.animal.lastLoggedInSteps += newDifference;
                                userToLogin.animal.totalSteps += newDifference;
                                userToLogin.animal.money += (newDifference/50);
                            }
                    }

                    userToLogin.save()
                    .then(function (stepsSavedUser) {
                        helper.getSleepTimeSeries(userToLogin.fitbit.tokens, {}, '7d', 'minutesAsleep')
                        .then(function (data) {
                            var sleepData = data['sleep-minutesAsleep'];
                            sleepData.forEach(function (day) {
                                var dayData = {};
                                dayData.minutes = Number(day.value);
                                var oneDay = day.dateTime.split('-');
                                var year = Number(oneDay[0]);
                                var month = Number(oneDay[1]) - 1;
                                var day = Number(oneDay[2]);
                                dayData.date = new Date(year, month, day);
                                stepsSavedUser.fitbit.weekSleep.push(dayData);
                            })
                            stepsSavedUser.fitbit.weekSleep = userToLogin.fitbit.weekSleep.reverse().slice(0, 7);
                            var todaysSleep = stepsSavedUser.fitbit.weekSleep[0].minutes;
                            stepsSavedUser.fitbit.sleep = todaysSleep;
                            return stepsSavedUser.save();
                        })                    
                        .then(function () {
                            console.log('Fitbit user has been updated and saved!')
                        })
                    })
                })
                done(null, userToLogin);
            })
        }, function (err, user) {
            console.error('This is a major error');
            done(err);
        })
    );

    app.get('/auth/fitbit', passport.authenticate('fitbit', {
        scope: ['activity','heartrate','location','profile','sleep','social'] }
    ));

    app.get( '/auth/fitbit/callback', passport.authenticate( 'fitbit', {
        successRedirect: '/welcome',
        failureRedirect: '/auth/fitbit/failure'
    }));

};
