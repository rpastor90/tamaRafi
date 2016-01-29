'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.models.User;
var path = require('path');
var helper = require(path.join(__dirname, '../configure/authentication/helper'));

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.get('/', ensureAuthenticated, function (req, res, next) {
	User.find({})
    .then(function (users) {
        res.status(200).send(users);
    })
    .then(null, next);
});

router.get('/:userId', ensureAuthenticated, function (req, res, next) {
	User.find({ _id: req.params.userId })
    .then(function (user) {
        res.status(200).send(user);
    })
    .then(null, next);
});


// NOTE TO PEOPLE WORKING IN THIS USER ROUTE 

// The following are possibilites for the last argument to the getSleepTimeSeries:
// startTime  
// timeInBed  
// minutesAsleep  
// awakeningsCount  
// minutesAwake  
// minutesToFallAsleep  
// minutesAfterWakeup  
// efficiency

// The following are possibilities for the second to last argument of getSleepTimeSeries
// 1d, 7d, 30d, 1w, 1m, 3m, 6m, 1y, or max.

router.get('/:userId/sleepTest', function (req, res, next) {
    User.findOne({ _id: req.params.userId })
    .then(function(user) { 
        return helper.getSleepTimeSeries(user.fitbit.tokens, {}, '7d', 'minutesAsleep' )
    })
    .then(function(res) {
        console.log(res, "WE ARE GETTING SLEEP TEST DATA")
    })
})


// The following are possibilites for the last argument to the getTimeSeries

// calories  
// steps  
// distance  
// floors  
// elevation  
// minutesSedentary  
// minutesLightlyActive  
// minutesFairlyActive  
// minutesVeryActive  
// activityCalories

// The following are possibilities for the second to last argument
//  1d, 7d, 30d, 1w, 1m, 3m, 6m, 1y, or max.

router.get('/:userId/activityTimeSeriesTest', function (req, res, next) {
    console.log("in the activity route")
    User.findOne({ _id: req.params.userId })
    .then(function(user) { 
        return helper.getActivityTimeSeries(user.fitbit.tokens, {}, '7d', 'minutesFairlyActive' )
    })
    .then(function(res) {
        console.log(res, "WE ARE GETTING ACTIVITY TEST DATA")
    })
})


router.put('/:userId', ensureAuthenticated, function (req, res, next) {
    User.findByIdAndUpdate(req.params.userId, { creature: req.body }, { new: true })
    .then(function (user) {
        console.log("This is the updated user:", user);
        res.status(201).json(user);
    });
});

