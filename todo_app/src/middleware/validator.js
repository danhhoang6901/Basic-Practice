const { check } = require('express-validator');
const db = require('../models/index');
const {
    getAllUsers,
    getUserWithEmail,
    getUserWithPhoneNumber,
    checkPassword
} = require('../service/userService');

const validateRegisterUser = () => {
    return [
        check("email", "* Email is required").trim().notEmpty(),
        check("name", "* Name is required").trim().notEmpty(),
        check("password", "* Password is required").trim().notEmpty(),
        check("confirmPassword", "* Confirm password is required").trim().notEmpty(),
        check("email").custom(checkEmailExists),
        check("password", "* Password more than 5 degits").isLength({ min: 5 }),
        check("confirmPassword").custom(checkConfirmPasswordNotMatch)
    ];
};

const validateLoginUser = () => {
    return [
        check("email", "* Email is required").trim().notEmpty(),
        check("password", "* Password is required").trim().notEmpty(),
        check("password").custom(checkPasswordNotMatch),
        check("email").custom(checkEmailUnregistered)
    ];
};

const validateForgotPassword = () => {
    return [
        check("email").custom(checkEmailUnregistered)
    ];
};

const validateResetPassword = () => {
    return [
        check("newPassword", "* New password is required").trim().notEmpty(),
        check("confirmNewPassword", "*Confirm new password is required").trim().notEmpty(),
        check("confirmNewPassword").custom(checkConfirmPasswordNotMatch)
    ];
};

const checkConfirmPasswordNotMatch = async (confirmPassword, password) => {
    let inputPasswordUser = password.req.body.password;
    let inputConfirmPassword = confirmPassword;

    if (inputConfirmPassword !== inputPasswordUser) {
        throw new Error('* Confirm password not match!');

    };

    return true;
};

const checkPasswordNotMatch = async (inputPassword, email) => {
    let inputEmail = email.req.body.email;
    let user = await getUserWithEmail(inputEmail);
    let result = await checkPassword(inputPassword, user.password);

    if (!result) {
        throw new Error('* Password not match!');
    };

    return true;
};

const checkEmailUnregistered = async (email) => {
    let user = await getUserWithEmail(email);

    if (!user) {
        throw new Error('* Email unregistered!');
    };

    return true;
};

const checkEmailExists = async (email) => {
    let user = await getUserWithEmail(email);

    if (user) {
        throw new Error('* Email exists!');
    };

    return true;
};

const checkPhoneNumberExists = async (phoneNumber) => {
    let user = await getUserWithPhoneNumber(phoneNumber);

    if (user) {
        throw new Error('* Phone number exists!');
    };

    return true;
};

module.exports = {
    validateRegisterUser,
    validateLoginUser,
    validateForgotPassword,
    validateResetPassword
};