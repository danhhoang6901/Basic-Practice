module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('priorities', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            namePriority: {
                type: Sequelize.STRING(10)
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('priorities');
    }
};