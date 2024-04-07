const express = require('express');
const router = express.Router();
const ChapterController = require('../controller/ChapterController');

//Thêm chương
router.post('/create-chapter', ChapterController.createChapter);

//Sửa chương
// router.post('/create-chapter', ChapterController.createChapter);

//Xóa chương
router.delete('/delete-chapter/:id', ChapterController.deleteChapter);

//get all story
router.get('/:storyId', ChapterController.getAllChapter);

module.exports = router;
