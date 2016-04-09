'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	name: String,
	category: String,
	price: Number,
	imageUrl: String, 
  height: String,
  width: String,
  left: String,
  top: String
});

mongoose.model('Swag', schema);