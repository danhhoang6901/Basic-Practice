const Sequelize = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('todo_app', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3307',
    operatorsAliases: 0,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = connectDB;
