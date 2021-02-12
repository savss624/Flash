const posts_db = require('../models/post');

module.exports.create = function(req, res) {
    posts_db.create({
        content: req.body.feedPost,
        user: req.user._id
    }, function(err, post) {
        if(err) {console.log('error creating the post'); return;}

        res.redirect('back');
    });
}