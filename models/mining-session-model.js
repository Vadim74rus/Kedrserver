const mongoose = require('mongoose');

const miningSessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    startedAt: { type: Date, required: true },
    balance: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const MiningSession = mongoose.model('MiningSession', miningSessionSchema);

module.exports = MiningSession;
