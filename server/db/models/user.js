'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var schema = new Schema({
    name: String,
    avatar: String,
    animal: {
        name: {
            type: String,
            default: 'Rafi',
            required: true,
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
        money: Number,
        totalSteps: {
            type: Number,
            default: 0
        },
        swags: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'Swag' 
        }],
        friends: [String]
    },
    fitbit: {
        id: String,
        tokens: {
            access_token: String,
            refresh_token: String
        },
        steps: Number,
        sleep: Number
    },
    jawbone: {
        id: String,
        tokens: {
            access_token: String,
            refresh_token: String
        },
        steps: [{
            date: Number,
            steps: Number
        }],
        sleeps: [{
            date: Number,
            sleep: Number
        }]
    }
});


// PASSWORD ENCRYPTION STUFF
// method to remove sensitive information from user objects before sending them out
schema.methods.sanitize = function() {
    return _.omit(this.toJSON(), ['password', 'salt']);
};

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function() {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function(plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function(next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function(candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);
