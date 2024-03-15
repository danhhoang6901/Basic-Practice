const db = require('../models/index');

const getAllStatuses = async () => {
    try {
        let listStatuses = await db.status.findAll({
            raw: true,
            nest: true
        });

        return listStatuses;
    } catch (error) {
        console.log(error);
    };
};

module.exports = {
    getAllStatuses
}