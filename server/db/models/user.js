'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var schema = new Schema({
    name: String,
    email: String,
    password: String,
    salt: String,
    avatar: String,
    fitness: String,
    animal: {
        name: String,
        species: String,
        stepsGoal: Number,
        sleepGoal: Number,
        money: {
            type: Number,
            default: 100 // all users start with 100 coins
        },
        picture: String,
        animationForward: String,
        animationBack: String,
        animateStyle: {
            'width': String,
            'height': String,
            'background-image': String
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
        lastLoggedIn: {
            type: Date,
            default: Date.now
        },
        lastLoggedInSteps: {
            type: Number,
            default: 0
        },
        friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        posts: [ 
        {
            text: String,
            author: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
        ]
    },
    fitbit: {
        id: String,
        tokens: {
            access_token: String,
            refresh_token: String
        },
        steps: Number,
        sleep: Number,
        weekSteps: [{
            steps: Number,
            date: String
        }],
        weekSleep: [{
            minutes: Number,
            date: String
        }]
    },
    jawbone: {
        id: String,
        tokens: {
            access_token: String,
            refresh_token: String
        },
        steps: Number,
        sleep: Number,
        weekSteps: [{
            steps: Number,
            date: String
        }],
        weekSleep: [{
            minutes: Number,
            date: String
        }]
    },
    misfit: {
        id: String,
        tokens: {
            access_token: String,
            refresh_token: String
        }
    },
    local: {
        email: String,
        password: String,
        steps: {
            type: Number,
            default: 5000
        },
        sleep: {
            type:Number,
            default: 3600
        },
        weekSteps: [{
            steps: Number,
            date: String
        }],
        weekSleep: [{
            minutes: Number,
            date: String
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
    console.log('in encrypt with:', 'plaintext:',plainText, 'sat:',salt)
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function(next) {
    console.log('In the pre save for user', this, this.isModified('password'))
    if (this.isModified('local.password')) {
        console.log('I am encrypting password!!')
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.local.password, this.salt);
        console.log('new obj', this)
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function(candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);
