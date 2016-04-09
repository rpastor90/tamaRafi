'use strict';
var passport = require('passport');
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var JawboneStrategy = require('passport-jawbone').Strategy;

module.exports = function(app) {

    var jawboneConfig = app.getValue('env').JAWBONE;
    
    passport.use(new JawboneStrategy({
        clientID: jawboneConfig.clientID,
        clientSecret: jawboneConfig.clientSecret,
        callbackURL: jawboneConfig.callbackURL,
        passReqToCallback: true
    },

    function (req, accessToken, refreshToken, profile, done) {
        var options = {
            access_token: accessToken,
            client_secret: jawboneConfig.clientSecret
        }

        var up = require('jawbone-up')(options);

        UserModel.findOne({'jawbone.id': profile.meta.user_xid}).exec()
            .then(function (user) {
                if (user) return user;
                else {
                    return UserModel.create({
                        name: profile.data.first + " " + profile.data.last,
                        avatar: 'jawbone.com/' + profile.data.image,
                        fitness: 'jawbone',
                        animal: {
                            lastLoggedIn: new Date()
                        },
                        jawbone: {
                            id: profile.meta.user_xid,
                            tokens: {
                                access_token: accessToken,
                                refresh_token: refreshToken
                            }
                        }
                    })
                    .then(null, function (err) {
                        console.error('this is the errorr', err)
                    });
                }
            })
            .then(function (userToLogin) {
                // the tokens may change after a certain amount of time
                // here we are reassigning the refresh and access tokens
                userToLogin.jawbone.tokens.access_token = accessToken;
                userToLogin.jawbone.tokens.refresh_token = refreshToken;
                
                // var steps;
                userToLogin.jawbone.weekSteps = [];
                up.moves.get({}, function (err, body) {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        var stepsData = JSON.parse(body).data.items.slice(0, 7);
                        stepsData.forEach(function (day) {
                            var dayData = {};
                            dayData.steps = Number(day.title.split(' ')[0].split(',').join(''));
                            var oneDay = day.date.toString();
                            var year = Number(oneDay.slice(0, 4));
                            var month = Number(oneDay.slice(4, 6)) - 1;
                            var dayDate = Number(oneDay.slice(6));
                            dayData.date = new Date(year, month, dayDate);
                            userToLogin.jawbone.weekSteps.push(dayData);
                        })
                        userToLogin.jawbone.weekSteps = userToLogin.jawbone.weekSteps.slice(0, 7);
                        var todaysSteps = userToLogin.jawbone.weekSteps[0].steps;
                        userToLogin.jawbone.steps = todaysSteps;
                    }

                    var currentDate = new Date();

                    // update money only once per day
                    if (userToLogin.animal.lastLoggedIn.getFullYear() !== currentDate.getFullYear() 
                        || userToLogin.animal.lastLoggedIn.getDate() !== currentDate.getDate() 
                        || userToLogin.animal.lastLoggedIn.getMonth() !== currentDate.getMonth()) {
                            userToLogin.animal.lastLoggedIn = currentDate;
                            userToLogin.animal.lastLoggedInSteps = userToLogin.jawbone.steps;
                            userToLogin.animal.totalSteps += userToLogin.jawbone.steps;
                            userToLogin.animal.money += 10;
                    }
                    // update steps every time user logs in for that day
                    if (userToLogin.animal.lastLoggedIn.getFullYear() === currentDate.getFullYear()
                        && userToLogin.animal.lastLoggedIn.getDate() === currentDate.getDate()
                        && userToLogin.animal.lastLoggedIn.getMonth() === currentDate.getMonth()) {
                            // first time login 
                            if (userToLogin.animal.totalSteps === 0) {
                                userToLogin.animal.totalSteps += userToLogin.jawbone.steps;
                                userToLogin.animal.lastLoggedInSteps = userToLogin.jawbone.steps
                            } else {
                                var newDifference = userToLogin.jawbone.steps - userToLogin.animal.lastLoggedInSteps;
                                userToLogin.animal.lastLoggedInSteps += newDifference;
                                userToLogin.animal.totalSteps += newDifference;
                                userToLogin.animal.money += (newDifference/50);
                            }
                    }
                    
                    userToLogin.save()
                    .then(function (stepsSavedUser) {
                        stepsSavedUser.jawbone.weekSleep = [];
                        up.sleeps.get({}, function (err, body) {
                            if (err) {
                                console.log('Error: ', err);
                            } else {
                                var sleepData = JSON.parse(body).data.items.slice(0, 7);
                                sleepData.forEach(function (day) {
                                    var dayData = {};
                                    var sleep = day.title.split(' ');
                                    var hours = Number(sleep[1].slice(0, -1)) * 60;
                                    var minutes = Number(sleep[2].slice(0, -1));
                                    dayData.minutes = (hours + minutes);
                                    var oneDay = day.date.toString();
                                    var year = Number(oneDay.slice(0, 4));
                                    var month = Number(oneDay.slice(4, 6)) - 1;
                                    var dayDate = Number(oneDay.slice(6));
                                    dayData.date = new Date(year, month, dayDate);
                                    stepsSavedUser.jawbone.weekSleep.push(dayData);
                                })
                                stepsSavedUser.jawbone.weekSleep = userToLogin.jawbone.weekSleep.slice(0, 7);
                                var todaysSleep = stepsSavedUser.jawbone.weekSleep[0].minutes;
                                stepsSavedUser.jawbone.sleep = todaysSleep;
                                return stepsSavedUser.save();
                            }
                        })
                        .then(function (hi) {
                            console.log('Jawbone user has been updated and saved!', hi)
                        })
                    })
                    done(null, userToLogin);
                })
            })
        }, function (err) {
            console.error('This is a major error');
            done(err);
        })
    );

    app.get('/auth/jawbone', passport.authenticate('jawbone',
        { scope: 'move_read sleep_read' }
    ));

    app.get( '/auth/jawbone/callback', passport.authenticate( 'jawbone', {
        successRedirect: '/welcome',
        failureRedirect: '/auth/fitbit/failure'
    }));
};