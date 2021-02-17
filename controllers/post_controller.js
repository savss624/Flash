const posts_db = require('../models/post');
const comment_db = require('../models/comment');

module.exports.create = function(req, res) {
    posts_db.create({
        content: req.body.feedPost,
        user: req.user._id
    }, function(err, post) {
        if(err) {console.log('error creating the post'); return;}

        res.redirect('back');
    });
}

module.exports.destroy = function(req, res) {
    posts_db.findById(req.params.id, function(err, post) {
        if(post.user == req.user.id) {
            post.remove();

            comment_db.deleteMany({post : req.params.id}, function(err, comment) {
                return res.redirect('back');
            });            
        } else {
            return res.redirect('back');
        }
    });
}