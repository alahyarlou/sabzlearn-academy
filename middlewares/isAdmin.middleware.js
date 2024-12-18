module.exports = async (req, res, next) => {
    if (!req.user || !req.user.role) {
        return res.status(403).json({ message: "User information is missing or invalid!" });
    }
    const isAdmin = req.user.role === 'ADMIN'

    if (!isAdmin) {
        return res.status(403).json({ message: "This api is forbidden!!" })
    }

    next()
}