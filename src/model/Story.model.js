const mongoose = require('mongoose');
const storyShema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        author: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: Boolean, default: false},
        isCompleted: { type: Boolean, default: false},
        id_Member: { type: String, required: true},
        view: { type: Number, default: 0}
    },
    { timestamps: true },
);

const Story = mongoose.model('Story', storyShema);
module.exports = Story;
