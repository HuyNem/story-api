const Story = require('../model/Story.model');


//create story
const createStory = (newStory) => {
    return new Promise(async (resolve, reject) => {
        const { name, description, category, author, image, id_Member } = newStory;
        try {
            const checkName = await Story.findOne({
                name: name
            })
            if (checkName !== null) {
                resolve({
                    status: "AR",
                    message: "Tên truyện đã tồn tại"
                })
            }
            const createStory = await Story.create({
                name, description, category, author, image, id_Member
            });
            if (createStory) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createStory
                })
            }
        } catch (e) {
            reject(e);
        };
    })
}

const updateStory = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkStory = await Story.findOne({
                _id: id,
            });
            const checkName = await Story.findOne({
                name: data.name
            });
            if (checkName) {
                resolve({
                    status: 'AR',
                    message: 'Tên truyện đã tồn tại'
                })
            }
            if (checkStory === null) {
                resolve({
                    status: 'OK',
                    message: 'Story not found'
                })
            }
            const updateStory = await Story.findByIdAndUpdate(id, data, { new: true });
            resolve({
                status: "OK",
                message: "Success",
                data: updateStory
            })
        } catch (e) {
            reject(e);
        };
    })
}

//get story by id (edit)
const getStoryId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const story = await Story.findOne({ _id: id });
            if (story === null) {
                resolve({
                    status: 'ERR',
                    message: 'Story not found'
                });
            };
            resolve({
                status: 'OK',
                message: 'get story successfully',
                data: story
            })
        } catch (e) {
            reject(e);
        };
    })
}

const getDetailStory = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const story = await Story.findOne({ name: name });
            if (story === null) {
                resolve({
                    status: 'ERR',
                    message: 'Story not found'
                });
            };
            resolve({
                status: 'OK',
                message: 'get story successfully',
                data: story
            })
        } catch (e) {
            reject(e);
        };
    })
}
//get all story
const getAllStory = (page) => {
    return new Promise(async (resolve, reject) => {
        try {
            const limit = 12;
            const allStory = await Story.find().limit(limit);
            resolve({
                status: 'OK',
                message: 'get all story successfully',
                data: allStory,
            })
        } catch (e) {
            reject(e);
        };
    })
}
// const getAllStory = (page) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const limit = 12;
//             const totalStory = await Story.countDocuments();
//             const allStory = await Story.find().limit(limit).skip(page * limit);
//             resolve({
//                 status: 'OK',
//                 message: 'get all story successfully',
//                 data: allStory,
//                 total: totalStory,
//                 pageCurrent: Number(page + 1),
//                 totalPage: Math.ceil(totalStory / limit)
//             })
//         } catch (e) {
//             reject(e);
//         };
//     })
// }

const getStoriesByMemberId = (memberId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allStory = await Story.find({
                id_Member: memberId
            });
            resolve({
                status: 'OK',
                message: 'get all story by member id successfully',
                data: allStory,
            })
        } catch (e) {
            reject(e);
        };
    })
}

//get story by category
const getStoryByCategory = (categoryName, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            const limit = 10;
            const totalStory = await Story.find({ category: categoryName }).countDocuments();

            const storyByCategory = await Story.find({ category: categoryName })
                .limit(limit)
                .skip(page * limit);

            resolve({
                status: 'OK',
                message: 'get story by category',
                data: storyByCategory,
                total: totalStory,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalStory / limit)
            })
        } catch (e) {
            reject(e);
        };
    })
}

//get member story
const getMemberStory = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allMemberStories = await Story.find({ id_Member: userId});
            resolve({
                status: 'OK',
                message: 'get all member stories successfully',
                data: allMemberStories,
            })
        } catch (e) {
            reject(e);
        };
    })
}

//Stories awaiting approval
// const getPendingApprovalStories = (userId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const limit = 12;
//             const allStory = await Story.find().limit(limit);
//             resolve({
//                 status: 'OK',
//                 message: 'get all story successfully',
//                 data: allStory,
//             })
//         } catch (e) {
//             reject(e);
//         };
//     })
// }



module.exports = {
    createStory,
    updateStory,
    getDetailStory,
    getAllStory,
    getStoriesByMemberId,
    getStoryByCategory,
    getMemberStory,
    getStoryId,
    
};
