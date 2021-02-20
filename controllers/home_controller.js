const posts_db = require('../models/post');
const user_db = require('../models/user');

module.exports.home = async function(req, res) {
    try{
        let posts = await posts_db.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        });
        
        let user = await user_db.find({});

        return res.render('home', {
            title: 'Flash',
            postsList: posts,
            usersList: user
        });
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}