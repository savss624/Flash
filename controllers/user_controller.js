const users_db = require('../models/user');

module.exports.profile = function(req, res) {
    users_db.findById(req.params.id, function(err, user) {
        return res.render('profile', {
            title: 'Flash',
            profileUser: user,
        });
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

module.exports.profileUpdate = function(req, res) {
    if(req.user.id == req.params.id) {
        users_db.findByIdAndUpdate(req.params.id, {email: req.body.email, name: req.body.name} /*Or req.body*/, function(err, user) {
            if(err) {
                req.flash('error', err);
            }
            return res.redirect('back');
        });
    } else {
        return res.status(401).send('Unauthorized');
    }
} 

module.exports.signin = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/');
    }

    res.render('signin', {
        title: 'Flash'
    });
}

module.exports.signup = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/');
    }

    return res.render('signup', {
        title: 'Flash'
    });
}

module.exports.createUser = async function(req, res) {
    try{
        if(req.body.password != req.body.confirmPassword) {
            req.flash('error', 'Passwords Must Be Same!');
            return res.redirect('back');
        }
        
        let user = await users_db.findOne({email: req.body.email});
    
        if(!user) {
            await users_db.create(req.body);
            req.flash('success', 'Account Created');
            res.redirect('/user/signin');
        } else {
            req.flash('success', 'User Already Exists!');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
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
    req.flash('success', 'Logged In Successfully');
    return res.redirect('/');
}

module.exports.signout = function(req, res) {
    req.logout();
    req.flash('success', 'You Have Logged Out!');
    return res.redirect('/');
}