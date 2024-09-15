const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user-controller");
const PostController = require("../controllers/post-controller");
const FollowController = require("../controllers/follow-controller");
const LikeController = require("../controllers/like-controller");
const CommentController = require("../controllers/comment-controller");
const MiningController = require("../controllers/mining-controller");
const PercentageController = require("../controllers/mining-percentage");
const BalanceController = require("../controllers/balance-controller");
const BalanceMiningController = require("../controllers/BalanceMining-controller");
const MessageController = require("../controllers/message-controller");
const PremiumController = require("../controllers/PremiumController");
const { authenticateToken } = require("../middleware/auth");
const multer = require('multer');

const uploadDestination = 'uploads';

// Указываем, где хранить загружаемые файлы
const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Маршруты User
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/current", authenticateToken, UserController.current);
router.get("/users/:id", authenticateToken, UserController.getUserById);
router.put("/users/:id", authenticateToken, upload.single('avatar'), UserController.updateUser);

// Маршруты Post
router.post("/posts", authenticateToken, PostController.createPost);
router.get("/posts", authenticateToken, PostController.getAllPosts);
router.get("/posts/:id", authenticateToken, PostController.getPostById);
router.delete("/posts/:id", authenticateToken, PostController.deletePost);

// Маршруты подписки
router.post("/follow", authenticateToken, FollowController.followUser);
router.delete("/unfollow/:id", authenticateToken, FollowController.unfollowUser);

// Маршруты лайков
router.post("/likes", authenticateToken, LikeController.likePost);
router.delete("/likes/:id", authenticateToken, LikeController.unlikePost);

// Маршруты комментариев
router.post("/comments", authenticateToken, CommentController.createComment);
router.delete("/comments/:id", authenticateToken, CommentController.deleteComment);

// Маршруты для майнинга монеты KEDR
router.get("/mining", authenticateToken, MiningController.miningPage);
router.post("/mining/start", authenticateToken, MiningController.startMining);
router.post("/mining/end", authenticateToken, MiningController.endMining);

// Маршруты для управления балансом пользователя
router.get("/balance/:userId", authenticateToken, BalanceController.getUserBalance);
router.put("/balance/:userId", authenticateToken, BalanceController.updateUserBalance);
router.delete("/balance/:userId", authenticateToken, BalanceController.deleteUserBalance);

// Маршруты для управления полем balanceMining
router.get("/balance-mining/:userId", authenticateToken, BalanceMiningController.getUserBalanceMining);
router.put("/balance-mining/:userId", authenticateToken, BalanceMiningController.updateUserBalanceMining);
router.delete("/balance-mining/:userId", authenticateToken, BalanceMiningController.deleteUserBalanceMining);
router.post("/balance-mining/start/:userId", authenticateToken, BalanceMiningController.startMining);
router.put("/balance-mining/start/:userId", authenticateToken, BalanceMiningController.startMining);
router.post("/balance-mining/end/:userId", authenticateToken, BalanceMiningController.endMining);

// Маршруты для личных сообщений
router.post("/messages", authenticateToken, MessageController.sendMessage);
router.get("/messages/:receiver", authenticateToken, MessageController.getMessages);

// Маршруты для управления премиум-статусом пользователя
router.put("/premium/:id", authenticateToken, PremiumController.updatePremiumStatus); // Обновление премиум-статуса
router.get("/premium/:id", authenticateToken, PremiumController.getPremiumStatus); // Получение информации о премиум-статусе
router.delete("/premium/:id", authenticateToken, PremiumController.deletePremiumStatus); // Удаление премиум-статуса (если это имеет смысл)

// Маршруты для управления процентом майнинга
router.get("/mining-percentage/:userId", authenticateToken, PercentageController.getMiningPercentage);
router.put("/mining-percentage/:userId", authenticateToken, PercentageController.updateMiningPercentage);
router.delete("/mining-percentage/:userId", authenticateToken, PercentageController.deleteMiningPercentage);

module.exports = router;


