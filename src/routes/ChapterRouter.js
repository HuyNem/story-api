const express = require('express');
const router = express.Router();
const ChapterController = require('../controller/ChapterController');

//Thêm chương
router.post('/create-chapter', ChapterController.createChapter);

//get chapter by id
router.get('/get-chapter/:id', ChapterController.getChapterById);

//Sửa chương
router.put('/update-chapter/:id', ChapterController.updateChapter);

//Xóa chương
router.delete('/delete-chapter/:id', ChapterController.deleteChapter);

//get chapters
router.get('/:storyId/:chapNum', ChapterController.getChapter);

//get all chapters
router.get('/:storyId', ChapterController.getChapterByStoryId);

module.exports = router;
