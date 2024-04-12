const CommentService = require('../services/CommentService');

//create a new comment
const createComment = async (req, res) => {
    try {
        const { content } = req.body;
        console.log('res body: ', res.body);
        if (!content) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await CommentService.createComment(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

//get chapter by story id
const getCommentByStoryId = async (req, res) => {
    try {
        const storyId = req.params.storyId;
        const response = await CommentService.getCommentByStoryId(storyId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}


module.exports = {
    getCommentByStoryId,
    createComment,

}