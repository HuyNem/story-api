const mongoose = require('mongoose');
const commentShema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        storyId: { type: String, required: true },
        content: { type: String, required: true },
        nameUser: { type: String, required: true },
    },
    { timestamps: true },
);

const Comment = mongoose.model('Comment', commentShema);
module.exports = Comment;