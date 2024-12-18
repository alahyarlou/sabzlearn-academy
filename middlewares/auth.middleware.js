const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const Authorization = req.header('Authorization')?.split(' ')

    // Ensure the Authorization header exists and has the correct format
    if (!Authorization || Authorization.length !== 2 || Authorization[0] !== 'Bearer') {
        return res.status(403).json({ message: "Token is required and must be a Bearer token!" });
    }

    const token = Authorization[1]

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);

        const user = await userModel.findById(decodedToken.id).select('-password').lean();

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        req.user = user;

        next()

    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}