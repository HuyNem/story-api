const Story = require('../model/Story.model');
const { all } = require('../routes/StoryRouter');


//get story completed
const getCompleted = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const storyCompleted = await Story.find({ isCompleted: true }).limit(6);
            resolve({
                status: 'OK',
                message: 'get all story completed successfully',
                data: storyCompleted,
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
const getAllStory = () => {
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

//get new story
const getNewStory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const limit = 12;
            const newStory = await Story.find({ status: true }).sort({ createdAt: -1 }).limit(limit);
            resolve({
                status: 'OK',
                message: 'get all story successfully',
                data: newStory,
            })
        } catch (e) {
            reject(e);
        };
    })
}

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
            const allMemberStories = await Story.find({ id_Member: userId });
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

//search story name or author
const search = (q) => {
    return new Promise(async (resolve, reject) => {
        try {
            const regex = new RegExp(q, 'i');
            const story = await Story.find({
                $and: [
                    { $or: [{ name: regex }, { author: regex }] },
                    { status: true }
                ]
            });
            resolve({
                status: 'OK',
                message: 'get all story successfully',
                data: story,
            })
        } catch (e) {
            reject(e);
        };
    })
}

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

//update story
const updateStory = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkStory = await Story.findOne({ _id: id });
            if (checkStory === null) {
                resolve({
                    status: 'OK',
                    message: 'Story not found'
                })
            }
            const checkName = await Story.findOne({
                name: data.name,
                _id: { $ne: id }
            });
            if (checkName) {
                resolve({
                    status: 'AE',
                    message: 'Tên truyện đã tồn tại'
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

//get pending approval stories
const getPendingApprovalStories = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const stories = await Story.find({ status: false });
            // Xử lý ngày thành chuỗi ngày/tháng/năm
            const formattedStories = stories.map(story => ({
                ...story.toObject(),
                createdDate: new Date(story.createdAt).toLocaleDateString(),
            }));
            resolve({
                status: 'OK',
                message: 'get pending approval stories successfully',
                data: formattedStories,
            });
        } catch (e) {
            reject(e);
        };
    });
}


//get approved stories
const getApprovedStories = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const stories = await Story.find({ status: true });
            // format date
            const formattedStories = stories.map(story => ({
                ...story.toObject(),
                createdDate: new Date(story.createdAt).toLocaleDateString(),
            }));
            resolve({
                status: 'OK',
                message: 'get approved stories successfully',
                data: formattedStories,
            })
        } catch (e) {
            reject(e);
        };
    })
}

//approval stories
const approvalStory = (storyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const approvalStory = await Story.findByIdAndUpdate(storyId, { status: true });
            resolve({
                status: 'OK',
                message: 'approval story successfully',
                data: approvalStory,
            })
        } catch (e) {
            reject(e);
        };
    })
}

//increase view
const increaseView = (storyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const story = await Story.findOne({ _id: storyId });
            const increseView = story.view + 1
            const increase = await Story.findByIdAndUpdate(storyId, { view: increseView });
            resolve({
                status: 'OK',
                message: 'increase successfully',
                data: increase,
            })
        } catch (e) {
            reject(e);
        };
    })
}

//get top view
const getTopView = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const limit = 10;
            const topView = await Story.find().sort({ view: -1 }).limit(limit);
            resolve({
                status: 'OK',
                message: 'get top view successfully',
                data: topView,
            })
        } catch (e) {
            reject(e);
        };
    })
}


module.exports = {
    createStory,
    updateStory,
    getDetailStory,
    getAllStory,
    getStoriesByMemberId,
    getStoryByCategory,
    getMemberStory,
    getStoryId,
    getPendingApprovalStories,
    getApprovedStories,
    getNewStory,
    approvalStory,
    increaseView,
    getTopView,
    search,
    getCompleted,

};
