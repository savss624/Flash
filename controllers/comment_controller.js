const comment_db = require('../models/comment');
const post_db = require('../models/post');

module.exports.create = async function(req, res) {
    try{
        let post = await post_db.findById(req.body.postId);

        if(post){
            let comment = await comment_db.create({
                content: req.body.comment,
                user: req.user._id,
                post: req.body.postId
            });

            post.comment.push(comment);
            post.save();
            req.flash('success', 'Comment Added');
            return res.redirect('back');
        } else {
            req.flash('error', 'You cannot Comment on this Post!');
            return res.redirect('back');
        }
    } catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res) {
    try{
        let comment = await comment_db.findById(req.params.id);

        if(req.user.id == comment.user) {
            comment.remove();

            await post_db.findByIdAndUpdate(comment.post, { $pull: {comment : req.params.id}});
            req.flash('success', 'Comment Deleted');
            return res.redirect('back');
        } else {
            req.flash('error', 'You cannot Delete this Comment!');
            return res.redirect('back');
        }
    } catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}