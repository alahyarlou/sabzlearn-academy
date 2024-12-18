const { default: mongoose } = require('mongoose');
const banUserModel = require('../../models/ban-phone');
const userModel = require('../../models/user');
const bcrypt = require('bcrypt');


exports.banUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID!" });
        }

        const user = await userModel.findById(id).lean();

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const result = await banUserModel.create({ phone: user.phone });

        if (result) {
            return res.status(200).json({ message: `User with ID ${id} has been banned.` });
        }
    } catch (error) {
        return res.status(500).json({ message: "server error!!" })
    }

}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}).select('-password');
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
}

exports.removeUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID!" });
        }

        const deletedUser = await userModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        return res.status(200).json({ message: "user is remove sucessfully" })
    } catch (error) {
        return res.status(500).json({ message: 'Server Error' })
    }
}

exports.changeRole = async (req, res) => {
    try {
        const { id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "The object id is not valid!" });
        }

        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const newRole = user.role === "USER" ? "ADMIN" : "USER"
        user.role = newRole;

        await user.save();

        return res.status(200).json({ message: "User role updated successfully", role: newRole });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error' })
    }
}


exports.updateUser = async (req, res) => {
    try {
        const { id, username, name, password, email, phone } = req.body;

        // Check if the user ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "The object id is not valid!" });
        }

        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        let updatedFields = { username, name, email, phone };

        if (password) {
            updatedFields.password = await bcrypt.hash(password, 10);
        }


        const updatedUser = await userModel.findByIdAndUpdate(id, updatedFields, { new: true }).select('-password');

        return res.status(200).json(updatedUser)

    } catch (error) {
        return res.status(500).json({ message: 'Server Error' })
    }
}
