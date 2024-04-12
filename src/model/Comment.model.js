const mongoose = require('mongoose');
const commentShema = new mongoose.Schema(
    {
        userId: { type: 'string', required: true },
        storyId: { type: 'string', required: true },
        content: { type: 'string', required: true },
    },
    { timestamps: true },
);

const Comment = mongoose.model('Comment', commentShema);
module.exports = Comment;