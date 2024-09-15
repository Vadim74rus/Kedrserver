const Message = require('../models/message-model'); // Предположим, что у вас есть модель Message

exports.sendMessage = async (req, res) => {
    try {
        const { sender, receiver, text } = req.body;
        const message = new Message({ sender, receiver, text, timestamp: new Date() });
        await message.save();
        res.status(200).send({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error sending message' });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const receiver = req.params.receiver;
        const messages = await Message.find({ receiver });
        res.status(200).send(messages);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching messages' });
    }
};
