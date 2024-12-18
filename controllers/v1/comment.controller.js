const commentsModel = require('../../models/comment');
const courseModel = require('../../models/course')

exports.createComment = async (req, res) => {
    try {
        const { href, body, score, isAccept, isAnswer } = req.body

        const course = await courseModel.findOne({ href }).lean()

        if (!course) {
            return res.status(404).json({ message: "course not found!" })
        }

        const comment = await commentsModel.create({ body, score, isAccept, userId: req.user._id, isAnswer, courseId: course._id })

        return res.status(201).json({ message: "comment create sucssesfully!!", comment })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


exports.getAllComment = async (req, res) => {
    try {
        const comments = await commentsModel.find({}).lean()
        return res.status(200).json(comments)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}