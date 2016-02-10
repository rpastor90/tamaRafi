/*
    These environment variables are not hardcoded so as not to put
    production information in a repo. They should be set in your
    heroku (or whatever VPS used) configuration to be set in the
    applications environment, along with NODE_ENV=production

 */

module.exports = {
    "DATABASE_URI": process.env.MONGOLAB_URI,
    "SESSION_SECRET": process.env.SESSION_SECRET,
    "FITBIT": {
        "clientID": process.env.FITBIT_CLIENT_ID,
        "clientSecret": process.env.FITBIT_CLIENT_SECRET,
        "callbackURL": process.env.FITBIT_CALLBACK_URL 
    },
    "JAWBONE": {
        "clientID": process.env.JAWBONE_CLIENT_ID,
        "clientSecret": process.env.JAWBONE_CLIENT_SECRET,
        "callbackURL": process.env.JAWBONE_CALLBACK_URL 
    },
    "MISFIT": {
        "clientID": process.env.MISFIT_CLIENT_ID,
        "clientSecret": process.env.MISFIT_CLIENT_SECRET,
        "callbackURL": process.env.MISFIT_CALLBACK_URL 
    }
};