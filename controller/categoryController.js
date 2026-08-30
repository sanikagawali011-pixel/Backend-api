const Category = require('../models/categoryModule');

const createCategory = async (req, res) => {
    try {
        const { name, description, image, isActive } = req.body;

        const urlRegex = /^(?!^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-])\/?$).+$/;

        if (!name) {
            return res.status(400).json({
                "message": "invalid category name"
            })
        }

        if (!image || !urlRegex.test({ image })) {
            return res.status(400).json({
                "message": "invalid image url"
            })
        }

        const checkCategory = await Category.findOne({ name });

        if (checkCategory) {
            return res.status(400).json({
                "message": "Category Already Exist"
            })
        }

        const category = new Category(req.body);

        await category.save();
        return res.status(201).json({
            "message": "Category Saved Successfully",
            category: category
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const getAllCategories = async (req, res) => {
    try {

        const fetchedCategoryList = await Category.find({
            isActive: true,
        });
        return res.status(200).json({
            count: fetchedCategoryList.length,
            categories: fetchedCategoryList

        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = { createCategory, getAllCategories };