const express = require('express');
const usersController = require('../../controllers/v1/user.controller');
const isAdminMiddleware = require('../../middlewares/isAdmin.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');

// Create the router instance
const router = express.Router();

// Ban a user by their ID (POST request)
router.post('/ban/:id', authMiddleware, isAdminMiddleware, usersController.banUser);

// Get all users (GET request)
router.get('/all-user', authMiddleware, isAdminMiddleware, usersController.getAllUsers);

// Update user information (PUT request)
router.put('/:id', authMiddleware, isAdminMiddleware, usersController.updateUser);

// Change a user's role (PUT request)
router.put('/role', authMiddleware, isAdminMiddleware, usersController.changeRole);

// Remove a user by their ID (DELETE request)
router.delete('/:id', authMiddleware, isAdminMiddleware, usersController.removeUser);

module.exports = router;
