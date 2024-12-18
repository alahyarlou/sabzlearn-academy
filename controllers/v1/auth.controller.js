const userModel = require('../../models/user');
const banUserModel = require('../../models/ban-phone');
const regValidator = require('../../validator/register');
const loginValidator = require('../../validator/login');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const resultVal = regValidator(req.body)

    if (resultVal !== true) {
        return res.status(422).json(resultVal)
    }

    const { username, name, phone, password, email } = req.body


    const isUserExist = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserExist) {
        return res.status(409).json({ message: "User with this username or email already exists" })
    }

    const isUserBaned = await banUserModel.findOne({ phone }).lean()

    if (isUserBaned) {
        return res.status(409).json({ message: "this user is baned!!" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const countOfUsers = await userModel.countDocuments()

    const user = await userModel.create({
        name,
        username,
        password: hashedPassword,
        phone,
        email,
        role: countOfUsers > 0 ? "USER" : "ADMIN"
    })

    // Remove the password field from the response object
    const userObj = user.toObject()
    Reflect.deleteProperty(userObj, 'passwrod')     // delete userObj.password


    // token
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
        expiresIn: "30d"
    })


    return res.status(201).json({
        message: "User registered successfully",
        user: userObj,
        token: accessToken
    })
}


exports.login = async (req, res) => {
    const resultVal = loginValidator(req.body)

    if (resultVal !== true) {
        return res.status(422).json(resultVal)
    }

    const { idetifier, password } = req.body

    const user = await userModel.findOne({
        $or: [{ username: idetifier }, { email: idetifier }]
    })

    if (!user) {
        return res.status(404).json({ message: "User is not found!!" })
    }

    const isCorrectPassword = bcrypt.compare(password, { id: user._id })

    if (!isCorrectPassword) {
        return res.status(409).json({ message: "The password is not correct!!" })
    }

    // token
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
        expiresIn: "30d"
    })

    return res.status(200).json({
        message: "User login successfully",
        token: accessToken
    })

}

exports.getMe = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select('-password')
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
}


