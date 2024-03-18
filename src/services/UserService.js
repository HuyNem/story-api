const User = require('../model/User.model');
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { email, password, confirmPassword } = newUser;
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: "OK",
                    message: "The email is already"
                })
            }
            const hash = bcrypt.hashSync(password, 10);

            const createUser = await User.create({
                email,
                password: hash, //password
            });
            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createUser
                })
            }
        } catch (e) {
            reject(e);
        };
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: "ERR",
                    message: "Email không tồn tại"
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)

            if (!comparePassword) {
                resolve({
                    status: "ERR",
                    message: "Email hoặc mật khẩu không chính xác"
                })
            }

            const access_token = await genneralAccessToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin
            })
            const refresh_token = await genneralRefreshToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin
            })

            resolve({
                status: "OK",
                message: "Login success",
                access_token: access_token
            })

        } catch (e) {
            reject(e);
        };
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            });
            console.log('check user: ', checkUser);
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'User not found'
                })
            }
            const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
            console.log('update user: ', updateUser);

            resolve({
                status: "OK",
                message: "Success",
                data: updateUser
            })
        } catch (e) {
            reject(e);
        };
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            });
            console.log('check user: ', checkUser);
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'User not found'
                })
            }

            // await User.findByIdAndDelete(id);
            resolve({
                status: "OK",
                message: "Delete user success",
            })
        } catch (e) {
            reject(e);
        };
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find();
            resolve({
                status: 'OK',
                message: 'get all users successfully',
                data: allUser
            })
        } catch (e) {
            reject(e);
        };
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
};
