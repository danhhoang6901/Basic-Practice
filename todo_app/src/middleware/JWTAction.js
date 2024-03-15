const jwt = require('jsonwebtoken');
require('dotenv').config();

const nonSecurePaths = [
    '/user/register-submit',
    '/user/login',
    '/user/login-submit',
    '/user/register',
    '/user/confirm-otp',
    '/user/logout',
    '/',
    '/user/confirm-otp-submit',
    '/user/check-email',
    '/user/check-email-submit',
    '/user/resend-otp',
    '/user/reset-password'
];

//ma hoa token
const createJWT = (payload) => {
    let key = process.env.JWT_SECRET
    let token = null;
    try {
        token = jwt.sign(payload, key, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
    } catch (error) {
        console.log(error);
    }

    return token;
};

//giai ma token
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;

    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log(error);
    };

    return decoded;
};

const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) {
        return next();
    };

    let cookies = req.cookies;

    if (cookies && cookies.jwt) {
        let token = cookies.jwt;
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            next();
        } else {
            return res.render('error.ejs', { msg: 'Not authenticated the user. Please login...', nameErr: '401', cookies: req.cookies })
        }
    } else {
        return res.render('error.ejs', { msg: 'Not authenticated the user. Please login...', nameErr: '401', cookies: req.cookies })
    }
};

module.exports = {
    createJWT,
    verifyToken,
    checkUserJWT
};