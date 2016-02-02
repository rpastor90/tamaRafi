'use strict';
var router = require('express').Router();
module.exports = router;

console.log("in index")
router.use('/users', require('./users'));
router.use('/swag', require('./swag'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
