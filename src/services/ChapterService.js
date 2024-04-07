const Chapter = require('../model/Chapter.model');

//create chapter
const createChapter = (newChapter) => {
    return new Promise(async (resolve, reject) => {
        const { chapNum, title, content, storyId } = newChapter;
        try {
            const chapNumber = await Chapter.findOne({
                storyId: storyId,
                chapNum: chapNum,
            })
            if (chapNumber) {
                resolve({
                    status: "AR",
                    message: "Chapter này đã tồn tại"
                })
            } else {
                const createChapter = await Chapter.create({
                    chapNum, title, content, storyId
                });
                if (createChapter) {
                    resolve({
                        status: 'OK',
                        message: 'Đăng chapter mới thành công',
                        data: createChapter
                    })
                }
            }
        } catch (e) {
            reject(e);
        };
    })
}

//update the chapter

//delete the chapter
//delete category
const deleteChapter = (chapterId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkChapter = await Chapter.findOne({
                _id: chapterId
            })
            if (!checkChapter) {
                resolve({
                    status: 'ERR',
                    message: 'The category is not defined'
                })
            }

            await Chapter.findByIdAndDelete(chapterId)
            resolve({
                status: 'OK',
                message: 'Delete category success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

//get all chapter
const getAllChapter = (storyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allChapter = await Chapter.find({ storyId: storyId });
            resolve({
                status: 'OK',
                message: 'get all chapter successfully',
                data: allChapter,
            })
        } catch (e) {
            reject(e);
        };
    })
}


module.exports = {
    createChapter,
    getAllChapter,
    deleteChapter
}