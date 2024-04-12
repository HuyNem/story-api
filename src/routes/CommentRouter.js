const express = require('express');
const router = express.Router();
const CommentController = require('../controller/CommentController');

//comment
router.post('/create-comment', CommentController.createComment);

//get comment by id story
router.get('/get-comments/:storyId', CommentController.getCommentByStoryId);

module.exports = router;