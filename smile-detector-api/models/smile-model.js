const mongoose = require('mongoose');

const SmileSchema = mongoose.Schema({
    time: Number,
    video_url: String,
    intensity: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('Smile', SmileSchema);