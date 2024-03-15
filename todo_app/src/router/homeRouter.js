const express = require('express');
const { getHomePage } = require('../controller/homeController');
const homeRouter = express.Router();

homeRouter.get('/', getHomePage);

module.exports = homeRouter;
