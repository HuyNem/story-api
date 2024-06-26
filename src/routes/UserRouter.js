const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const { authMiddleWare, authUserMiddleWare } = require('../middleware/authMiddleware');

router.post('/sign-in', userController.loginUser);
router.post('/sign-up', userController.createUser);
router.post('/log-out', userController.logoutUser);
router.put('/update-user/:id', userController.updateUser);
router.put('/changepass/:id', userController.changePass);
router.delete('/delete-user/:id', authMiddleWare, userController.deleteUser);
router.get('/getAll', userController.getAllUser);
router.get('/get-detail-user/:id', authUserMiddleWare, userController.getDetailUser);
router.post('/refresh-token', userController.refreshToken);

module.exports = router;
