const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
        type: String,
        default: 'default.png' // caminho para imagem default
    },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1}
});

module.exports = mongoose.model('User', UserSchema);