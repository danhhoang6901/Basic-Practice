module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('todos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING(50)
            },
            description: {
                type: Sequelize.TEXT
            },
            dueDate: {
                type: Sequelize.DATE
            },
            priorityId: {
                type: Sequelize.INTEGER
            },
            statusId: {
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('todos');
    }
};