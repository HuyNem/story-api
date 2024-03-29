const mongoose = require('mongoose');
const commentShema = new mongoose.Schema(
    {
        id_Member: { type: 'string', required: true },
        id_Story: { type: 'string', required: true },
        content: { type: 'string', required: true },
    },
    { timestamps: true },
);

const Comment = mongoose.model('Comment', commentShema);
module.exports = Comment;