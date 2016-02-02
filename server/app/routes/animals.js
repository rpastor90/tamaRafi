'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.models.User;
var Animal = mongoose.models.Animal;

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.get('/', ensureAuthenticated, function (req, res, next) {
	Animal.find({})
    .then(function (animals) {
        res.status(200).send(animals);
    })
    .then(null, next);
});

router.get('/:animalId', ensureAuthenticated, function (req, res, next) {
	Animal.find({ _id: req.params.animalId })
    .then(function (animal) {
        res.status(200).send(animal);
    })
    .then(null, next);
});

router.post('/', ensureAuthenticated, function (req, res, next) {
    Animal.create(req.body)
    .then(function (animal) {
        res.status(201).json(animal);
    });
});