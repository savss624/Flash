const users_db = require('../models/user');

module.exports.profile = function(req, res) {
    return res.render('home', {
        title: 'Flash',
    });
    /*if(req.cookies.FlashChat) {
        users_db.findById(req.cookies.FlashChat, function(err, user) {
            if(err) {console.log('error fetching the user data'); return;}

            if(user) {
                return res.render('home', {
                    title: 'FlashChat',
                    name: user.name
                });
            } else {
                console.log('invalid user_id');
                return res.redirect('/user/signin');
            }
        });
    } else {
        return res.redirect('/user/signin');
    }*/
}

module.exports.signin = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('profile');
    }

    res.render('signin', {
        title: 'Flash'
    });
}

module.exports.signup = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('profile');
    }

    return res.render('signup', {
        title: 'Flash'
    });
}

module.exports.createUser = function(req, res) {
    if(req.body.password != req.body.confirmPassword) {
        return res.redirect('back');
    }
    
    users_db.findOne({email: req.body.email}, function(err, user) {
        if(err) {console.log('error fetching the user data'); return;}

        if(!user) {
            users_db.create(req.body, function(err, user) {
                if(err) {console.log('error creating the user'); return;}

                res.redirect('/user/signin');
            });
        } else {
            return res.redirect('back');
        }
    });
}

module.exports.authUser = function(req, res) {
    /*users_db.findOne({email: req.body.email}, function(err, user) {
        if(err) {console.log('error fetching the user data'); return;}

        if(user) {
            if(user.password != req.body.password) {
                window.alert('wrong password');
                return res.redirect('back');
            } else {
                res.cookie('flashchat_user_id', user.id);
                console.log('signed in');
                return res.redirect('/user/profile');
            }
        } else {
            window.alert('user does not exists');
            return res.redirect('back');
        }
    });*/
    return res.redirect('/');
}

module.exports.signout = function(req, res) {
    req.logout();
    return res.redirect('/');
}