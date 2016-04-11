'use strict';
var passport = require('passport');
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var MisfitStrategy = require('passport-misfit').Strategy;
var Misfit = require('node-misfit');
var authenticatedToken

//below is a a function that we may want to include as a static method
//on the userSchema. It will allow us to make cleaner code for our multiple
// oAuth files. - seth

// function findOrCreate(model, properties) {
//     return model.findOne(properties).exec().then(function(instance){
//         if (instance) return instance; // --> promise for found instance
//     return model.create(properties); // --> promise for created instance
//     });
// }



module.exports = function (app) {

    var misfitConfig = app.getValue('env').MISFIT;


    var misfitHandler = new Misfit({
    clientId: misfitConfig.clientID,
    clientSecret: misfitConfig.clientSecret,
    redirectUri: misfitConfig.callbackURL,
      scope: [
            'public',
            'birthday',
            'email',
            'tracking',
            'sessions',
            'sleeps'
            ]
        });


    passport.use(new MisfitStrategy({
        clientID: misfitConfig.clientID,
        clientSecret: misfitConfig.clientSecret,
        callbackURL: misfitConfig.callbackURL,
        scope: [
            'public',
            'birthday',
            'email',
            'tracking',
            'sessions',
            'sleeps'

            ]
        },

    function (accessToken, refreshToken, profile) {
        console.log('Got here. Profile :', profile)
        authenticatedToken = accessToken
        UserModel.findOne({'misfit.id': profile.userId}).exec() //find user
            .then(user => {
                if(user) return user //if the user already exists, return that user
                else {
                    return UserModel.create({ // if not, create a user with some basic properties
                        username: profile.name,
                        avatar: profile.avatar,
                        animal : { name: 'Marty'},
                        misfit: {
                            id: profile.userId,
                            tokens: {
                                access_token: accessToken,
                                refresh_token: refreshToken
                            }
                        }
                    })
                }
            })

            .then(() => { //get summary is limited to 30 days!!!
                misfitHandler.getSummary(authenticatedToken, '2016-01-01', '2016-01-10', function(err, summary) {
                    console.error('error : ', err)
                    console.log(summary)

                    });
                })
            .then(null, err => console.error(err))
        }));



app.get('/auth/misfit',
  passport.authenticate('misfit'));

app.get('/auth/misfit/callback',

  passport.authenticate('misfit', { failureRedirect: '/auth/misfit/failure' }),
  function(req, res) {


    // Successful authentication, redirect home.
    res.redirect('/');
  });
}
