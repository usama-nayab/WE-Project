const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const express = require('express');
const router = express.Router();

// ========== Users Model ==========
const users_controller = require('../controllers/auth');

// ========== Initialization ==========
router.use(passport.initialize());
router.use(passport.session());

// ========== Manually SignUp ==========
router.post('/sign-up', users_controller.sign_up);

// ========== Google Serialize-User ==========
passport.serializeUser((user, callback)=> {
	callback(null, user);
})

// ========== Google Deserialize-User ==========
passport.deserializeUser((user, callback)=> {
	callback(null, user);
})

// ========== Google Login Process ==========
passport.use(new GoogleStrategy(
	{
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: process.env.GOOGLE_CALLBACK_URL,
	},
	(request, accessToken, refreshToken, profile, done) => {
		return done(null, profile);
	}
));


router.get('/google', passport.authenticate('google', {scope: ['email','profile']}))

router.get('/google/callback', passport.authenticate('google', {
	successRedirect: '/auth/google/success',
	failureRedirect: '/auth/google/fail'
}))


router.get('/google/success', users_controller.google_success);
router.get('/google/fail', users_controller.google_failed);










// ==================== Facebook Login Process ====================
passport.use(new FacebookStrategy(
	{
		clientID: process.env.FACEBOOK_CLIENT_ID,
		clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		callbackURL: process.env.FACEBOOK_CALLBACK_URL
	},
	(request, accessToken, refreshToken, profile, done)=> {
		return done(null, profile);
	}
));

router.get('/facebook', passport.authenticate('facebook', {scope: ['public_profile','email']}))

router.get('/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/auth/facebook/success',
	failureRedirect: '/auth/facebook/fail'
}))

router.get('/facebook/success', users_controller.facebook_success);
router.get('/facebook/fail', users_controller.facebook_failed);










router.get('/logout', (request, response)=> {
	request.logout(()=> {
		console.log(request.isAuthenticated());
		response.redirect('/');
	});
})


module.exports = router;