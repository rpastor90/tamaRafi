'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');

var schema = new Schema({
	name: String,
	category: String,
	price: Number,
	imageUrl: String, 
  height: String,
  width: String,
  left: String,
  top: String,
  userItem: Boolean,
  dockSwag: {
    type: Boolean,
    default: true
  }
});

schema.statics.updateMultiple = function (arr) {
  return Promise.all(
    arr.map(swag => this.findByIdAndUpdate(swag._id, swag, {new: true}))
  );
};

mongoose.model('Swag', schema);