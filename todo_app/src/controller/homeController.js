const { verifyToken } = require("../middleware/JWTAction");
const { getUserWithEmail } = require("../service/userService");

const getHomePage = async (req, res) => {
    let cookies = req.cookies;

    if (cookies && cookies.jwt) {
        let decoded = verifyToken(cookies.jwt);
        let email = decoded.email;
        let user = await getUserWithEmail(email);
        let nameUser = user.name;
        return res.render('home.ejs', { cookies, nameUser });
    };

    return res.render('home.ejs', { cookies, nameUser: '' });
};

module.exports = {
    getHomePage
};