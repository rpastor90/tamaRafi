var router = require('express').Router();
var passport = require('passport');

router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/welcome',
	failureRedirect: '/signup',
	failureFlash:true
}));

module.exports = router;