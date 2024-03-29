const express = require('express');
const router = express.Router();
const StoryController = require('../controller/StoryController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create-story', StoryController.createStory);
router.put('/update-story/:id', StoryController.updateStory);
//chi tiet truyen
router.get('/:id', StoryController.getDetailStory);
//get stories by member id
router.get('/get-all-stories-by-member-id', StoryController.getStoriesByMemberId)
//get all story
router.get('/', StoryController.getAllStory);

module.exports = router;