const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/CategoryController');
const authMiddleware = require('../middleware/authMiddleware');

//get category by id
router.get('/get-category/:id', CategoryController.getCategoryById);
//get all category
router.get('/get-all', CategoryController.getAllCategory);
//create category
router.post('/create-category', CategoryController.createCategory);

module.exports = router;