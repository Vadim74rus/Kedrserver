const UserController = require('./user-controller');
const PostController = require('./post-controller');
const FollowController = require('./follow-controller');
const LikeController = require('./like-controller');
const CommentController = require('./comment-controller');
const MiningController = require('./mining-controller');// Исправлено имя переменной
const BalanceController = require('./balance-controller');

module.exports = {
  UserController,
  PostController,
  FollowController,
  LikeController,
  CommentController,
  MiningController, // Добавлено в экспорт
  BalanceController
};
