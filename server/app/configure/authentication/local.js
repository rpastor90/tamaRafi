'use strict';
const passport = require('passport');
// const _ = require('lodash');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const faker = require('faker');

//Helper function to generate random week sleep & steps
// data for demo user
 function randomizedWeekData(type) {
    let weekData = [];
    let today = new Date();
    let oneDay = 24*60*60*1000;
    for (let i=0; i<7; i++){
        //calculate date for past seven days
        let dateInMs = today.valueOf() - oneDay*i;
        let date = new Date(dateInMs);
        let datum = { date:date };
        if (type === 'steps') {
            let randomSteps = Math.floor(Math.random() * 19000) + 5000;
            datum.steps = randomSteps
        } else {
            let randomSleeps = Math.floor(Math.random() * 9) + 5;
            datum.minutes = randomSleeps * 60;
        }
        weekData.push(datum)
    }
    console.log('weekDATA:', weekData)
    return weekData;
 }


module.exports = function (app) {

    // When passport.authenticate('local') is used, this function will receive
    // the email and password to run the actual authentication logic.
    var strategyFn = function (name, password, done) {
        console.log('trying to fins user in strategy func local auth', name, password)
        User.findOne({ name: name })
            .then(function (user) {
                console.log("this the user:", user)
                // user.correctPassword is a method from the User schema.
                if (!user || !user.correctPassword(password)) {
                    done(null, false);
                } else {
                    // Properly authenticated.
                    done(null, user);
                }
            }, function (err) {
                done(err);
            });
    };

    passport.use(new LocalStrategy({ usernameField: 'name', passwordField: 'password' }, strategyFn));

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'firstName',
        passwordField: 'password',
        passReqToCallback: true // passes entire request to callback
       
    }, 
    function(req, firstName, password, done) {
        console.log('I am in the callback function after local-signup', firstName, password)
         process.nextTick(function(){
            User.findOne({ 'local.name': firstName })
            .then(user => {
                if (user) return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
                else {
                    var newUser = new User();
                    console.log('In the else')
                    //set local credentials
                    newUser.local.email = faker.internet.email();
                    newUser.local.password = password;
                    newUser.name = firstName;
                    newUser.animal.name = req.body.animalName;
                    newUser.fitness = 'local';

                    newUser.local.weekSteps = randomizedWeekData('steps');
                    newUser.local.weekSleep = randomizedWeekData('sleep');
                    console.log(newUser.weekSteps, 'new user steps')
                    

        //             "weekSteps": [
        //     {
        //         "steps": 7,
        //         "date": "Fri Feb 19 2016 00:00:00 GMT+0000 (UTC)",
        //         "_id": {
        //             "$oid": "56c6a39e4671de03008c8270"
        //         }
        //     },


        // "weekSleep": [
        //     {
        //         "minutes": 0,
        //         "date": "Fri Feb 19 2016 00:00:00 GMT+0000 (UTC)",
        //         "_id": {
        //             "$oid": "56c6a39e4671de03008c8277"
        //         }

                    
                    newUser.save()
                    .then(newUser => {
                        console.log("this is the new USERRRRR!:", newUser)
                        done(null, newUser);
                    })
                    .then(null, (err) => {console.log('the error:',err)})
                }
            })
        })
    }))

    // A POST /login route is created to handle login.
    app.post('/login', function (req, res, next) {
    	console.log('I am in the post login route')
        var authCb = function (err, user) {

            if (err) return next(err);

            if (!user) {
                var error = new Error('Invalid login credentials.');
                error.status = 401;
                return next(error);
            }

            // req.logIn will establish our session.
            req.logIn(user, function (loginErr) {
                if (loginErr) return next(loginErr);
                // We respond with a response object that has user with _id and email.
                res.status(200).send({
                    user: user.sanitize()
                });
            });

        };

        passport.authenticate('local', authCb)(req, res, next);

    });
};
