const express = require('express');
const categoryController = require('../../controllers/v1/category.controller');
const isAdminMiddleware = require('../../middlewares/isAdmin.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');


// Create the router instance
const router = express.Router();

router.get('/', authMiddleware, isAdminMiddleware, categoryController.getAll)
router.post('/', authMiddleware, isAdminMiddleware, categoryController.create);
router.put('/:id', authMiddleware, isAdminMiddleware, categoryController.update)
router.delete('/:id', authMiddleware, isAdminMiddleware, categoryController.remove)


module.exports = router;
