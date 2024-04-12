const Comment = require('../model/Comment.model');

//create a new comment
const createComment = (newComment) => {
    return new Promise(async (resolve, reject) => {
        const { userId, storyId, content } = newComment;
        try {
            const createComment = await Comment.create({
                userId, storyId, content
            });
            if (createComment) {
                resolve({
                    status: 'OK',
                    message: 'comment successfully!',
                    data: createComment
                })
            }
        } catch (e) {
            reject(e);
        };
    })
}

//get comment by story id
const getCommentByStoryId = (storyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const comments = await Comment.find({ storyId: storyId });
            resolve({
                status: 'OK',
                message: 'get comment successfully',
                data: comments,
            })
        } catch (e) {
            reject(e);
        };
    })
}

module.exports = {
    getCommentByStoryId,
    createComment,

}