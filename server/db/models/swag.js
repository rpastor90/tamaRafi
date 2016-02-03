'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	name: String,
	category: String,
	price: Number,
	imageUrl: String,
	posX: Number,
	posY: Number
});

mongoose.model('Swag', schema);