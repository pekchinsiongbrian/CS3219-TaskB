const mongoose = require('mongoose');

const voteSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    candidate: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Vote', voteSchema);
