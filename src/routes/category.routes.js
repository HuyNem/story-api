// const express = require('express');
// const app = express();
// const categoryExpressRoute = express.Router();
// let CategorySchema = require('../model/Category.model');


// // ----------------------------------------------------------------
// categoryExpressRoute.route('/category-list').get(async (req, res, next) => {
//     try {
//         const data = await CategorySchema.find();
//         res.json(data);
//     } catch (err) {
//         return next(err);
//     }
// });

// // edit category
// categoryExpressRoute.route('/edit-category/:id').get(async (req, res, next) => {
//     try {
//         const data = await CategorySchema.findById(req.params.id);
//         res.json(data);
//     }
//     catch (err) {
//         return next(err);
//     }
// });

// //add category
// categoryExpressRoute.route('/add-category').post(async (req, res, next) => {
//     try {
//         const newData = await CategorySchema.create(req.body);
//         res.json(newData);
//     }
//     catch (err) {
//         return next(err);
//     }
// });

// //delete category
// categoryExpressRoute.route('/delete-category/:id').delete(async (req, res, next) => {
//     try {
//         const deletedData = await CategorySchema.findByIdAndDelete(req.params.id);
//         if (!deletedData) {
//             return res.status(404).json({ msg: "Category not found" });
//         }
//         res.status(200).json({
//             msg: "Category deleted successfully"
//         });
//     } catch (err) {
//         return next(err);
//     }
// });

// //update category
// categoryExpressRoute.route('/update-category/:id').put(async (req, res, next) => {
//     try {
//         const data = await CategorySchema.findByIdAndUpdate(req.params.id, {
//             $set: req.body
//         });
//         res.json(data);
//         res.status(200).json({
//             msg: "Category update successfully"
//         });
//     }
//     catch (err) {
//         return next(err);
//     }
// });



// module.exports = categoryExpressRoute;