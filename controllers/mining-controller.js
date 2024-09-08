const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MiningController = {
    miningPage: async (req, res) => {
        res.render('mining'); // Отображение страницы майнинга
    },

    startMining: async (req, res) => {
        const { userId, speed } = req.body;

        try {
            const miningSession = await prisma.miningSession.create({
                data: {
                    userId,
                    speed,
                },
            });

            res.json({ message: 'Mining started', session: miningSession });
        } catch (error) {
            res.status(500).json({ error: 'Failed to start mining' });
        }
    },

    endMining: async (req, res) => {
        const { sessionId, amountMined } = req.body;

        try {
            const miningSession = await prisma.miningSession.update({
                where: { id: sessionId },
                data: {
                    endTime: new Date(),
                    amountMined,
                },
            });

            // Обновление баланса пользователя
            await prisma.user.update({
                where: { id: miningSession.userId },
                data: {
                    balance: {
                        increment: amountMined,
                    },
                },
            });

            res.json({ message: 'Mining ended', session: miningSession });
        } catch (error) {
            res.status(500).json({ error: 'Failed to end mining' });
        }
    },
};

module.exports = MiningController;
