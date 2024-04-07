const Story = require('../model/Story.model');
const Chapter = require('../model/Story.model');
const StoryService = require('../services/StorySecvice');


//create story
const createStory = async (req, res) => {
    try {
        const { name, description, category, author, image, id_Member } = req.body;
        if (!name || !description || !category || !author || !image || !id_Member) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await StoryService.createStory(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

//get story by id
const getStoryById = async (req, res) => {
    try {
        let storyId = req.params.id;
        if (!storyId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The storyId is required'
            })
        }

        const response = await StoryService.getStoryId(storyId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateStory = async (req, res) => {
    try {
        const storyId = req.params.id;
        const data = req.body;
        if (!storyId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The storyId is required'
            })
        }
        console.log('story id: ', storyId);
        const response = await StoryService.updateStory(storyId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const getDetailStory = async (req, res) => {
    try {
        let storyName = req.params.name;
        if (!storyName) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The storyId is required'
            })
        }

        const response = await StoryService.getDetailStory(storyName);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

//get all story
const getAllStory = async (req, res) => {
    try {
        const response = await StoryService.getAllStory();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

//get story by category
const getStoryByCategory = async (req, res) => {
    try {
        const { category, page } = req.params;
        if (!category) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The category is required'
            })
        }
        const response = await StoryService.getStoryByCategory(category, (Number(page) || 0));
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

//get member stories
const getMemberStories = async (req, res) => {
    try {
        const userId = req.params.userId;
        const response = await StoryService.getMemberStory(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

//truyện chưa duyệt (admin)
// const getPendingApprovalStories = async (req, res) => {
//     try {
//         const response = await StoryService.getAllStory();
//         return res.status(200).json(response);
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         });
//     }
// }




module.exports = {
    createStory,
    updateStory,
    getDetailStory,
    getAllStory,
    getStoryByCategory,
    getMemberStories,
    getStoryById,

}
