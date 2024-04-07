const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/CategoryController');
const authMiddleware = require('../middleware/authMiddleware');
const { authMiddleWare, authUserMiddleWare } = require('../middleware/authMiddleware');

//delete category
router.delete('/delete-category/:id', CategoryController.deleteCategory);
//update category
router.put('/update-category/:id', CategoryController.updateCategory);
//get category by id
router.get('/get-category/:id', CategoryController.getCategoryById);
//get all category
router.get('/get-all', CategoryController.getAllCategory);
//create category
router.post('/create-category', CategoryController.createCategory);

module.exports = router;