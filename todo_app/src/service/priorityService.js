const db = require('../models/index');

const getAllPriorities = async () => {
    try {
        let listPriorities = await db.priority.findAll({
            raw: true,
            nest: true
        });

        return listPriorities;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllPriorities
};