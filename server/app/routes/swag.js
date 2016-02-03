'use strict';
var router = require('express').Router();
module.exports = router;
var Swag = require('mongoose').models.Swag;

router.get('/', function (req, res, next) {
	Swag.find({})
	.then(function(swags) {
		res.status(200).send(swags);
	})
	.then(null, next);
});

router.put('/:swagId', function (req, res, next) {
	Swag.findOneAndUpdate({ _id: req.params.swagId }, req.body, {new:true})
	.then(function(swag) {
		res.send(swag);
	})
	.then(null, next);
});