// var CronJob = require('cron').CronJob;
// var mongoose = require('mongoose');
// var UserModel = mongoose.model('User');
// var FitbitClient = require('fitbit-client-oauth2');
// var helper = require('../../app/configure/authentication/helper');
// var fitbitUser = require('../../app/configure/authentication/fitbit');

// // AUTO-UPDATE DB WITH NEW STEPS/SLEEP DATA AT 12AM EVERYDAY
// var dailyUpdate = new CronJob('* * * * * *', function() {
//         // Runs everyday 12:00:00 AM.
//         // console.log("thisis the currentUSER", fitbitUser.currentUser)
//     }, function() {
//         console.log('Database has been updated!');
//     },
//     true, /* Start the job right now */
//     'America/New_York' /* Time zone of this job. */
// );

// module.exports = dailyUpdate;
// //'00 30 03 * * 1-7'