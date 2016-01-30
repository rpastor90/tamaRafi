var router = require('express').Router();
var path = require('path');
var helper = require(path.join(__dirname, '../configure/authentication/helper'));
module.exports = router;

// The following are possibilites for the last argument to the getTimeSeries

// calories  
// steps  
// distance  
// floors  
// elevation  
// minutesSedentary  
// minutesLightlyActive  
// minutesFairlyActive  
// minutesVeryActive  
// activityCalories

// The following are possibilities for the second to last argument
//  1d, 7d, 30d, 1w, 1m, 3m, 6m, 1y, or max.

router.get('/timeseries', function (req, res, next) {
    return helper.getActivityTimeSeries(req.user.fitbit.tokens, {}, '7d', 'minutesFairlyActive' )
    .then(function(res) {
        console.log(res, "WE ARE GETTING ACTIVITY TEST DATA")
    })
})