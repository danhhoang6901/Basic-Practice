module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('priorities', [{
            namePriority: 'Low'
        }, {
            namePriority: 'Medium'
        }, {
            namePriority: 'High'
        }]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('priorities', null, {});
    }
};
