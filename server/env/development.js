module.exports = {
  // "DATABASE_URI": "mongodb://admin:password@ds055575.mongolab.com:55575/tamarafi",
  "DATABASE_URI" : "mongodb://localhost:27017/tamarafi",
  "SESSION_SECRET": "Optimus Prime is my real dad",
  "FITBIT": {
    "clientID": "227F6K",
    "clientSecret": "79925cc3fceaf9ad5b7d166459170a24",
    "callbackURL": "http://localhost:1337/auth/fitbit/callback"
  },
  "JAWBONE": {
    "clientID": "F9-zBR_MuBg",
    "clientSecret": "595eccf96717aea8891b0bac761b5bf22017cd2b",
    "callbackURL": "http://localhost:1337/auth/jawbone/callback"
  },
  "MISFIT": {
    "clientID" : "88ODtMCBQUeEvV5O",
    "clientSecret" : "cugXq4w9DXpeHqQJTcWOgfeCyD1cwnYq",
    "callbackURL" : "http://localhost:1337/auth/misfit/callback"
  }
};
