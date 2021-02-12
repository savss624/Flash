const mongoose = require('mongoose');

const commentschema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    //reference to user who comments
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    //reference to post on which user comments
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts'
    }
}, {
    timestamps: true
});

const Comment = mongoose.model('Comments', commentschema);

module.exports = Comment;