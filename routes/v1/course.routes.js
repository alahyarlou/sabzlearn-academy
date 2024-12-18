const express = require('express');
const multer = require('multer');
const multerStorage = require('../../utils/uploader');
const courseController = require('../../controllers/v1/course.controller')
const isAdminMiddleware = require('../../middlewares/isAdmin.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');


const router = express.Router();

// config multer
const uploadCoverPhoto = multer({ storage: multerStorage, limits: { fileSize: 5 * 1024 * 1024 } });
const uploadSessionVideo = multer({ storage: multerStorage });

// create Course and upload cover photo
router.route('/').post(uploadCoverPhoto.single('cover'), authMiddleware, isAdminMiddleware, courseController.createCourse)

// get All courses
router.route('/').get(authMiddleware, isAdminMiddleware, courseController.getAllCourses)

// create session with upload video
router.route('/:id/session').post(uploadSessionVideo.single('video'), authMiddleware, isAdminMiddleware, courseController.createSession)

// get all Sessions of Course
router.route('/sessions').get(authMiddleware, isAdminMiddleware, courseController.getAllSessions)

// get session information
router.route('/:href/:sessionId').get(authMiddleware, isAdminMiddleware, courseController.getSessionInfo)

// update and delete session information
router.route('/session/:id').put(uploadSessionVideo.single('video'), authMiddleware, isAdminMiddleware, courseController.updateSession)
    .delete(authMiddleware, isAdminMiddleware, courseController.removeSession)


// register course users
router.route('/:id/register').post(authMiddleware, courseController.registerCourse)

module.exports = router
