const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Blog = sequelize.define('Blog', {
    judul: {
        type: DataTypes.STRING,
        allowNull: false
    },
    banner: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isi: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ustadzId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    paranoid: true, // ⬅️ ini enable soft delete
    tableName: 'blogs'
});

module.exports = Blog;
