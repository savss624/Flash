const users_db = require('../models/user');

module.exports.home = function(req, res) {
    return res.render('home', {
        title: 'Flash',
    });
}