const Category = require('../model/Category.model');

const getAllCategory = (page) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allCategory = await Category.find();
            resolve({
                status: 'OK',
                message: 'get all category successfully',
                data: allCategory,
            })
        } catch (e) {
            reject(e);
        };
    })
}



module.exports = {
    getAllCategory
};
