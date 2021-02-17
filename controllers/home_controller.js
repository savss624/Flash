const posts_db = require('../models/post');
const user_db = require('../models/user');

module.exports.home = function(req, res) {
    posts_db.find({})
    .populate('user')
    .populate({
        path: 'comment',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts) {
        if(err) {
            console.log('error fetching posts from database');
            return;
        }

        user_db.find({}, function(err, user) {
            return res.render('home', {
                title: 'Flash',
                postsList: posts,
                usersList: user
            });
        });
    });
}