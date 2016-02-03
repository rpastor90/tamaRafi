'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	name: String,
	category: String,
	price: Number,
	imageUrl: String,
	posX: String,
	posY: String
});

mongoose.model('Swag', schema);