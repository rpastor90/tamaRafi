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
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },

    function (req, accessToken, refreshToken, profile, done) {
        UserModel.findOne({'jawbone.id': profile.meta.user_xid}).exec()
            .then(function (user) {
                if (user) return user;
                else {
                    return UserModel.create({
                        name: profile.data.first,
                        avatar: 'jawbone.com/' + profile.data.image,
                        jawbone: {
                            id: profile.meta.user_xid,
                            tokens: {
                                access_token: accessToken,
                                refresh_token: refreshToken
                            }
                        }
                    });
                }
            })
            .then(function (userToLogin) {
                done(null, userToLogin);
            }, function (err, user) {
                console.error('This is a major error');
                done(err);
            })
    	}
    ));

    app.get('/auth/jawbone', passport.authorize('jawbone', { 
    	scope : 'move_read' }
    ));

    app.get('/auth/jawbone/callback', passport.authorize('jawbone', {
		scope: ['move_read'],
		failureRedirect: '/auth/jawbone/failure'
	}), function (req, res) {
		res.redirect('/auth/jawbone/success');
		}
	);
};
