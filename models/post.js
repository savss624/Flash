const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    //array of comments in post
    comment: [
       {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments'
       } 
    ]
}, {
    timestamps: true
});

const Post = mongoose.model('Posts', postSchema);

module.exports = Post;