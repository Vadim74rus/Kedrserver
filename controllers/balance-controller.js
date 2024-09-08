const { prisma } = require("../prisma/prisma-client");

// Функция для получения баланса пользователя
const getUserBalance = async (req, res) => {
    const { userId } = req.params;

    try {
        // Найти пользователя по ID и получить его баланс
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { balance: true },
        });

        // Если пользователь не найден, вернуть ошибку 404
        if (!user) {
            return res.status(404).json({ error: "Пользователь не найден" });
        }

        // Вернуть баланс пользователя
        res.json({ balance: user.balance });
    } catch (error) {
        console.error("Ошибка в getUserBalance:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};

// Функция для обновления баланса пользователя
const updateUserBalance = async (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;

    // Преобразовать amount в число
    const parsedAmount = parseFloat(amount);

    // Проверка, что amount является числом
    if (isNaN(parsedAmount)) {
        return res.status(400).json({ error: "Сумма должна быть числом" });
    }

    try {
        // Найти пользователя по ID и получить его баланс
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { balance: true },
        });

        // Если пользователь не найден, вернуть ошибку 404
        if (!user) {
            return res.status(404).json({ error: "Пользователь не найден" });
        }

        // Обновить баланс пользователя
        const newBalance = user.balance + parsedAmount;

        await prisma.user.update({
            where: { id: userId },
            data: { balance: newBalance },
        });

        // Вернуть новый баланс пользователя
        res.json({ balance: newBalance });
    } catch (error) {
        console.error("Ошибка в updateUserBalance:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};

// Функция для сброса баланса пользователя
const deleteUserBalance = async (req, res) => {
    const { userId } = req.params;

    try {
        // Обновить баланс пользователя на 0
        await prisma.user.update({
            where: { id: userId },
            data: { balance: 0 },
        });

        // Вернуть новый баланс пользователя (0)
        res.json({ balance: 0 });
    } catch (error) {
        console.error("Ошибка в deleteUserBalance:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};

// Экспорт функций для использования в других модулях
module.exports = {
    getUserBalance,
    updateUserBalance,
    deleteUserBalance,
};