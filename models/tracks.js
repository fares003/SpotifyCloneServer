const mongoose = require('mongoose');

const tracksSchema = new mongoose.Schema({
    duration_ms: {
        type: Number,
        required: true
    },
    images: {
        type: String,  // Fixed String type
        required: true
    },
    name: {
        type: String,
        required: true
    },
    release_date: {
        type: Date,
        required: true
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Album',
        required: false
    },
    artists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    songType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }
});

module.exports = mongoose.model('Track', tracksSchema);