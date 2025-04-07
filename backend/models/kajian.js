const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Kajian = sequelize.define('Kajian', {
    judul: {
        type: DataTypes.STRING,
        allowNull: false
    },
    banner: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tanggal_waktu: {
        type: DataTypes.DATE,
        allowNull: false
    },
    lokasi: {
        type: DataTypes.STRING,
        allowNull: true
    },
    link_lokasi: {
        type: DataTypes.STRING,
        allowNull: true
    },
    materi: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    sumber: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ustadzId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    paranoid: true, // ⬅️ ini enable soft delete
    tableName: 'kajian'
});

module.exports = Kajian;
