var assign = require('object-assign');
var request = require('request-promise');
var moment = require('moment');
var path = require('path');
var FitbitClient = require('fitbit-client-oauth2');
var config = require('fitbit-client-oauth2/src/config');
var helper = require('fitbit-client-oauth2/src/helpers');
var fitbitConfig = require(path.join(__dirname, '../../../env')).FITBIT;
var client = new FitbitClient(fitbitConfig.clientID, fitbitConfig.clientSecret);

//This method creates requests using request-promise library
function createRequestPromise(options, method, body) {
   

  var acceptLanguage = options.units === 'METRIC' ? 'es_ES' : 'en_US';
  options = assign({
    url: options.uri ,
    method: method,
    // json:true,
    headers: {
      Authorization: 'Bearer ' + options.access_token,
      'Accept-Language': acceptLanguage
    }
  }, options);

  if (body) options.form = body;


  delete options.units;

  return request(options).then(function(res) {
   
    if (options.resourcePath) {
      res.requestedResource = options.resourcePath.replace('/', '-');
    }
    return res;
  }).then(null, function(error) {
    console.error(error)
  })
}


// The following are just helper functions:

function buildDailySleepSummaryOptions(options) {
    var uri = config.FITBIT_BASE_API_URL_TOKEN + '/1/user/{userId}/sleep/date/{date}.json';
    options = assign({
        userId: '-',
        date: moment().format('YYYY-MM-DD')
    }, options);
    options.uri = uri.replace('{userId}', options.userId).replace('{date}', options.date);
    return options;
}

function buildSleepTimeSeriesOptions(options, period, typeOfData) {
    var uri = config.FITBIT_BASE_API_URL_TOKEN + '/1/user/{userId}/{resource-path}/date/{date}/{period}.json';
    options = assign({
        userId: '-',
        resourcePath: 'sleep/' + typeOfData, 
        date: moment().format('YYYY-MM-DD'),
        period: period
    }, options);
    //I AM HERE
    options.uri = uri.replace('{userId}', options.userId).replace('{resource-path}', options.resourcePath).replace('{date}', options.date).replace('{period}', options.period);
    return options;
}

function buildSleepLogOptions(options) {
    var uri = config.FITBIT_BASE_API_URL_TOKEN + '/1/user/{userId}/sleep.json';
    options = assign({
        userId: '-'
    }, options);
    options.uri = uri.replace('{userId}', options.userId);
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

function buildTimeSeriesOptions(options, period, typeOfData) {
  var url = config.FITBIT_BASE_API_URL_TOKEN + '/1/user/{userId}/{resourcePath}/date/{baseDate}/{period}.json';

  options = assign({
    userId: '-',
    resourcePath: 'activities/tracker/' + typeOfData,
    baseDate: 'today',
    period: period,
    units: 'IMPERIAL'
  }, options);

  options.url = url.replace('{userId}', options.userId)
    .replace('{resourcePath}', options.resourcePath)
    .replace('{baseDate}', options.baseDate)
    .replace('{period}', options.period);

  return options;
}

// This function gets a summary of one night of sleep
client.getSleepSummary = function(token, options) {
    options = buildDailySleepSummaryOptions(options);
    token = this.createToken(token);
    //TODO: improve this way of getting the token
    options.access_token = token.token.access_token;
    return createRequestPromise(options);
};

// The following gets a summary of specific sleep data (see router/user.js) for a specified period
client.getSleepTimeSeries = function(token, options, periodOfTime, typeOfData) {
    console.log("in sleep time series function")
    options = buildSleepTimeSeriesOptions(options, periodOfTime, typeOfData); 
    token = this.createToken(token);
    options.access_token = token.token.access_token;
    return createRequestPromise(options, 'GET')    
};

client.postSleepLog = function(token, options, body) {
    
    options = buildSleepLogOptions(options);
    token = this.createToken(token);
    options.access_token = token.token.access_token;
    return createRequestPromise(options, 'POST', body)
}
// This function gets a summary of one day's activity

client.getDailyActivitySummary = function(token, options) {
    options = helper.buildDailyActivitySummaryOptions(options);
    token = this.createToken(token);
    //TODO: improve this way of getting the token
    options.access_token = token.token.access_token;
    return createRequestPromise(options);
};


// This function gets a summary of a specific activity data (see routes/user.js) for a specified period of time
client.getActivityTimeSeries = function(token, options, periodOfTime, typeOfData) {
    
    options = buildTimeSeriesOptions(options, periodOfTime, typeOfData);
    token = this.createToken(token);
    options.access_token = token.token.access_token;
    return createRequestPromise(options, 'GET');

};

module.exports = client;


