// module.exports = {
//     db: 'mongodb://localhost:27017/story'
// }

const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/story');
        console.log('Kết nối database thành công');
    } catch (error) {
        console.log('Kết nối database không thành công');
    }
}

module.exports = { connect };