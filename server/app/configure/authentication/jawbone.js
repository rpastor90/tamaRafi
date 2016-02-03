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
                up.moves.get({}, function (err, body) {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        var steps = JSON.parse(body).data.items;
                        steps = steps[0].title.split(' ')[0].split(',').join('')
                    }
                    userToLogin.jawbone.steps = steps;
                    userToLogin.animal.totalSteps += steps;
                    userToLogin.save()
                    .then(function (stepsSavedUser) {
                        up.sleeps.get({}, function (err, body) {
                            if (err) {
                                console.log('Error: ', err);
                            } else {
                                var sleep = JSON.parse(body).data.items[0];
                                var hours = Number(sleep.title.split(' ')[1].slice(0, -1))*60;
                                var minutes = Number(sleep.title.split(' ')[2].slice(0, -1));
                                sleep = (hours + minutes);
                            }
                            stepsSavedUser.jawbone.sleep = sleep;
                            stepsSavedUser.save()
                            .then(function () {
                                console.log('Jawbone user has been updated and saved!')
                            });
                        })
                    })
                    done(null, userToLogin);
                })
            })
        }, function (err, user) {
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
