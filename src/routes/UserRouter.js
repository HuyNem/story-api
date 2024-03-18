const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/sign-in', userController.loginUser);
router.post('/sign-up', userController.createUser);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', authMiddleware, userController.deleteUser);
router.get('/getAll', userController.getAllUser);

module.exports = router;
