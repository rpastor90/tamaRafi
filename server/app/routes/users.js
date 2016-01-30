'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.models.User;
var path = require('path');
var helper = require(path.join(__dirname, '../configure/authentication/helper'));

router.use('/:userId/sleep', require('./sleep'));
router.use('/:userId/activity', require('./activity'));

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

router.put('/:userId', ensureAuthenticated, function (req, res, next) {
    User.findByIdAndUpdate(req.params.userId, { creature: req.body }, { new: true })
    .then(function (user) {
        console.log("This is the updated user:", user);
        res.status(201).json(user);
    });
});

