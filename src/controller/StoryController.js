const Story = require('../model/Story.model');
const StoryService = require('../services/StorySecvice');

const createStory = async (req, res) => {
    try {
        const { name, description, category, content, author, image, id_Member } = req.body;
        if (!name || !description || !category || !content || !author || !image || !id_Member) {
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
        let storyId = req.params.id;
        if (!storyId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The storyId is required'
            })
        }

        const response = await StoryService.getDetailStory(storyId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllStory = async (req, res) => {
    try {
        const { page } = req.query;
        const response = await StoryService.getAllStory(Number(page) || 0);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const getStoriesByMemberId = async (req, res) => {
    try {
        const response = await StoryService.getStoriesByMemberId();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}


module.exports = {
    createStory,
    updateStory,
    getDetailStory,
    getAllStory,
    getStoriesByMemberId
}
