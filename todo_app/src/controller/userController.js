require('dotenv').config();
const {
    insertUser,
    checkPassword,
    getAllUsers,
    sendOTP,
    generateOTP,
    updateUserWithEmail,
    getUserWithEmail
} = require('../service/userService');
const { createJWT } = require('../middleware/JWTAction');
const { validationResult } = require('express-validator');

const getLoginUserPage = (req, res) => {
    let cookies = req.cookies;

    if (cookies && cookies.jwt) {
        return res.redirect('/todo/list');
    };

    return res.render('user/login.ejs', { errors: '', password: '', email: '' });
};

const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await getUserWithEmail(email);
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('user/login.ejs', { errors: errors.mapped(), password, email });
        };

        if (user && (checkPassword(password, user.password) === true)) {
            if (user.verifyOTP === 1) {
                let payload = {
                    email: email,
                    password: password
                };

                let token = createJWT(payload);
                res.cookie('jwt', token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
                console.log('Login succeed!');

                return res.redirect('/');
            };

            const otp = generateOTP(); // Thay thế hàm này bằng cách sinh mã OTP của bạn
            const isSent = await sendOTP(user.email, otp);
            if (isSent) {
                return res.render('user/confirmOTP.ejs', { email, otp });
            };
        };

        return res.render('user/login.ejs', { errors: errors.mapped(), password, email });
    } catch (error) {
        console.log(error);
    };
};

const getRegisterUserPage = (req, res) => {
    let cookies = req.cookies;

    if (cookies && cookies.jwt) {
        return res.redirect('/todo/list');
    };

    return res.render('user/register.ejs', { user: {}, errors: '' });
};

const registerUser = async (req, res) => {
    const user = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('user/register.ejs', { user, errors: errors.mapped() });
    };

    try {
        await insertUser(user);
        console.log('Register user succeed!');

        const otp = generateOTP(); // Thay thế hàm này bằng cách sinh mã OTP của bạn
        const isSent = await sendOTP(user.email, otp);

        if (isSent) {
            return res.render('user/confirmOTP.ejs', { email: user.email, otp, nameOTP: 'register' });
        };
    } catch (error) {
        console.log(error);
    };
};

const confirmOTP = async (req, res) => {
    const { email, otp, inputOTP, nameOTP } = req.body;

    if (inputOTP === otp) {
        if (nameOTP === 'register') {
            await updateUserWithEmail(email);
            console.log('Verify OTP!');

            return res.redirect('/user/login');
        };

        return res.render('user/resetPassword.ejs', { errors: '', newPassword: '', confirmNewPassword: '', email });
    };

    return res.render('user/confirmOTP', { email, otp });
};

const resendOTP = async (req, res) => {
    let email = req.body.email;
    let nameOTP = req.body.nameOTP;
    const otp = generateOTP(); // Thay thế hàm này bằng cách sinh mã OTP của bạn
    const isSent = await sendOTP(email, otp);

    if (isSent) {
        return res.render('user/confirmOTP.ejs', { email, otp, nameOTP });
    };
};

const logout = (req, res) => {
    try {
        res.clearCookie('jwt'); //clear cookies

        return res.render('user/login.ejs', { user: {}, errors: '', password: '', email: '' });
    } catch (error) {
        console.log(error);
    };
};

const getCheckEmailPage = (req, res) => {
    return res.render('user/forgotPassword.ejs', { errors: '', email: '' });
};

const checkEmail = async (req, res) => {
    let email = req.body.email;
    let user = await getUserWithEmail(email);
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('user/forgotPassword.ejs', { errors: errors.mapped(), email });
    };

    if (user) {
        const otp = generateOTP(); // Thay thế hàm này bằng cách sinh mã OTP của bạn
        const isSent = await sendOTP(email, otp);
        if (isSent) {
            return res.render('user/confirmOTP.ejs', { email, otp, nameOTP: 'checkEmail' });
        };
    };
};

const resetPassword = async (req, res) => {
    let { email, newPassword, confirmNewPassword } = req.body;
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('user/resetPassword.ejs', { errors: errors.mapped(), newPassword, confirmNewPassword, email });
    };

    try {
        await updateUserPasswordWithEmail(email, newPassword);
        console.log('Reset password succeed!');

        return res.redirect('/user/login');
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getLoginUserPage,
    loginUser,
    getRegisterUserPage,
    registerUser,
    confirmOTP,
    logout,
    getCheckEmailPage,
    checkEmail,
    resendOTP,
    resetPassword
};