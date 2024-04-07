const express = require('express');
const router = express.Router();
const StoryController = require('../controller/StoryController');
const authMiddleware = require('../middleware/authMiddleware');


//truyện theo thành viên
router.get('/get-member-stories/:userId', StoryController.getMemberStories);
//truyện chưa được duyệt (admin)
// router.get('/story-by-admin', StoryController.getPendingApprovalStories);

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