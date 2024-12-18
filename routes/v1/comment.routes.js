const express = require('express');
const commentController = require('../../controllers/v1/comment.controller');
const isAdminMiddleware = require('../../middlewares/isAdmin.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');

const router = express.Router();

router.route('/').post(authMiddleware, commentController.createComment)
    .get(authMiddleware, commentController.getAllComment)

module.exports = router;
