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

//EDIT CHAPTER
//get chapter id (edit)
const getChapterId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const chapter = await Chapter.findOne({ _id: id });
            if (chapter === null) {
                resolve({
                    status: 'ERR',
                    message: 'Story not found'
                });
            };
            resolve({
                status: 'OK',
                message: 'get chapter successfully',
                data: chapter
            })
        } catch (e) {
            reject(e);
        };
    })
}
//update the chapter
const updateChapter = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkChapter = await Chapter.findOne({
                _id: id,
            });
            const checkChapNum = await Chapter.findOne({
                chapNum: data.chapNum,
                storyId: data.storyId,
            });
            if (checkChapter === null) {
                resolve({
                    status: 'ERR',
                    message: 'Chapter not found'
                })
            }
            else if (checkChapNum) {
                resolve({
                    status: 'AR',
                    message: 'Chương này đã tồn tại'
                })
            } else {
                const updateChapter = await Chapter.findByIdAndUpdate(id, data, { new: true });
                resolve({
                    status: "OK",
                    message: "update chapter successfully",
                    data: updateChapter
                })
            }

        } catch (e) {
            reject(e);
        };
    })
}

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

//get chapter
const getChapter = (storyId, chapNum) => {
    return new Promise(async (resolve, reject) => {
        try {
            const chapter = await Chapter.find({ storyId: storyId, chapNum: chapNum});
            resolve({
                status: 'OK',
                message: 'get all chapter successfully',
                data: chapter,
            })
        } catch (e) {
            reject(e);
        };
    })
}

//get chapter by story id
const getChapterByStoryId = (storyId) => {
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
    getChapterByStoryId,
    deleteChapter,
    getChapterId,
    updateChapter,
    getChapter
}