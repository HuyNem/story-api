const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        avatar: { type: String },
        description: { type: String },
        facebook: { type: String },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
        access_token: { type: String },
        refresh_token: { type: String },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;