const Category = require('../model/Category.model');
const CategoryService = require('../services/CategoryService');

const getAllCategory = async (req, res) => {
    try {
        const response = await CategoryService.getAllCategory();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e
        });
    }
}


module.exports = {
    getAllCategory
}
