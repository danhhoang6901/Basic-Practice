const express = require('express');
const userRouter = express.Router();
const {
    getLoginUserPage,
    getRegisterUserPage,
    registerUser,
    loginUser,
    confirmOTP,
    logout,
    getCheckEmailPage,
    checkEmail,
    resendOTP,
    resetPassword
} = require('../controller/userController');
const {
    validateRegisterUser,
    validateLoginUser,
    validateForgotPassword,
    validateResetPassword
} = require('../middleware/validator');

userRouter.get('/login', getLoginUserPage);
userRouter.post('/login-submit', validateLoginUser(), loginUser);
userRouter.get('/register', getRegisterUserPage);
userRouter.post('/register-submit', validateRegisterUser(), registerUser);
userRouter.post('/logout', logout);
userRouter.post('/confirm-otp-submit', confirmOTP);
userRouter.post('/resend-otp', resendOTP);
userRouter.get('/check-email', getCheckEmailPage);
userRouter.post('/check-email-submit', validateForgotPassword(), checkEmail);
userRouter.post('/reset-password', validateResetPassword(), resetPassword);

module.exports = userRouter;
