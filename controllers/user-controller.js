// Пример серверного кода (Node.js + Express)
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let miningStates = {}; // Хранилище состояний майнинга (в реальном приложении это будет база данных)

app.post('/api/mining/start', (req, res) => {
  const { userId } = req.body;
  miningStates[userId] = {
    startedAt: Date.now(),
    balance: 0,
  };
  res.sendStatus(200);
});

app.post('/api/mining/stop', (req, res) => {
  const { userId } = req.body;
  if (miningStates[userId]) {
    const { startedAt, balance } = miningStates[userId];
    const duration = Date.now() - startedAt;
    const newBalance = balance + (duration / 1000) * 0.0001;
    // Обновить баланс пользователя в базе данных
    // ...
    delete miningStates[userId];
    res.json({ newBalance });
  } else {
    res.sendStatus(404);
  }
});

app.get('/api/mining/status', (req, res) => {
  const { userId } = req.query;
  if (miningStates[userId]) {
    res.json(miningStates[userId]);
  } else {
    res.sendStatus(404);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

