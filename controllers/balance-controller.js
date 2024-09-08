const { prisma } = require("../prisma/prisma-client");

const BalanceController = {
    getUserBalance: async (req, res) => {
        const { userId } = req.params;

        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { balance: true },
            });

            if (!user) {
                return res.status(404).json({ error: "Пользователь не найден" });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: "Что-то пошло не так" });
        }
    },

    updateUserBalance: async (req, res) => {
        const { userId } = req.params;
        const { balance } = req.body;

        // Проверка, что пользователь обновляет свой баланс
        if (userId !== req.user.userId) {
            return res.status(403).json({ error: "Нет доступа" });
        }

        try {
            const user = await prisma.user.update({
                where: { id: userId },
                data: {
                    balance: balance,
                },
            });
            res.json(user);
        } catch (error) {
            console.log('error', error)
            res.status(500).json({ error: "Что-то пошло не так" });
        }
    },

    deleteUserBalance: async (req, res) => {
        const { userId } = req.params;

        // Проверка, что пользователь удаляет свой баланс
        if (userId !== req.user.userId) {
            return res.status(403).json({ error: "Нет доступа" });
        }

        try {
            const user = await prisma.user.update({
                where: { id: userId },
                data: {
                    balance: 0,
                },
            });
            res.json(user);
        } catch (error) {
            console.log('error', error)
            res.status(500).json({ error: "Что-то пошло не так" });
        }
    },
};

module.exports = BalanceController;
