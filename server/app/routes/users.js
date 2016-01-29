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

router.get('/:userId/sleepTest', function (req, res, next) {
    User.findOne({ _id: req.params.userId })
    .then(function(user) { 
        return helper.getSleepTimeSeries(user.fitbit.tokens, {}, '7d', 'minutesAsleep' )
    })
    .then(function(res) {
        console.log(res, "WE ARE GETTING SLEEP TEST DATA")
    })
})