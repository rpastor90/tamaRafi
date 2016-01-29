var assign = require('object-assign');
var request = require('request-promise');
var moment = require('moment');
var path = require('path');
var FitbitClient = require('fitbit-client-oauth2');
var config = require('fitbit-client-oauth2/src/config');
var helper = require('fitbit-client-oauth2/src/helpers');
var fitbitConfig = require(path.join(__dirname, '../../../env')).FITBIT;
var client = new FitbitClient(fitbitConfig.clientID, fitbitConfig.clientSecret);

function buildDailySleepSummaryOptions(options) {
    var uri = config.FITBIT_BASE_API_URL_TOKEN + '/1/user/{userId}/sleep/date/{date}.json';
    options = assign({
        userId: '-',
        date: moment().format('YYYY-MM-DD')
    }, options);
    options.uri = uri.replace('{userId}', options.userId).replace('{date}', options.date);
    return options;
}

function buildDailyActivitySummaryOptions(options) {
    var uri = config.FITBIT_BASE_API_URL_TOKEN + '/1/user/{userId}/activities/date/{date}.json';
    options = assign({
        userId: '-',
        date: moment().format('YYYY-MM-DD'),
        units: 'IMPERIAL'
    }, options);
    options.uri = uri.replace('{userId}', options.userId).replace('{date}', options.date);
    return options;
}

client.getSleepSummary = function(token, options) {
    options = buildDailySleepSummaryOptions(options);
    token = this.createToken(token);
    //TODO: improve this way of getting the token
    options.access_token = token.token.access_token;
    return helper.createRequestPromise(options);
};

client.getDailyActivitySummary = function(token, options) {
    options = helper.buildDailyActivitySummaryOptions(options);
    token = this.createToken(token);
    //TODO: improve this way of getting the token
    options.access_token = token.token.access_token;
    return helper.createRequestPromise(options);
};

module.exports = client;