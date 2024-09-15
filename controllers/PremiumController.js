const { prisma } = require("../prisma/prisma-client");

const PremiumController = {
    updatePremiumStatus: async (req, res) => {
        const { id } = req.params;
        const { isPremium } = req.body;

        try {
            // Обновляем статус премиум пользователя
            const user = await prisma.user.update({
                where: { id },
                data: { isPremium },
            });

            res.json(user);
        } catch (error) {
            console.error("Error in updatePremiumStatus:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    getPremiumStatus: async (req, res) => {
        const { id } = req.params;

        try {
            // Получаем информацию о премиум-статусе пользователя
            const user = await prisma.user.findUnique({
                where: { id },
                select: { isPremium: true },
            });

            res.json(user);
        } catch (error) {
            console.error("Error in getPremiumStatus:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    deletePremiumStatus: async (req, res) => {
        const { id } = req.params;

        try {
            // Удаляем премиум-статус пользователя
            const user = await prisma.user.update({
                where: { id },
                data: { isPremium: false },
            });

            res.json(user);
        } catch (error) {
            console.error("Error in deletePremiumStatus:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};

module.exports = PremiumController;

