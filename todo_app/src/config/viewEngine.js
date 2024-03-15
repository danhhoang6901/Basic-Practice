const path = require('path');
const express = require('express');

const configViewEngine = (app) => {
    // app.set('views', './src/views/');
    app.set('views', path.join('./src', 'views')); //__dirname: lay truc tiep duong dan cua thu muc hien tai minh dang dung
    app.set('view engine', 'ejs');
    app.use(express.static(path.join('./src', 'public')));
};

module.exports = configViewEngine; //export de file khac co the dung (export default)