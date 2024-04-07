const mongoose = require('mongoose');
const storyShema = new mongoose.Schema(
    {
        name: { type: 'string', required: true, unique: true },
        image: { type: 'string', required: true },
        author: { type: 'string', required: true },
        category: { type: 'string', required: true },
        description: { type: 'string', required: true },
        status: { type: 'boolean', default: false},
        id_Member: { type: 'string', required: true}
    },
    { timestamps: true },
);

const Story = mongoose.model('Story', storyShema);
module.exports = Story;
