const { prisma } = require("../prisma/prisma-client");

const MiningPercentageController = {
    getMiningPercentage: async (req, res) => {
        const { userId } = req.params;

        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { miningPercentage: true },
            });

            if (!user) {
                return res.status(404).json({ error: "Пользователь не найден" });
            }

            res.json(user);
        } catch (error) {
            console.error("Ошибка в getMiningPercentage:", error);
            res.status(500).json({ error: "Что-то пошло не так1", details: error.message });
        }
    },

    updateMiningPercentage: async (req, res) => {
        const { userId } = req.params;
        const { miningPercentage } = req.body;

        // Проверка, что пользователь обновляет свой процент майнинга
        if (userId !== req.user.userId) {
            return res.status(403).json({ error: "Нет доступа" });
        }

        try {
            const user = await prisma.user.update({
                where: { id: userId },
                data: {
                    miningPercentage: parseFloat(miningPercentage), // Преобразуем строку в число
                },
            });
            res.json(user);
        } catch (error) {
            console.error("Ошибка в updateMiningPercentage:", error);
            res.status(500).json({ error: "Что-то пошло не так2", details: error.message });
        }
    },

    deleteMiningPercentage: async (req, res) => {
        const { userId } = req.params;

        // Проверка, что пользователь удаляет свой процент майнинга
        if (userId !== req.user.userId) {
            return res.status(403).json({ error: "Нет доступа" });
        }

        try {
            const user = await prisma.user.update({
                where: { id: userId },
                data: {
                    miningPercentage: 0,
                },
            });
            res.json(user);
        } catch (error) {
            console.error("Ошибка в deleteMiningPercentage:", error);
            res.status(500).json({ error: "Что-то пошло не так3", details: error.message });
        }
    },
};

module.exports = MiningPercentageController;
