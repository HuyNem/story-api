// module.exports = {
//     db: 'mongodb://localhost:27017/story'
// }

const mongoose = require("mongoose");

async function connect() {
  try {
    // await mongoose.connect('mongodb://127.0.0.1:27017/story');
    await mongoose.connect(
      "mongodb+srv://daogiahuy2002:huyliem2002@cluster0.a9rwhtm.mongodb.net/storyDB?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Kết nối database thành công");
  } catch (error) {
    console.log("Kết nối database không thành công", error);
  }
}

module.exports = { connect };
