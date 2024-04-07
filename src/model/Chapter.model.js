const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let chapterSchema = new Schema({
    chapNum: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    storyId: { type: String, required: true },
},
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Chapter', chapterSchema);