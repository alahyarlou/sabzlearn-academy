const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoute = require('./routes/v1/auth.routes');
const userRoute = require('./routes/v1/user.routes');
const categoryRoute = require('./routes/v1/category.routes');
const coursesRoute = require('./routes/v1/course.routes');
const commentsRoute = require('./routes/v1/comment.routes');

// ---- End Imports ------

const app = express()
app.use('/courses/covers', express.static(path.join(__dirname, 'public', 'courses', 'covers')))

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/courses', coursesRoute)
app.use('/api/v1/comments', commentsRoute)


module.exports = app