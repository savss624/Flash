const posts_db = require('../models/post');
const comment_db = require('../models/comment');

module.exports.create = async function(req, res) {
    try{
        await posts_db.create({
            content: req.body.feedPost,
            user: req.user._id
        });
        req.flash('success', 'Post Published');
        res.redirect('back');
    } catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res) {
    try{
        let post = await posts_db.findById(req.params.id);
        if(post.user == req.user.id) {
            post.remove();

            await comment_db.deleteMany({post : req.params.id}); 
            req.flash('success', 'Post and its associated Comments deleted');
            return res.redirect('back');           
        } else {
            req.flash('success', 'You cannot Delete this Post');
            return res.redirect('back');
        }
    } catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}