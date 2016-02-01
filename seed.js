/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Swag = Promise.promisifyAll(mongoose.model('Swag'));


var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.createAsync(users);

};

var seedSwag = function () {

    var swags = [
        {
            name: 'chair',
            category: 'furniture',
            price: 100,
            imageUrl: 'http://www.sheilazellerinteriors.com/wp-content/uploads/2012/01/Eames-Lounge-Chair-and-Stool.png'
        },
        {
            name: 'bed',
            category: 'furniture',
            price: 200,
            imageUrl: 'http://preciousfurnishers.com/wp-content/uploads/2015/07/Bed7.png'
        },
        {
            name: "santa's hat",
            category: 'hat',
            price: 20,
            imageUrl: 'http://orig13.deviantart.net/a201/f/2012/324/5/e/christmas_hat_png_by_xhipstaswift-d5lkmu8.png'
        },
        {
            name: "rocky's hat",
            category: 'hat',
            price: 40,
            imageUrl: 'http://www.cappelleriamelegari.com/images/large/h2/HPIM2554_lrg.jpg'
        }
    ];

    return Swag.createAsync(swags);

}; 

connectToDb.then(function () {
    Swag.findAsync({}).then(function (swags) {
        if (swags.length === 0) {
            return seedSwag();
        } else {
            console.log(chalk.magenta('Swags have been seeded!'));
            process.kill(0);
        }
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
