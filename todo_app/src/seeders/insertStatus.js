module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('statuses', [{
      nameStatus: 'Inprogress'
    }, {
      nameStatus: 'Completed'
    }, {
      nameStatus: 'Closed'
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('statuses', null, {});
  }
};
