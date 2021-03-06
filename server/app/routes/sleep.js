var router = require('express').Router();
var path = require('path');
var helper = require(path.join(__dirname, '../configure/authentication/helper'));

module.exports = router;

// NOTE TO PEOPLE WORKING IN THIS USER ROUTE 

// The following are possibilites for the last argument to the getSleepTimeSeries:
// startTime  
// timeInBed  
// minutesAsleep  
// awakeningsCount  
// minutesAwake  
// minutesToFallAsleep  
// minutesAfterWakeup  
// efficiency

// The following are possibilities for the second to last argument of getSleepTimeSeries
// 1d, 7d, 30d, 1w, 1m, 3m, 6m, 1y, or max.

router.get('/timeseries', function (req, res, next) {
    return helper.getSleepTimeSeries(req.user.fitbit.tokens, {}, '7d', 'minutesAsleep' )
    .then(function (sleepData) {
        console.log(sleepData, "THIS IS THE SLEEP DATA");
    })
    .then(null, next);
});

router.post('/timeseries', function (req, res, next) {
    return helper.postSleepLog(req.user.fitbit.tokens, {}, req.body )
    .then(function (sleepData) {
        console.log(sleepData, "THIS IS THE SLEEP DATA");
    })
    .then(null, next);
});

