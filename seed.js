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

var seedSwag = function () {

    var swags = [
        {
            name: 'cake',
            category: 'food',
            price: 30,
            imageUrl: 'http://orig06.deviantart.net/1e60/f/2013/049/6/d/strawberry_shortcake_pixel_art_by_karisean-d5vep9n.png'
        },
        {
            name: 'pizza',
            category: 'food',
            price: 20,
            imageUrl: 'http://41.media.tumblr.com/tumblr_mawmdsMrnf1rsfae9o1_500.png'
        },
        {
            name: 'pancakes',
            category: 'food',
            price: 20,
            imageUrl: 'https://31.media.tumblr.com/9b7d8861d8d4bc98ee2136ef3d4bb4e0/tumblr_inline_neeb3oM1Y41sc17cx.gif'
        },
        {
            name: 'sofa',
            category: 'furniture',
            price: 200,
            imageUrl: 'http://orig08.deviantart.net/7206/f/2013/297/4/3/pixel_couch_by_captaintoog-d6a4jzo.png'
        },
        {
            name: 'bed',
            category: 'furniture',
            price: 500,
            imageUrl: 'http://40.media.tumblr.com/c72c5681278fb5cacacd58047007590a/tumblr_njxcsc0C7I1r7ueqyo1_400.png'
        },
        {
            name: 'table',
            category: 'furniture',
            price: 100,
            imageUrl: 'http://piq.codeus.net/static/media/userpics/piq_26370_400x400.png'
        },
        {
            name: "santa's hat",
            category: 'hat',
            price: 20,
            imageUrl: 'http://piq.codeus.net/static/media/userpics/piq_18109_400x400.png'
        },
        {
            name: "mario's hat",
            category: 'hat',
            price: 40,
            imageUrl: 'http://piq.codeus.net/static/media/userpics/piq_39920_400x400.png'
        },
        {
            name: "top hat",
            category: 'hat',
            price: 15,
            imageUrl: 'http://pixelartmaker.com/art/2ab246e020409fc.png'
        },
        {
            name: "tv",
            category: 'random',
            price: 300,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Pixelart-tv-iso-2.png'
        },
        {
            name: "pc",
            category: 'random',
            price: 500,
            imageUrl: 'http://orig12.deviantart.net/6950/f/2012/224/b/e/tumbln_all_day_by_samblye1-d5augsh.png'
        },
        {
            name: "flower",
            category: 'random',
            price: 10,
            imageUrl: 'http://4.bp.blogspot.com/-wV7ycgn04kU/US-3RFqJZSI/AAAAAAAAE7k/EJrEh7-EgqM/s1600/flower_pixelart3.png'
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
