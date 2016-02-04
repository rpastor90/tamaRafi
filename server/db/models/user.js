'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
// var Animal = mongoose.models.Animal;

var schema = new Schema({
    name: String,
    avatar: String,
    animal: {
        name: String,
        species: String,
        money: {
            type: Number,
            default: 100
        },
        totalSteps: {
            type: Number,
            default: 0
        },
        swags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Swag'
        }],
        swagPositions: [{
            swag: String,
            posX: String,
            posY: String
        }],
        swagSizes: [{
            swag: String,
            height: String,
            width: String
        }],
        lastLoggedIn: Date,
        lastLoggedInSteps: {
            type: Number,
            default: 0
        }
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
        steps: Number,
        sleep: Number
    },
    misfit: {
        id: String,
        tokens: {
            access_token: String,
            refresh_token: String
        }
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
