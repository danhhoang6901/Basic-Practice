module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING(20)
            },
            password: {
                type: Sequelize.STRING(100)
            },
            phoneNumber: {
                type: Sequelize.STRING(15)
            },
            gender: {
                type: Sequelize.BOOLEAN
            },
            address: {
                type: Sequelize.STRING(100)
            },
            email: {
                type: Sequelize.STRING(30)
            },
            verifyOTP: {
                type: Sequelize.BOOLEAN
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    }
};