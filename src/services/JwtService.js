const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const genneralAccessToken = async (payload) => {
    const access_Token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '1h' });

    return access_Token;
}

const genneralRefreshToken = async (payload) => {
    const refresh_Token = jwt.sign({
        ...payload
    }, process.env.REFRESS_TOKEN, { expiresIn: '365d' });

    return refresh_Token;
}

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESS_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: 'ERR',
                        message: 'The authemtication'
                    })
                }
                const access_token = await genneralAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })
                resolve({
                    status: 'OK',
                    message: 'SUCESS',
                    access_token
                })
            })
        } catch (e) {
            reject(e)
        }
    })

}

module.exports = { genneralAccessToken, genneralRefreshToken, refreshTokenJwtService };
