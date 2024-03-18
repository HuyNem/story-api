const mongoose = require('mongoose');
const storyShema = new mongoose.Schema(
    {
        name: { type: 'string', required: true, unique: true },
        image: { type: 'string', required: true },
        author: { type: 'string', required: true },
        describe: { type: 'string', required: true },
        content: { type: 'string', required: true },
    },
    { timestamps: true },
);

const Story = mongoose.model('Story', storyShema);
module.exports = Story;
