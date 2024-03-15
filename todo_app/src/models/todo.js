const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Todo extends Model {
        static associate(models) {
            Todo.belongsTo(models.user);
            Todo.belongsTo(models.status);
            Todo.belongsTo(models.priority);
        }
    };

    Todo.init({
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        dueDate: DataTypes.DATE,
        statusId: DataTypes.INTEGER,
        priorityId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'todo',
        timestamps: false
    });

    return Todo;
};
