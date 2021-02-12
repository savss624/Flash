const comment_db = require('../models/comment');
const post_db = require('../models/post');

module.exports.create = function(req, res) {
    post_db.findById(req.body.postId, function(err, post) {
        if(err){
            console.log('error fetching the post');
            return;
        }

        if(post){
            comment_db.create({
                content: req.body.comment,
                user: req.user._id,
                post: req.body.postId
            }, function(err, comment) {
                if(err){
                    console.log('error creating the comment');
                    return;
                }

                post.comment.push(comment);
                post.save();

                return res.redirect('back');
            });
        }
    });
}