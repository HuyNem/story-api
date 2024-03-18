const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
},
    {
        timestamps: true,
        collection: 'category',
    }
);
module.exports = mongoose.model('Category', categorySchema);