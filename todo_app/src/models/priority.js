const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Priority extends Model {
        static associate(models) {
            Priority.hasMany(models.todo);
        }
    };

    Priority.init({
        namePriority: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'priority',
        timestamps: false
    });

    return Priority;
};
