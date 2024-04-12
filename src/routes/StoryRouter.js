const express = require('express');
const router = express.Router();
const StoryController = require('../controller/StoryController');
const authMiddleware = require('../middleware/authMiddleware');

//get new story
router.get('/new-story', StoryController.getNewStory);

//get approved stories
router.get('/get-approved-stories', StoryController.getApprovedStories);

//duyệt truyện
router.put('/approval-story/:id', StoryController.approvalStory);

//get pending approval stories
router.get('/get-unapproved-stories', StoryController.getPendingApprovalStories);

//get member owned stories
router.get('/get-member-stories/:userId', StoryController.getMemberStories);

//get tất cả truyện thuộc thể loại
router.get('/get-story-by-category/:category/:page', StoryController.getStoryByCategory);

//đăng truyện
router.post('/create-story', StoryController.createStory);

//get story by id
router.get('/get-story/:id', StoryController.getStoryById);

//sửa truyện
router.put('/update-story/:id', StoryController.updateStory);

//chi tiet truyen (story information)
router.get('/:name', StoryController.getDetailStory);

//get all story
router.get('/', StoryController.getAllStory);

module.exports = router;