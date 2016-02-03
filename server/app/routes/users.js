'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.models.User;
var Swag = mongoose.models.Swag;
var _ = require('lodash');

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
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .then(function (user) {
        res.status(201).json(user);
    });
});

router.get('/:userId/getSwag', function(req, res, next) {
    User.findOne({ _id: req.params.userId })
    .populate('animal.swags')
    .then( user => {
        res.json(user)})
});

router.put('/:userId/getSwag/:swagId', function (req, res, next) {
    if (!req.user) return 'User not found!'
    Swag.findOne({ _id: req.params.swagId })
    .then(function(swag) {
        req.user.animal.swags.push(swag);
        req.user.animal.money = req.user.animal.money - swag.price;
        return req.user.save();
    })
    .then(user => res.send(user))
    .then(null, next)
});

router.put('/:userId/updateCrib', function(req, res, next) {
    User.findOne({ _id: req.params.userId })
    .then(function(user) {
        // Loop trough req.body (an array of position objects)
        for (var i = 0; i< req.body.length; i++) {
            var existingSwag = false;
            // Loop through swagPositions field on user.animal
            for (var j = 0; j< user.animal.swagPositions.length; j++) {
                // If the swag from req.body already exists on user.animal
                if (req.body[i].swag === user.animal.swagPositions[j].swag) {
                    _.assign(user.animal.swagPositions[j], req.body[i]);
                    existingSwag = true;
                };
            };

            // If you've gone through whole loop, add this swag to the user model
            if (!existingSwag){
                user.animal.swagPositions.push(req.body[i]);
            };
        };
        user.save()
        .then(() => {res.send() })
        .then(null, next)
    });       
});







