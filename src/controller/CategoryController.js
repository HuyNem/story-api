const Category = require('../model/Category.model');
const CategoryService = require('../services/CategoryService');

//get all categories
const getAllCategory = async (req, res) => {
    try {
        const response = await CategoryService.getAllCategory();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

//get categories by id
const getCategoryById = async (req, res) => {
    try {
        let id = req.params.id;
        if(!id) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Thể loại không tồn tại'
            })
        }
        const response = await CategoryService.getCategoryById(id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

//create a new category
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await CategoryService.createCategory(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

//update category
const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const data = req.body;
        console.log('categoryId', categoryId);
        console.log('data: ', data);
        if (!categoryId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The category is required'
            })
        }
        const response = await CategoryService.updateCategory(categoryId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

//delete category
const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        if (!categoryId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The category id is required'
            })
        }
        const response = await CategoryService.deleteCategory(categoryId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}


module.exports = {
    getAllCategory,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
}
