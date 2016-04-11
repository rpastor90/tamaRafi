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
var Swag = Promise.promisifyAll(mongoose.model('Swag'));
var User = Promise.promisifyAll(mongoose.model('User'));


var seedSwag = function () {

    var swags = [
        {
            name: 'cake',
            category: 'food',
            price: 30,
            imageUrl: 'http://i.imgur.com/iJ8LgYn.png'
        },
        {
            name: 'pizza',
            category: 'food',
            price: 20,
            imageUrl: 'http://i.imgur.com/JBmn8pk.png'
        },
        {
            name: 'pancakes',
            category: 'food',
            price: 20,
            imageUrl: 'http://i.imgur.com/jwFGVY4.gif'
        },
        {
            name: 'grilled cheese',
            category: 'food',
            price: 20,
            imageUrl: 'http://i.imgur.com/1Y3mrvS.png'
        },
        {
            name: 'sad ice cream',
            category: 'food',
            price: 10,
            imageUrl: 'http://i.imgur.com/lkp97wZ.png'
        },
        {
            name: 'donut',
            category: 'food',
            price: 15,
            imageUrl: 'http://i.imgur.com/bAidepp.png'
        },
        {
            name: 'sushi',
            category: 'food',
            price: 100,
            imageUrl: 'http://i.imgur.com/PnJQIbf.png'
        },
        {
            name: 'sofa',
            category: 'furniture',
            price: 300,
            imageUrl: 'http://i.imgur.com/PLSFkHR.png'
        },
        {
            name: 'bed',
            category: 'furniture',
            price: 400,
            imageUrl: 'http://i.imgur.com/qWIJy0i.png'
        },
        {
            name: 'porcelain throne',
            category: 'furniture',
            price: 200,
            imageUrl: 'http://i.imgur.com/CPmIUMw.png'
        },
        {
            name: 'table',
            category: 'furniture',
            price: 100,
            imageUrl: 'http://i.imgur.com/DcSkCGa.png'
        },
        {
            name: 'chair',
            category: 'furniture',
            price: 100,
            imageUrl: 'http://i.imgur.com/6ogJ0Tm.png'
        },
        {
            name: 'bookshelf',
            category: 'furniture',
            price: 500,
            imageUrl: 'http://i.imgur.com/KZO3TGJ.jpg'
        },
        {
            name: 'sink',
            category: 'furniture',
            price: 150,
            imageUrl: 'http://i.imgur.com/fk0sG0t.png'
        },
        {
            name: "top hat",
            category: 'random',
            price: 15,
            imageUrl: 'http://i.imgur.com/BSgEGkx.gif'
        },
        {
            name: "tv",
            category: 'random',
            price: 300,
            imageUrl: 'http://i.imgur.com/BIMPm6G.png'
        },
        {
            name: "flowers",
            category: 'random',
            price: 50,
            imageUrl: 'http://i.imgur.com/JjM3nLJ.png'
        },
        {
            name: "disco ball",
            category: 'random',
            price: 500,
            imageUrl: 'http://i.imgur.com/AohKaE3.gif'
        },
        {
            name: "musical taste",
            category: 'random',
            price: 5000,
            imageUrl: 'http://i.imgur.com/Gl6ad4i.gif'
        },
        {
            name: "storm trooper",
            category: 'random',
            price: 2000,
            imageUrl: 'http://i.imgur.com/UNrFL8k.png'
        },
        {
            name: "fireplace",
            category: 'random',
            price: 400,
            imageUrl: 'http://i.imgur.com/zPy330a.gif'
        },
        {
            name: "dragon statue",
            category: 'medieval',
            price: 700,
            imageUrl: 'http://i.imgur.com/zlFg1zz.png'
        },
        {
            name: "chandelier",
            category: 'medieval',
            price: 200,
            imageUrl: 'http://i.imgur.com/KjUm3OM.png'
        },
        {
            name: "potion",
            category: 'medieval',
            price: 50,
            imageUrl: 'http://i.imgur.com/BabvIaH.png'
        },
        {
            name: "sword",
            category: 'medieval',
            price: 100,
            imageUrl: 'http://i.imgur.com/c5mYxyD.png'
        },
        {
            name: "flag",
            category: 'medieval',
            price: 75,
            imageUrl: 'http://i.imgur.com/QpZzjHo.png'
        },
        {
            name: "armor",
            category: 'medieval',
            price: 200,
            imageUrl: 'http://i.imgur.com/10LjElP.png'
        },
        {
            name: 'ham',
            category: 'medieval',
            price: 50,
            imageUrl: 'http://i.imgur.com/eOy8HFn.gif'
        },
        {
            name: "ghost",
            category: 'holiday',
            price: 150,
            imageUrl: 'http://i.imgur.com/oQoKNTM.gif'
        },
        {
            name: "valentine",
            category: 'holiday',
            price: 10,
            imageUrl: 'http://i.imgur.com/BapqvgP.gif'
        },
        {
            name: "pumpkin",
            category: 'holiday',
            price: 40,
            imageUrl: 'http://i.imgur.com/iemoEyM.gif'
        },
        {
            name: "turkey",
            category: 'holiday',
            price: 50,
            imageUrl: 'http://i.imgur.com/kcWhtbQ.gif'
        },
        {
            name: "tree",
            category: 'holiday',
            price: 100,
            imageUrl: 'http://i.imgur.com/bGasKm0.gif'
        },
        {
            name: "stocking",
            category: 'holiday',
            price: 15,
            imageUrl: 'http://i.imgur.com/f1u7K5R.png'
        },
        {
            name: "earth",
            category: 'holiday',
            price: 1500,
            imageUrl: 'http://i.imgur.com/AjECFEN.gif'
        },
        {
            name: 'brick',
            category: 'background',
            price: 10000,
            imageUrl: 'http://i.imgur.com/Hv9Be1e.png'
        },
        {
            name: 'space',
            category: 'background',
            price: 10000,
            imageUrl: 'http://i.imgur.com/cqOaGQe.png'
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
