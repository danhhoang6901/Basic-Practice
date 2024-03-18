const db = require('../models/index');
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const nodemailer = require('nodemailer');
require('dotenv').config();

const getAllUsers = async () => {
    try {
        let listUser = await db.user.findAll();

        return listUser;
    } catch (error) {
        console.log(error)
    }
}

const insertUser = async (user) => {
    try {
        let hashPassword = await hashPasswordFromBcrypt(user.password);

        await db.user.create({
            name: user.name,
            password: hashPassword,
            email: user.email
        });
    } catch (error) {
        console.log(error);
    };
};

const hashPasswordFromBcrypt = async (password) => {
    try {
        let hashPassword = await bcrypt.hashSync(password, salt);

        return hashPassword;
    } catch (error) {
        console.log(error);
    };
};

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
};

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};


// Hàm gửi OTP
const sendOTP = async (recipientEmail, otp) => {
    // Tạo transporter với cấu hình SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    try {
        // Nội dung email
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: recipientEmail,
            subject: 'Verify OTP',
            text: `OTP: ${otp}`,
        };

        // Gửi email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);

        return true;
    } catch (error) {
        console.error('Error sending email: ', error);
        return false;
    }
};

const updateUserWithEmail = async (email) => {
    try {
        await db.user.update({
            verifyOTP: true,
        }, {
            where: {
                email: email
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const getUserWithEmail = async (email) => {
    try {
        let user = await db.user.findOne({
            where: {
                email: email
            },
            raw: true,
            nest: true
        });

        return user;
    } catch (error) {
        console.log(error);
    }
};

const getUserWithPhoneNumber = async (phoneNumber) => {
    try {
        let user = await db.user.findOne({
            where: {
                phoneNumber: phoneNumber
            }
        });

        return user;
    } catch (error) {
        console.log(error);
    }
};

const updateUserPasswordWithEmail = async (email, newPassword) => {
    try {
        let hashNewPassword = await hashPasswordFromBcrypt(newPassword);
        await db.user.update({
            password: hashNewPassword
        }, {
            where: {
                email: email
            }
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    insertUser,
    checkPassword,
    getAllUsers,
    generateOTP,
    sendOTP,
    updateUserWithEmail,
    getUserWithEmail,
    getUserWithPhoneNumber,
    updateUserPasswordWithEmail
}