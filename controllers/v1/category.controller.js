const { default: mongoose } = require('mongoose');
const categoryModel = require('../../models/category');


exports.getAll = async (req, res) => {
    try {
        const categories = await categoryModel.find({}).lean()
        return res.status(200).json(categories)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.create = async (req, res) => {
    try {
        const { title, href } = req.body

        // Validate input body
        if (!title || !href) {
            return res.status(400).json({ message: 'Title and href are required' });
        }

        // Check for duplicate category
        const existingCategory = await categoryModel.findOne({ href });
        if (existingCategory) {
            return res.status(409).json({ message: 'Category already exists' });
        }

        // Create new category
        const newCategory = await categoryModel.create({ title, href });

        return res.status(201).json(newCategory)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
exports.remove = async (req, res) => {
    try {
        const { id } = req.params

        // check object id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "id is not valid!" })
        }

        const category = await categoryModel.findByIdAndDelete(id)

        if (!category) {
            return res.status(404).json({ message: "category is not found!" })
        }

        return res.status(200).json({ message: "cateogry was successfully deleted!!", data: category })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
exports.update = async (req, res) => {
    try {
        const { id } = req.params

        // check object id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "id is not valid!" })
        }

        const { title, href } = req.body

        // Validate input body
        if (!title || !href) {
            return res.status(400).json({ message: 'Title and href are required' });
        }

        // find with object id and update
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, { title, href }, { new: true })

        if (!updatedCategory) {
            return res.status(404).json({ message: "category is not found!" })
        }

        return res.status(200).json({ message: "cateogry was successfully updated!!", data: updatedCategory })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}