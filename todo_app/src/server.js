const express = require('express');
require('dotenv').config();
const configViewEngine = require('./config/viewEngine');
const connectDB = require('./config/connectDB');
const cookieParser = require('cookie-parser');
const routers = require('./router/routers');

const app = express();

const port = process.env.PORT || 8081;
const hostname = process.env.HOST_NAME;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

configViewEngine(app);

routers(app);

connectDB();

app.use((req, res) => {
    return res.render('error.ejs', { msg: '404 NOT FOUND!', nameErr: '404', cookies: req.cookies });
});

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
});