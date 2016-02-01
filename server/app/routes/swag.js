'use strict';
var router = require('express').Router();
module.exports = router;
var Swag = require('mongoose').models.Swag;

router.get('/', function (req, res, next) {
	console.log("in router")
	Swag.find({})
	.then(function(swags) {
		res.status(200).send(swags);
	})
	.then(null, next);
});