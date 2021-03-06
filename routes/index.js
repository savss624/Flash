const express = require('express');
const passport = require('passport');


const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/user', require('./users'));
router.use('/post', require('./post'));
router.use('/comment', require('./comment'));

module.exports = router;