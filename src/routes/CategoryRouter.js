const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/CategoryController');
const authMiddleware = require('../middleware/authMiddleware');

//get all category
router.get('/', CategoryController.getAllCategory);

module.exports = router;