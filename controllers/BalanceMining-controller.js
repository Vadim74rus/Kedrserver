const { prisma } = require("../prisma/prisma-client");

const BalanceMiningController = {
    getUserBalanceMining: async (req, res) => {
        const { userId } = req.params;

        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { balanceMining: true },
            });

            if (!user) {
                return res.status(404).json({ error: "Пользователь не найден" });
            }

            res.json(user);
        } catch (error) {
            console.error("Ошибка в getUserBalanceMining:", error);
            res.status(500).json({ error: "Что-то пошло не так" });
        }
    },

    updateUserBalanceMining: async (req, res) => {
        const { userId } = req.params;
        const { balanceMining } = req.body;

        // Проверка, что пользователь обновляет свой баланс
        if (userId !== req.user.userId) {
            return res.status(403).json({ error: "Нет доступа" });
        }

        try {
            const user = await prisma.user.update({
                where: { id: userId },
                data: {
                    balanceMining: parseFloat(balanceMining), // Преобразуем строку в число
                },
            });
            res.json(user);
        } catch (error) {
            console.error("Ошибка в updateUserBalanceMining:", error);
            res.status(500).json({ error: "Что-то пошло не так" });
        }
    },

    deleteUserBalanceMining: async (req, res) => {
        const { userId } = req.params;

        // Проверка, что пользователь удаляет свой баланс
        if (userId !== req.user.userId) {
            return res.status(403).json({ error: "Нет доступа" });
        }

        try {
            const user = await prisma.user.update({
                where: { id: userId },
                data: {
                    balanceMining: 0,
                },
            });
            res.json(user);
        } catch (error) {
            console.error("Ошибка в deleteUserBalanceMining:", error);
            res.status(500).json({ error: "Что-то пошло не так" });
        }
    },

    startMining: async (req, res) => {
        const { userId } = req.params;

        try {
            const user = await prisma.user.update({
                where: { id: userId },
                data: {
                    balanceMining: 0, // Сброс баланса майнинга при начале
                },
            });
            res.json(user);
        } catch (error) {
            console.error("Ошибка в startMining:", error);
            res.status(500).json({ error: "Что-то пошло не так" });
        }
    },

    endMining: async (req, res) => {
        const { userId } = req.params;

        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { balanceMining: true, balance: true },
            });

            if (!user) {
                return res.status(404).json({ error: "Пользователь не найден" });
            }

            const newBalance = user.balance + user.balanceMining;
            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: {
                    balance: newBalance,
                    balanceMining: 0,
                },
            });

            res.json(updatedUser);
        } catch (error) {
            console.error("Ошибка в endMining:", error);
            res.status(500).json({ error: "Что-то пошло не так" });
        }
    },
};

module.exports = BalanceMiningController;
