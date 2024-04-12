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

//EDIT CHAPTER
//get chapter by id
const getChapterById = async (req, res) => {
    try {
        let chapterId = req.params.id;
        if (!chapterId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The storyId is required'
            })
        }

        const response = await ChapterService.getChapterId(chapterId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
//update chapter
const updateChapter = async (req, res) => {
    try {
        const chapterId = req.params.id;
        const data = req.body;
        if (!chapterId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The storyId is required'
            })
        }
        const response = await ChapterService.updateChapter(chapterId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

//delete chapter
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

//get chapter
const getChapter = async (req, res) => {
    try {
        const storyId = req.params.storyId;
        const chamNum = req.params.chapNum;
        const response = await ChapterService.getChapter(storyId, chamNum);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

//get chapter by story id
const getChapterByStoryId = async (req, res) => {
    try {
        const storyId = req.params.storyId;
        const response = await ChapterService.getChapterByStoryId(storyId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

module.exports = {
    createChapter,
    getChapterByStoryId,
    deleteChapter,
    getChapterById,
    updateChapter,
    getChapter
}

