const User = require('../model/User.model');
const bcrypt = require("bcryptjs");
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = newUser;
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: "ERR_EMAIL_AE",
                    message: "The email is already"
                })
            }
            const hash = bcrypt.hashSync(password, 10);

            const name = email.slice(0, email.indexOf('@'));

            const createUser = await User.create({
                email,
                password: hash, //password
                name
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
                access_token: access_token,
                refresh_token: refresh_token
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
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'User not found'
                })
            }
            const updateUser = await User.findByIdAndUpdate(id, data, { new: true });

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

const changePass = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);
            const checkUser = await User.findOne({
                _id: id,
            });
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'User not found'
                })
            }
            const hash = bcrypt.hashSync(data.password, 10);
            console.log('hast: ', hash);
            const updatePass = await User.findByIdAndUpdate(id, { password: hash }, { new: true });

            resolve({
                status: "OK",
                message: "Success",
                data: updatePass
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
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }

            await User.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await User.find();
            // format date
            const formattedUsers = users.map(user => ({
                ...user.toObject(),
                createdDate: new Date(user.createdAt).toLocaleDateString(),
            }));
            resolve({
                status: 'OK',
                message: 'get all users successfully',
                data: formattedUsers
            })
        } catch (e) {
            reject(e);
        };
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    changePass
};
