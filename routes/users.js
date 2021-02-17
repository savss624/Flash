const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

const passport = require('passport');

router.get('/profile/:id', passport.checkAuthenticated, userController.profile);
router.post('/profile-update/:id', passport.checkAuthenticated, userController.profileUpdate);
router.get('/signin', userController.signin);
router.get('/signup', userController.signup);

router.post('/create-user', userController.createUser);
//use passport as middleware
router.post('/auth-user', passport.authenticate(
    'local',
    {failureRedirect: '/user/signin'}
), userController.authUser);
router.get('/signout', userController.signout);

module.exports = router;