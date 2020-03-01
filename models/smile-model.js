const mongoose = require('mongoose');

const SmileSchema = mongoose.Schema({
    time: Number,
    video_url: String,
    username: String,
    expression: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Smile', SmileSchema);