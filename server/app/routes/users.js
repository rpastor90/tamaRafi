'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.models.User;

var http = require('http');

router.get('/', function (req, res, next) {
	User.find({})
    .then(function (users) {
        res.status(200).send(users);
    })
    .then(null, next);
});

router.get('/:userId', function (req, res, next) {
	User.find({ _id: req.params.userId })
    .then(function (user) {
        res.status(200).send(user);
    })
    .then(null, next);
});