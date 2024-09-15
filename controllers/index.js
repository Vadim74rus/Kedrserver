const UserController = require('./user-controller');
const PostController = require('./post-controller');
const FollowController = require('./follow-controller');
const LikeController = require('./like-controller');
const CommentController = require('./comment-controller');
const MiningController = require('./mining-controller'); // Исправлено имя переменной
const BalanceController = require('./balance-controller');
const BalanceMiningController = require('./BalanceMining-controller');
const MessageController = require('./message-controller'); // Добавлено
const PremiumController = require('./PremiumController'); // Добавлено
const MiningPercentageController = require('./mining-percentage'); // Добавлено

module.exports = {
  UserController,
  PostController,
  FollowController,
  LikeController,
  CommentController,
  MiningController, // Добавлено в экспорт
  BalanceController,
  BalanceMiningController,
  MessageController, // Добавлено в экспорт
  PremiumController, // Добавлено в экспорт
  MiningPercentageController // Добавлено в экспорт
};


