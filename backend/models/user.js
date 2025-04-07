const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'ustadz'),
        allowNull: false
    },
    ustadzId: {
        type: DataTypes.INTEGER,
        allowNull: true  // hanya wajib jika role == 'ustadz'
    }
}, {
    tableName: 'users'
});

module.exports = User;
