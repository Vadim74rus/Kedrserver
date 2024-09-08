const MiningSession = require('../models/mining-session-model'); // Предполагается, что у вас есть модель для майнинга

exports.miningPage = (req, res) => {
    res.send('Mining Page');
};

exports.startMining = async (req, res) => {
    const { userId } = req.body;
    try {
        const miningSession = await MiningSession.findOne({ userId });
        if (miningSession) {
            return res.status(400).json({ message: 'Mining already in progress' });
        }
        const newMiningSession = new MiningSession({
            userId,
            startedAt: Date.now(),
            balance: 0,
        });
        await newMiningSession.save();
        res.status(200).json({ message: 'Mining started' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to start mining' });
    }
};

exports.endMining = async (req, res) => {
    const { userId } = req.body;
    try {
        const miningSession = await MiningSession.findOne({ userId });
        if (!miningSession) {
            return res.status(404).json({ message: 'No mining in progress' });
        }
        const duration = Date.now() - miningSession.startedAt;
        const newBalance = miningSession.balance + (duration / 1000) * 0.0001;
        await MiningSession.findOneAndDelete({ userId });
        res.status(200).json({ newBalance });
    } catch (error) {
        res.status(500).json({ message: 'Failed to end mining' });
    }
};

