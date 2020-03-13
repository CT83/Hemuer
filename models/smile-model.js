const mongoose = require('mongoose');

const SmileSchema = mongoose.Schema({
    time: Number,
    video_url: String,
    username: String,
    expression: String,
    sent_time: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('Smile', SmileSchema);