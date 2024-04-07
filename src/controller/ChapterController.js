const ChapterService = require('../services/ChapterService');

//create chapter
const createChapter = async (req, res) => {
    try {
        const { chapNum, title, content, storyId } = req.body;
        if (!chapNum || !title || !content || !storyId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await ChapterService.createChapter(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

//edit chapter

//delete chapter
//delete category
const deleteChapter = async (req, res) => {
    try {
        const chapterId = req.params.id;
        if (!chapterId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The chapter id is required'
            })
        }
        const response = await ChapterService.deleteChapter(chapterId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

//get all chapter
const getAllChapter = async (req, res) => {
    try {
        const storyId = req.params.storyId;
        const response = await ChapterService.getAllChapter(storyId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

module.exports = {
    createChapter,
    getAllChapter,
    deleteChapter
}

