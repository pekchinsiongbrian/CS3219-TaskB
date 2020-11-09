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

const Vote = module.exports = mongoose.model('vote', voteSchema);

module.exports.get = (callback, limit) => {
    Vote.find(callback).limit(limit);
}
