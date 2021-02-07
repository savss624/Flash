const express = require('express');

const router = express.Router();
const homeControler = require('../controllers/home_controller');

router.get('/', homeControler.home);
router.use('/user', require('./users'));

module.exports = router;