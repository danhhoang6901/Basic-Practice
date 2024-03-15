module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('statuses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nameStatus: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('statuses');
    }
};