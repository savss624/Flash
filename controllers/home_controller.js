const posts_db = require('../models/post');

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

        return res.render('home', {
            title: 'Flash',
            postsList: posts
        });
    });
}