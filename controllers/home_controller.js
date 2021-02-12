const users_db = require('../models/user');
const posts_db = require('../models/post');

module.exports.home = function(req, res) {
    posts_db.find({}, function(err, posts) {
        if(err) {
            console.log('error fetching the posts from database');
            return;
        }
        
        return res.render('home', {
            title: 'Flash',
            postsList: posts
        });
    });
}