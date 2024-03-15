const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Status extends Model {
        static associate(models) {
            Status.hasMany(models.todo);
        }
    };

    Status.init({
        nameStatus: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'status',
        timestamps: false
    });

    return Status;
};
