const Category = require('../model/Category.model');

//get all categories
const getAllCategory = () => {
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

//get category by id
const getCategoryById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const category = await Category.findOne({
                _id: id
            });
            if (category === null) {
                resolve({
                    status: 'ERR',
                    message: 'Category not found'
                });
            }
            resolve({
                status: 'OK',
                message: 'get category successfully',
                data: category,
            })
        } catch (e) {
            reject(e);
        };
    })
}

//create a new category
const createCategory = (newCategory) => {
    return new Promise(async (resolve, reject) => {
        const { name, description } = newCategory;
        try {
            const checkName = await Category.findOne({ name: name });
            if (checkName !== null) {
                resolve({
                    status: "AR",
                    message: "Tên danh mục đã tồn tại"
                })
            }

            const createCategory = await Category.create({
                name, description
            });

            if (createCategory) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createCategory
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

//update category
const updateCategory = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCategory = await Category.findOne({
                _id: id,
            });
            if (!checkCategory) {
                resolve({
                    status: 'OK',
                    message: 'Category not found'
                })
            }
            const updateCategory = await Category.findByIdAndUpdate(id, data, { new: true });

            resolve({
                status: "OK",
                message: "update category successfully",
                data: updateCategory
            })
        } catch (e) {
            reject(e);
        };
    })
}

//delete category
const deleteCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCategory = await Category.findOne({
                _id: id
            })
            if (!checkCategory) {
                resolve({
                    status: 'ERR',
                    message: 'The category is not defined'
                })
            }

            await Category.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete category success',
            })
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    getAllCategory,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
};
