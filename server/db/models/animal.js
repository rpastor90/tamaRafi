'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = mongoose.models.User;
var Swag = mongoose.models.Swag;

var schema = new Schema({
    name: {
        type: String,
        unique: true
    },
    species: String,
    xp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    },
    money: {
        type: Number,
        default: 0
    },
    totalSteps: {
        type: Number,
        default: 0
    },
    swags: [{
        type: Schema.Types.ObjectId,
        ref: 'Swag'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Animal'
    }]
});

mongoose.model('Animal', schema);
