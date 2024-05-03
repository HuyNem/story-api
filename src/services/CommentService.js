const Comment = require('../model/Comment.model');

//create a new comment
const createComment = (newComment) => {
    return new Promise(async (resolve, reject) => {
        const { userId, storyId, nameUser, content } = newComment;
        try {
            const createComment = await Comment.create({
                userId, storyId, nameUser, content
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
            const comments = await Comment.find({ storyId: storyId }).sort({ createdAt: -1 });
            // Xử lý ngày thành chuỗi ngày/tháng/năm
            const formattedComments = comments.map(cmt => ({
                ...cmt.toObject(),
                createdDate: new Date(cmt.createdAt).toLocaleDateString(),
            }));
            resolve({
                status: 'OK',
                message: 'get comment successfully',
                data: formattedComments,
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