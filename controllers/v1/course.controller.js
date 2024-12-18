const { createCourseVal } = require('../../validator/course');
const { updateSessionVal } = require('../../validator/session');
const courseModel = require('../../models/course');
const sessionModel = require('../../models/session')
const courseUserModel = require('../../models/course-user');
const { default: mongoose } = require('mongoose');

exports.createCourse = async (req, res) => {
    try {
        const validationResult = createCourseVal(req.body);
        if (validationResult !== true) {
            return res.status(400).json({ errors: validationResult });
        }

        const { name, description, status, support, href, price, discount, categoryId } = req.body

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: "Category ID is not valid!" });
        }

        const courseData = {
            name,
            description,
            author: req.user._id,
            cover: req.file?.filename || '',
            status,
            support,
            href,
            price,
            discount,
            categoryId
        };

        const createCourseResult = await courseModel.create(courseData);

        const mainCourse = await courseModel.findById(createCourseResult._id).populate('author', '-password')

        return res.status(201).json(mainCourse)
    } catch (error) {
        return res.status(500).json({ message: "server error!!" })
    }
}

exports.createSession = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "course id is not valid" })
        }

        const { title, time, free } = req.body

        if (!title || !time || typeof free === 'undefined') {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!req.file || !req.file.filename) {
            return res.status(400).json({ message: "Video file is required" });
        }

        await sessionModel.create({ title, time, free, video: req.file.filename, courseId: id })

        return res.status(201).json({ message: "session was successfully created!" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await courseModel.find({}).populate('author', 'name email').select('-password')
        return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
exports.getAllSessions = async (req, res) => {
    try {
        const sessions = await sessionModel.find({}).populate('courseId', 'name')
        return res.status(200).json(sessions)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.getSessionInfo = async (req, res) => {
    try {
        const { href, sessionId } = req.params

        // Validate session ID
        if (!mongoose.Types.ObjectId.isValid(sessionId)) {
            return res.status(400).json({ message: "Session ID is not valid" });
        }

        // Find course by href
        const course = await courseModel.findOne({ href }).lean();
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Find session by ID
        const session = await sessionModel.findOne({ _id: sessionId, courseId: course._id }).lean();
        if (!session) {
            return res.status(404).json({ message: "Session not found in the specified course" });
        }

        // Get all sessions for the course
        const sessions = await sessionModel.find({ courseId: course._id }).lean();

        return res.status(200).json({ session, sessions });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.removeSession = async (req, res) => {
    try {
        const { id } = req.params.id

        // Validate session ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Session ID is not valid" });
        }

        const deleteSessionResult = await sessionModel.findByIdAndDelete(id).lean()

        if (!deleteSessionResult) {
            return res.status(404).json({ message: "session not found!" })
        }

        return res.status(200).json({ message: "session was delete sucessfully!" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.updateSession = async (req, res) => {
    try {
        const { id } = req.params

        // Validate session ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Session ID is not valid" });
        }

        const resultSessionValidation = updateSessionVal(req.body)

        if (!resultSessionValidation) {
            return res.status(400).json({ errors: resultSessionValidation });
        }

        const updateSessionData = { ...req.body };

        // If a file is uploaded, add it to the update data
        if (req.file && req.file.filename) {
            updateSessionData.video = req.file.filename;
        }

        const sessionUpdate = await sessionModel.findByIdAndUpdate(
            id,
            updateSessionData,
            { new: true }
        );

        if (!sessionUpdate) {
            return res.status(404).json({ message: "Session not found" });
        }

        return res.status(200).json({ message: "Session is updated", session: sessionUpdate });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.registerCourse = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "course id is not valid!" })
        }


        await courseUserModel.create({ courseId: id, userId: req.user._id, price: req.body.price })

        return res.status(201).json({ message: "register of user in this course sucessfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
