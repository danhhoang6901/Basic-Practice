const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.todo);
        }
    };

    User.init({
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        address: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        gender: DataTypes.BOOLEAN,
        email: DataTypes.STRING,
        verifyOTP: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'user',
        timestamps: false
    });

    return User;
};
